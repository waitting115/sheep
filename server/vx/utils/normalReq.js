const buildXMLReply = require('./buildXMLReply');

// 默认回复
const normalReq = buildXMLReply({
  ToUserName: "to",
  FromUserName: "from",
  CreateTime: Math.floor(Date.now() / 1000),
  MsgType: "text",
  Content: "默认回复",
});

module.exports = normalReq;
