const http = require('http');
const WebSocket = require("ws"); // pnpm install
const url = require("url");
const ranking = require('./ws/ranking')

const coupon = require("./router/coupon");
const detail = require("./router/detail");
// const ranking = require("./router/ranking"); // ws
const recommend = require("./router/recommend");
const remindList = require("./router/remindList");
const search = require("./router/search");

const app = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  console.log('parsedUrl', parsedUrl);
  res.send('success');
  // if (req.method === "GET") {
  //   switch (parsedUrl.pathname) {
  //     case "/commodity/search":
  //       search(req, res);
  //       break;
  //     case "/commodity/coupon":
  //       coupon(req, res);
  //       break;
  //     case "/commodity/recommend":
  //       recommend(req, res);
  //       break;
  //     case "/commodity/detail": // /commodity/detail/{id}
  //       detail(req, res);
  //       break;
  //     case "/commodity/remindList":
  //       remindList(req, res);
  //       break;
  //     default:
  //       console.log("未知的请求路径：", parsedUrl.pathname);
  //   }
  // } else if (req.method === "POST") {
  //   if (parsedUrl.pathname === "/commodity/") {
  //   } else {
  //   }
  // } else {
  //   console.log("未知的请求方法：", req.method);
  // }
});

// 创建 WebSocket 服务器
const wss = new WebSocket.Server({ app });

// WebSocket 服务器监听连接事件
wss.on("connection", (ws) => {
  console.log("Client connected");
  ranking(ws);
  // 监听消息事件
  ws.on("message", (message) => {
    console.log(`Received message: ${message}`);

    // 发送消息给客户端
    ws.send(`Server received: ${message}`);
  });

  // 监听关闭事件
  ws.on("close", () => {
    console.log("Client disconnected");
  });
});

app.listen(7002, () => {
  console.log("node-commodity服务在localhost:7002端口启动!");
});

{
  /* <script>
  const socket = new WebSocket('ws://localhost:3000');

  socket.addEventListener('open', (event) => {
    console.log('Connected to WebSocket server');

    // 发送消息给服务器
    socket.send('Hello, WebSocket Server!');
  });

  socket.addEventListener('message', (event) => {
    console.log(`Received message: ${event.data}`);
  });

  socket.addEventListener('close', (event) => {
    console.log('Disconnected from WebSocket server');
  });
</script> */
}
