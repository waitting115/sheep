let https;
try {
  https = require("node:https");
} catch (err) {
  console.error("https support is disabled!");
}
const url = require("url");

const app = https.createServer({}, (req, res) => {
  const parsedUrl = url.parse(req.url, true);
  if (req.method === "GET") {
    if (parsedUrl.pathname === "/pdd/") {
    } else {
    }
  } else if (req.method === "POST") {
    if (parsedUrl.pathname === "/pdd/") {
    } else {
    }
  } else {
    console.log("未知的请求方法：", req.method);
  }
});

app.listen(7002, () => {
  console.log("node-pdd服务在localhost:7002端口启动!");
});
