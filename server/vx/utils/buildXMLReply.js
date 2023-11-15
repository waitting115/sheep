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

module.exports = buildXMLReply;
