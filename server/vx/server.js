const http = require("http");
const url = require("url");

const normalReq = require("./utils/normalReq");
const { VxMessage } = require("./modules/VxMessage");
const { VxCheck } = require("./modules/VxCheck");
const {initVXAccessToken} = require("./modules/AccessToken");
const {initCustomMenu} = require("./modules/customMenu");

initVXAccessToken();
initCustomMenu();

const app = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  console.log("path", parsedUrl.path);

  if (req.method === "GET") {
    if (parsedUrl.pathname === "/vx") {
      VxCheck(parsedUrl, res);
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
