const http = require("http");
const url = require("url");
const { addRemind, removeRemind } = require("./router/remind");
const { versionStandard, versionAll } = require("./router/version");
const { getToken, checkToken } = require("./router/token");

const app = http.createServer((req, res) => {
  res.setHeader("Content-Type", "application/json");
  // 设置 CORS 头部
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Credentials", "true");

  const parsedUrl = url.parse(req.url, true);
  console.log("path", parsedUrl.path);
  // 先校验token
  if (
    req.method !== "GET" ||
    (req.method === "GET" && parsedUrl.pathname !== "/user/getToken")
  ) {
    try {
      (async () => {
        const res = await checkToken(req, res);
        if (res.status) {
          req.openid = res.openid;
        } else {
          res.writeHead(401, {
            "WWW-Authenticate":
              'Bearer realm="example", error="invalid_token", error_description="The access token expired"',
            "Content-Type": "application/json",
          });

          const responseJson = JSON.stringify({
            error: "invalid_token",
            error_description: "The access token expired",
          });

          res.end(responseJson);
        }
      })();
    } catch (error) {
      console.log("token校验失败：", error);
    }
  }
  if (req.method === "GET") {
    switch (parsedUrl.pathname) {
      case "/user/getToken":
        getToken(req, res);
        break;
      default:
        console.log("未知的请求路径：", parsedUrl.pathname);
    }
  } else if (req.method === "POST") {
    switch (parsedUrl.pathname) {
      case "/user/addRemind":
        addRemind(req, res);
        break;
      case "/user/removeRemind":
        removeRemind(req, res);
        break;
      case "/user/version/standard":
        versionStandard(req, res);
        break;
      case "/user/version/all":
        versionAll(req, res);
        break;
      default:
        console.log("未知的请求路径：", parsedUrl.pathname);
    }
    // gitUpdate(req, res);
  } else {
    console.log("未知的请求方法：", req.method);
  }
});

app.listen(7003, () => {
  console.log("node-git服务在localhost:7003端口启动!");
});
