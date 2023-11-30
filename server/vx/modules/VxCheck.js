const sha1 = require("sha1");

function VxCheck(parsedUrl, res ) {
  // 微信服务器验证 微信时不时的就会验证一下
  const token = "TOKEN";
  const { signature, timestamp, nonce, echostr } = parsedUrl.query;
  console.log(
    "微信服务器get验证，信息：",
    signature,
    timestamp,
    nonce,
    echostr
  );

  const arr = [token, timestamp, nonce].sort();
  const shaStr = sha1(arr.join(""));

  console.log("是否验证成功：", shaStr === signature);
  if (shaStr === signature) {
    res.end(echostr);
  } else {
    res.writeHead(401);
    res.end("Authentication failed");
  }
}

module.exports = {
  VxCheck,
};
