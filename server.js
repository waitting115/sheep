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

const options = {
  key: fs.readFileSync("./https/2_miemie.online.key"),
  cert: fs.readFileSync("./https/1_miemie.online_bundle.crt"),
};

const app = https.createServer(options, (req, res) => {
  // const parsedUrl = url.parse(req.url, true);
  // const { signature, timestamp, nonce, echostr } = parsedUrl.query;
  // console.log(`in:${signature}, ${timestamp}, ${nonce}, ${echostr}`);

  // // 服务器的token
  // const token = "TOKEN";

  // // 将token、timestamp、nonce三个参数进行字典序排序
  // const arrSort = [token, timestamp, nonce];
  // arrSort.sort();

  // // 将三个参数字符串拼接成一个字符串进行sha1加密,npm install --save sha1
  // const str = arrSort.join("");
  // const shaStr = sha1(str);
  // console.log(1, shaStr, signature);
  // // 获得加密后的字符串可与signature对比，验证标识该请求来源于微信服务器
  // if (shaStr === signature) {
  //   // 确认此次GET请求来自微信服务器，请原样返回echostr参数内容，则接入生效
  //   res.end(echostr);
  // } else {
  //   //否则接入失败。
  //   res.end("no");
  // }
  // // res.writeHead(200, {
  // //   "Content-Type": "text/html;charset=utf-8",
  // // });
  // // if (req.url == "/") {
  // //   res.write("good nodejs,当前请求路径是/的话会执行这里的代码");
  // //   res.end();
  // // }
  // if (req.url == "/api") {
  //   res.write("good nodejs,当前请求路径是/api的话会执行这里的代码");
  //   res.end();
  // }
  console.log("req", req);
  if (req.method === "GET") {
    // 微信服务器验证
    const token = "TOKEN";
    const query = url.parse(req.url, true).query;
    const { signature, timestamp, nonce, echostr } = query;
    const arr = [token, timestamp, nonce].sort();
    const shaStr = sha1(arr.join(""));

    if (shaStr === signature) {
      res.end(echostr);
    } else {
      res.writeHead(401);
      res.end("Authentication failed");
    }
  } else if (req.method === "POST") {
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
          console.log('message:', message);

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
          res.writeHead(400);
          res.end("Invalid message format");
        }
      });
    });
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
