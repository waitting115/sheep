const { handlePostData } = require("./handlePostData");
const crypto = require("crypto");
// const { exec } = require("child_process");

const gitSecret = "991209"; // Git仓库提供的Webhook秘密令牌

function gitUpdate(req, res) {
  handlePostData(req, (error, payload) => {
    if (error) {
      res.writeHead(500, { "Content-Type": "text/plain" });
      res.end("Internal Server Error");
    }

    // 获取请求标头中的签名
    const signature = req.headers["x-hub-signature-256"];

    // 创建一个HMAC对象，使用你的Webhook密钥
    const hmac = crypto.createHmac("sha256", gitSecret);
    hmac.update(payload);

    // 计算生成的签名
    const computedSignature = `sha256=${hmac.digest("hex")}`;

    // 检查签名是否匹配
    if (signature === computedSignature) {
      // 签名验证成功
      console.log("Webhook verification successful");

      // 在这里执行你的Webhook处理逻辑，例如，可以执行代码拉取、部署、通知等操作

      // 执行Shell脚本 (这是在docker中执行的，会出错没有git访问权限，因为是在docker内部sh运行的，所以需要sh执行环境为服务器)
      // exec("sh /home/sheep/update.sh", (error, stdout, stderr) => {
      //   if (error) {
      //     console.error(`Error executing script: ${error}`);
      //   } else {
      //     console.log(`Script output: ${stdout}`);
      //   }
      // });

      res.writeHead(200, { "Content-Type": "text/plain" });
      res.end("Webhook received");
    } else {
      // 签名验证失败
      console.error("Webhook verification failed");
      res.writeHead(401, { "Content-Type": "text/plain" });
      res.end("Unauthorized");
    }
  });
}

module.exports = gitUpdate
