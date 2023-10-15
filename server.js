let https;
try {
  https = require("node:https");
} catch (err) {
  console.error("https support is disabled!");
}
const fs = require("node:fs");
const url = require("url");
const sha1 = require("sha1");

const options = {
  key: fs.readFileSync("./https/2_miemie.online.key"),
  cert: fs.readFileSync("./https/1_miemie.online_bundle.crt"),
};

const app = https.createServer(options, (req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const { signature, timestamp, nonce, echostr } = parsedUrl.query;

  // 服务器的token
  const token = "TOKEN";

  // 将token、timestamp、nonce三个参数进行字典序排序
  const arrSort = [token, timestamp, nonce];
  arrSort.sort();

  // 将三个参数字符串拼接成一个字符串进行sha1加密,npm install --save sha1
  const str = arrSort.join("");
  const shaStr = sha1(str);

  // 获得加密后的字符串可与signature对比，验证标识该请求来源于微信服务器
  if (shaStr === signature) {
    // 确认此次GET请求来自微信服务器，请原样返回echostr参数内容，则接入生效
    res.end(echostr);
  } else {
    //否则接入失败。
    res.end("no");
  }
  // res.writeHead(200, {
  //   "Content-Type": "text/html;charset=utf-8",
  // });
  // if (req.url == "/") {
  //   res.write("good nodejs,当前请求路径是/的话会执行这里的代码");
  //   res.end();
  // }
  if (req.url == "/api") {
    res.write("good nodejs,当前请求路径是/api的话会执行这里的代码");
    res.end();
  }
});

app.listen(8080, () => {
  console.log("node服务在localhost:8080端口启动");
});
