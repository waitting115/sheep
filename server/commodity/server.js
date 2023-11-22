const http = require("http");
const WebSocket = require("ws"); // pnpm install
const url = require("url");
const ranking = require("./ws/ranking");

const coupon = require("./router/coupon");
const detail = require("./router/detail");
// const ranking = require("./router/ranking"); // ws
const recommend = require("./router/recommend");
const remindList = require("./router/remindList");
const search = require("./router/search");

const app = http.createServer((req, res) => {
  res.setHeader("Content-Type", "application/json");
  // 设置 CORS 头部
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Credentials", "true");

  const parsedUrl = url.parse(req.url, true);
  console.log("path", parsedUrl.path);
  if (req.method === "GET") {
    if (parsedUrl.pathname === "/commodity/search") {
      search(req, res);
    } else if (parsedUrl.pathname === "/commodity/coupon") {
      coupon(req, res);
    } else if (parsedUrl.pathname === "/commodity/recommend") {
      recommend(req, res);
      // } else if (/^\/commodity\/detail\/\d+$/.test(parsedUrl.pathname)) {
    } else if (parsedUrl.pathname === "/commodity/detail") {
      detail(req, res);
    } else if (parsedUrl.pathname === "/commodity/remindList") {
      remindList(req, res);
    } else {
      console.log("未知的请求路径：", parsedUrl.pathname);
    }
  } else if (req.method === "POST") {
    if (parsedUrl.pathname === "/commodity/") {
    } else {
    }
  } else {
    console.log("未知的请求方法：", req.method);
  }
});

app.listen(7002, () => {
  console.log("node-commodity服务在localhost:7002端口启动!");
});

// 创建 WebSocket 服务器
const wss = new WebSocket.Server({ noServer: true });

// 将 WebSocket 服务器附加到 HTTP 服务器
app.on("upgrade", (request, socket, head) => {
  wss.handleUpgrade(request, socket, head, (ws) => {
    wss.emit("connection", ws, request);
  });
});

// WebSocket 服务器监听连接事件
wss.on("connection", (ws) => {
  console.log("客户端已连接");
  // 处理 WebSocket 连接
  // ...

  // 监听消息事件
  ws.on("message", (message) => {
    console.log(`接收到消息：${message}`);

    // 发送消息给客户端
    ws.send(`服务器收到：${message}`);
  });

  // 监听关闭事件
  ws.on("close", () => {
    console.log("客户端断开连接");
  });
});

wss.on("error", (error) => {
  console.error(`WebSocket 服务器错误：${error}`);
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
