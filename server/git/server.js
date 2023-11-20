const http = require('http');
const url = require("url");

const gitUpdate = require("./utils/gitUpdate");

const app = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  console.log('parsedUrl', parsedUrl);
  res.send('success');
  // if (req.method === "POST" && parsedUrl.pathname === "/webhook") {
  //   gitUpdate(req, res);
  // } else {
  //   console.log("未知的请求方法：", req.method);
  // }
});

app.listen(7001, () => {
  console.log("node-git服务在localhost:7001端口启动!");
});
