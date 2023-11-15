let https;
try {
  https = require("node:https");
} catch (err) {
  console.error("https support is disabled!");
}
const url = require("url");

const gitUpdate = require("./utils/gitUpdate");

const app = https.createServer({}, (req, res) => {
  const parsedUrl = url.parse(req.url, true);
  if (req.method === "POST" && parsedUrl.pathname === "/webhook") {
    gitUpdate(req, res);
  } else {
    console.log("未知的请求方法：", req.method);
  }
});

app.listen(7001, () => {
  console.log("node-git服务在localhost:7001端口启动!");
});
