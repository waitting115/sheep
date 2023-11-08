const axios = require("axios");
const { clientId, clientSecret } = require("../public");
const { getVXAccessToken, getPDDAccessToken } = require("../vx/AccessToken");

// 工作流程：
// init：获取AccessToken
// 拿到用户的搜索关键字后，调用pdd商品搜索接口获取一个或多个商品
// 创建一个推广位
// 将商品和推广位绑定并生成推广链接
// 将推广链接和商品信息返回给用户

// 生成多多客推广位
async function generatePid() {
  const pdd_acccess_token = await getPDDAccessToken();
  const requestData = {
    type: "pdd.ddk.goods.pid.generate", // 接口名称
    client_id: clientId,
    client_secret: clientSecret,
    access_token: accessToken,
    number: 1, // 创建一个推广位
  };

  try {
    const response = await axios.post(
      "https://gw-api.pinduoduo.com/api/router",
      null,
      {
        params: requestData,
      }
    );

    const data = response.data;
    if (data.error_response) {
      console.error("Error:", data.error_response);
    } else {
      const promotionSite = data.ddk_goods_pid_generate_response.p_id_list[0];

      console.log("Promotion Site:", promotionSite);
    }
  } catch (error) {
    console.error("Error generating PIDs:", error);
  }
}

const searchGoods = async (title) => {
  // 使用商品标题进行拼多多搜索
  try {
    const wechatAccessToken = await getVXAccessToken();
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

module.exports = {
  searchGoods,
  generatePid,
};
