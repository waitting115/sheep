let https;
try {
  https = require("node:https");
} catch (err) {
  console.error("https support is disabled!");
}
const url = require("url");

const normalReq = require("./utils/normalReq");
const { VxMessage } = require("./VxMessage");
const { VxCheck } = require("./VxCheck");
const initVXAccessToken = require("./AccessToken");

initVXAccessToken();

const app = https.createServer({}, (req, res) => {
  const parsedUrl = url.parse(req.url, true);
  console.log("parsedUrl", parsedUrl);
  if (req.method === "GET") {
    if (parsedUrl.pathname === "/vx") {
      VxCheck(res, parsedUrls);
    } else {
      console.log(`未知的url：${req.url}`);
      res.writeHead(200, { "Content-Type": "application/xml" });
      res.end(normalReq);
    }
  } else if (req.method === "POST") {
    if (parsedUrl.pathname === "/vx") {
      VxMessage(req, res);
    } else {
      console.log(`未知的url：${req.url}`);
      res.writeHead(200, { "Content-Type": "application/xml" });
      res.end(normalReq);
    }
  } else {
    console.log("未知的请求方法：", req.method);
  }
});

app.listen(7000, () => {
  console.log("node-vx服务在localhost:7000端口启动!");
});
