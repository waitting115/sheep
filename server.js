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
const { searchGoods } = require("./pdd/index");
const { gitSecret } = require("./public");

const options = {
  key: fs.readFileSync("./https/2_miemie.online.key"),
  cert: fs.readFileSync("./https/1_miemie.online_bundle.crt"),
};

const app = https.createServer(options, (req, res) => {
  const parsedUrl = url.parse(req.url, true);
  console.log("parsedUrl", parsedUrl);
  if (req.method === "GET") {
    if (parsedUrl.pathname === "/") {
      // 微信服务器验证 微信时不时的就会验证一下
      const token = "TOKEN";
      const { signature, timestamp, nonce, echostr } = parsedUrl.query;
      console.log(
        "微信服务器get验证，信息：",
        signature,
        timestamp,
        nonce,
        echostr
      );

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
      handlePostData(req, (error, postData) => {
        if (error) {
          console.error("数据解析错误：", error);
          res.writeHead(500, { "Content-Type": "text/plain" });
          res.end("Internal Server Error");
        }
        // 解析XML数据，这里使用xml2js库
        const parser = new xml2js.Parser({ explicitArray: false });

        parser.parseString(postData, async (err, result) => {
          if (!err && result && result.xml) {
            const message = result.xml;
            console.log("message:", message);

            // 回复用户消息
            const replyMessage = {
              ToUserName: message.FromUserName,
              FromUserName: message.ToUserName,
              CreateTime: Math.floor(Date.now() / 1000),
              MsgType: "text",
              Content: "你发送了：" + message.Content,
            };

            // 在这里编写处理用户消息的代码
            try {
              const goodsMessage = await searchGoods(message);
              replyMessage.Content = goodsMessage;
            } catch (error) {
              console.log("搜索关键字出错：", error);
            }

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
      handlePostData(req, (error, payload) => {
        if (error) {
          res.writeHead(500, { "Content-Type": "text/plain" });
          res.end("Internal Server Error");
        }

        // 获取请求标头中的签名
        const signature = req.headers["x-hub-signature-256"];

        // 创建一个HMAC对象，使用你的Webhook密钥
        const hmac = crypto.createHmac("sha256", gitSecret);
        hmac.update(payload);

        // 计算生成的签名
        const computedSignature = `sha256=${hmac.digest("hex")}`;

        console.log("匹配结果：", signature, computedSignature);
        // 检查签名是否匹配
        if (signature === computedSignature) {
          // 签名验证成功
          console.log("Webhook verification successful");

          // 在这里执行你的Webhook处理逻辑

          // 例如，可以执行代码拉取、部署、通知等操作

          res.writeHead(200, { "Content-Type": "text/plain" });
          res.end("Webhook received");
        } else {
          // 签名验证失败
          console.error("Webhook verification failed");
          res.writeHead(401, { "Content-Type": "text/plain" });
          res.end("Unauthorized");
        }
      });
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

// 处理 POST 请求数据
function handlePostData(req, callback) {
  let data = "";

  req.on("data", (chunk) => {
    data += chunk;
  });

  req.on("end", () => {
    console.log("postData:", data);
    callback(null, data);
  });

  req.on("error", (error) => {
    callback(error, null);
  });
}
