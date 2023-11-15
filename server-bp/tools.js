// 处理 POST 请求数据
function handlePostData(req, callback) {
  let data = "";

  req.on("data", (chunk) => {
    data += chunk;
  });

  req.on("end", () => {
    callback(null, data);
  });

  req.on("error", (error) => {
    callback(error, null);
  });
}

// 辅助函数：构建XML回复消息
function buildXMLReply(replyMessage) {
  return `
      <xml>
        <ToUserName><![CDATA[${replyMessage.ToUserName}]]></ToUserName>
        <FromUserName><![CDATA[${replyMessage.FromUserName}]]></FromUserName>
        <CreateTime>${replyMessage.CreateTime}</CreateTime>
        <MsgType><![CDATA[${replyMessage.MsgType}]]></MsgType>
        <Content><![CDATA[${replyMessage.Content}]]></Content>
      </xml>
    `;
}

// 默认回复
const normalReq = buildXMLReply({
  ToUserName: "to",
  FromUserName: "from",
  CreateTime: Math.floor(Date.now() / 1000),
  MsgType: "text",
  Content: "默认回复",
});

module.exports = {
  handlePostData,
  buildXMLReply,
  normalReq,
};
