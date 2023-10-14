const http = require("http");
const app = http.createServer((req, res) => {
  res.writeHead(200, {
    "Content-Type": "text/html;charset=utf-8",
  });
  if (req.url == "/") {
    res.write("good nodejs,当前请求路径是/的话会执行这里的代码");
    res.end();
  }
  if (req.url == "/login") {
    res.write("good nodejs,当前请求路径是/login的话会执行这里的代码");
    res.end();
  }
});

app.listen(8080, () => {
  console.log("node服务在localhost:8080端口启动");
});
