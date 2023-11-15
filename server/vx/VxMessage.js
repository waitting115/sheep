const normalReq = require('./utils/normalReq');
const handlePostData = require('./utils/handlePostData');
const buildXMLReply = require('./utils/buildXMLReply');
const xml2js = require("xml2js");

function VxMessage(req, res) {
  // 消息请求为post，且每次都传过来如下参数：?signature=509549c13e8dbeb4&timestamp=1698069683&nonce=1978155440&openid=oyGGG5o9LuNFWeGAz18jVmbI7XZg
  handlePostData(req, (error, postData) => {
    if (error) {
      console.error("数据解析错误：", error);
      res.writeHead(500, { "Content-Type": "text/plain" });
      res.end("Internal Server Error");
    }
    // 解析XML数据，这里使用xml2js库
    const parser = new xml2js.Parser({ explicitArray: false });

    parser.parseString(postData, async (err, result) => {
      if (!err && result && result.xml) {
        const message = result.xml;
        console.log("message:", message);

        // 回复用户消息
        const replyMessage = {
          ToUserName: message.FromUserName,
          FromUserName: message.ToUserName,
          CreateTime: Math.floor(Date.now() / 1000),
          MsgType: "text",
          Content: "你发送了：" + message.Content,
        };

        // 在这里编写处理用户消息的代码
        try {
          // 需要将所有服务运行起来后，axios调用pdd的接口了
          // const goodsMessage = await searchGoods(message);
          // replyMessage.Content = goodsMessage;
        } catch (error) {
          console.log("搜索关键字出错：", error);
        }

        const xml = buildXMLReply(replyMessage);
        res.writeHead(200, { "Content-Type": "application/xml" });
        res.end(xml);
      } else {
        res.writeHead(200, { "Content-Type": "application/xml" });
        res.end(normalReq);
      }
    });
  });
}

module.exports = {
  VxMessage,
};
