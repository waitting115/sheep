const http = require("http");
const url = require("url");
const { addRemind, removeRemind } = require("./utils/remind");
const { versionStandard, versionAll } = require("./utils/version");

const app = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  console.log("path", parsedUrl.path);
  res.end("success");

  // if (req.method === "POST") {
  //   switch (parsedUrl.pathname) {
  //     case "/user/addRemind":
  //       addRemind(req, res);
  //       break;
  //     case "/user/removeRemind":
  //       removeRemind(req, res);
  //       break;
  //     case "/user/version/standard":
  //       versionStandard(req, res);
  //       break;
  //     case "/user/version/all":
  //       versionAll(req, res);
  //       break;
  //     default:
  //       console.log("未知的请求路径：", parsedUrl.pathname);
  //   }
  //   // gitUpdate(req, res);
  // } else {
  //   console.log("未知的请求方法：", req.method);
  // }
});

app.listen(7003, () => {
  console.log("node-git服务在localhost:7003端口启动!");
});
