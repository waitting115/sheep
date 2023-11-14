let https;
try {
  https = require("node:https");
} catch (err) {
  console.error("https support is disabled!");
}
const fs = require("node:fs");
const url = require("url");

const { normalReq } = require("./tools");
const { VxMessage } = require("./vx/VxMessage");
const { VxCheck } = require("./vx/VxCheck");
const { gitUpdate } = require("./git/index");
const { getVXAccessToken } = require("./vx/AccessToken");
const { getPDDAccessToken } = require("./pdd/AccessToken");
const { generatePid } = require("./pdd/index");

const options = {
  key: fs.readFileSync("./https/2_miemie.online.key"),
  cert: fs.readFileSync("./https/1_miemie.online_bundle.crt"),
};

// getVXAccessToken();
// getPDDAccessToken();
// generatePid();
const app = https.createServer(options, (req, res) => {
  const parsedUrl = url.parse(req.url, true);
  console.log("parsedUrl", parsedUrl);
  if (req.method === "GET") {
    if (parsedUrl.pathname === "/") {
      VxCheck(res, parsedUrls);
    } else {
      console.log(`未知的url：${req.url}`);
      res.writeHead(200, { "Content-Type": "application/xml" });
      res.end(normalReq); // 无论如何都要回复微信
    }
  } else if (req.method === "POST") {
    if (parsedUrl.pathname === "/") {
      VxMessage(req, res);
    } else if (parsedUrl.pathname === "/webhook") {
      gitUpdate(req, res);
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
  console.log("node服务在localhost:8080端口启动!");
});
