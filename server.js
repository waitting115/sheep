let https;
try {
  https = require("node:https");
} catch (err) {
  console.error("https support is disabled!");
}
const fs = require("node:fs");
const url = require("url");
const sha1 = require("sha1");
const xml2js = require("xml2js");
const crypto = require("crypto");

const options = {
  key: fs.readFileSync("./https/2_miemie.online.key"),
  cert: fs.readFileSync("./https/1_miemie.online_bundle.crt"),
};
const secret = "88234516"; // Git仓库提供的Webhook秘密令牌

const app = https.createServer(options, (req, res) => {
  const parsedUrl = url.parse(req.url, true);
  console.log("parsedUrl", parsedUrl);
  if (req.method === "GET") {
    if (parsedUrl.pathname === "/") {
      console.log("微信服务器get验证");
      // 微信服务器验证 微信时不时的就会验证一下
      const token = "TOKEN";
      const { signature, timestamp, nonce, echostr } = parsedUrl.query;
      const arr = [token, timestamp, nonce].sort();
      const shaStr = sha1(arr.join(""));

      console.log("是否验证成功：", shaStr === signature);
      if (shaStr === signature) {
        res.end(echostr);
      } else {
        res.writeHead(401);
        res.end("Authentication failed");
      }
    } else {
      console.log(`未知的url：${req.url}`);
      res.writeHead(200, { "Content-Type": "application/xml" });
      res.end(xml); // 无论如何都要回复微信
    }
  } else if (req.method === "POST") {
    // 消息请求为post，且每次都传过来如下参数：?signature=509549c13e80a6b17ade82124aa74556e8fdbeb4&timestamp=1698069683&nonce=1978155440&openid=oyGGG5o9LuNFWeGAz18jVmbI7XZg
    const normalReq = buildXMLReply({
      ToUserName: "to",
      FromUserName: "from",
      CreateTime: Math.floor(Date.now() / 1000),
      MsgType: "text",
      Content: "默认回复",
    });
    if (parsedUrl.pathname === "/") {
      // 处理用户消息
      let data = "";

      req.on("data", (chunk) => {
        data += chunk;
      });

      req.on("end", () => {
        // 解析XML数据，这里使用xml2js库
        const parser = new xml2js.Parser({ explicitArray: false });

        parser.parseString(data, (err, result) => {
          if (!err && result && result.xml) {
            const message = result.xml;
            console.log("message:", message);

            // 在这里编写处理用户消息的代码
            // message 包含用户发送的消息内容，详见微信公众平台开发文档

            // 示例：回复用户消息
            const replyMessage = {
              ToUserName: message.FromUserName,
              FromUserName: message.ToUserName,
              CreateTime: Math.floor(Date.now() / 1000),
              MsgType: "text",
              Content: "你发送了：" + message.Content,
            };

            const xml = buildXMLReply(replyMessage);
            res.writeHead(200, { "Content-Type": "application/xml" });
            res.end(xml);
          } else {
            res.writeHead(200, { "Content-Type": "application/xml" });
            res.end(normalReq);
          }
        });
      });
    } else if (parsedUrl.pathname === "/webhook") {
      const payload = JSON.stringify(req.body);
      const headers = req.headers;

      // 验证Webhook请求的签名
      const hmac = crypto.createHmac("sha1", secret);
      console.log('hmac:', hmac);

      hmac.update(payload);
      const computedSignature = `sha1=${hmac.digest("hex")}`;
      const expectedSignature = headers["x-hub-signature"];

      if (computedSignature !== expectedSignature) {
        console.log("webhook验证失败");
        res.status(401).send("Unauthorized");
        return;
      }

      // 在这里处理提交事件
      const commitInfo = req.body;
      console.log("Received commit:", commitInfo);

      res.status(200).send("Webhook received");
    } else {
      console.log(`未知的url：${req.url}`);
      res.writeHead(200, { "Content-Type": "application/xml" });
      res.end(normalReq); // 无论如何都要回复微信
    }
  } else {
    console.log("未知的请求方法：", req.method);
  }
});

app.listen(8080, () => {
  console.log("node服务在localhost:8080端口启动");
});

// 辅助函数：构建XML回复消息
function buildXMLReply(replyMessage) {
  return `
    <xml>
      <ToUserName><![CDATA[${replyMessage.ToUserName}]]></ToUserName>
      <FromUserName><![CDATA[${replyMessage.FromUserName}]]></FromUserName>
      <CreateTime>${replyMessage.CreateTime}</CreateTime>
      <MsgType><![CDATA[${replyMessage.MsgType}]]></MsgType>
      <Content><![CDATA[${replyMessage.Content}]]></Content>
    </xml>
  `;
}
