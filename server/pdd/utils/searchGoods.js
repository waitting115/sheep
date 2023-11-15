const generatePid = require('./generatePid');
const axios = require('axios');

const searchGoods = async (title) => {
    const pid = await generatePid();
    // 使用商品标题进行拼多多搜索
    try {
      // const wechatAccessToken = await getVXAccessToken();
      const pddResponse = await axios.get(
        "https://gw-api.pinduoduo.com/api/openapi/pdd.ddk.goods.search",
        {
          params: {
            client_id: clientId,
            data_type: "JSON",
            keyword: title, // 使用用户发送的商品标题
            page: 1,
            page_size: 10,
            oauth_token: wechatAccessToken,
          },
        }
      );
  
      const goodsList = pddResponse.data.goods_search_response.goods_list;
      console.log("goodsList", goodsList);
      // 在这里处理搜索到的商品信息并回复给用户
      // ...
    } catch (error) {
      console.error("搜索商品时发生错误:");
      // 回复用户搜索出错的消息
      // ...
    }
    return "result";
  };

module.exports = searchGoods;