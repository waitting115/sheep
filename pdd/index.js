const axios = require("axios");
const { clientId, clientSecret } = require("../public");
const { getVXAccessToken, getPDDAccessToken } = require("../vx/AccessToken");

// 生成多多客推广位
async function generatePid() {
  const pdd_acccess_token = await getPDDAccessToken();
  const data = {
    type: "pdd.ddk.oauth.goods.pid.generate",
    number: 1, // 生成推广位数量，可以根据需求修改
  };

  try {
    const response = await axios.post(
      "https://open-api.pinduoduo.com/pop/doc/index",
      data,
      {
        headers: { Authorization: `Bearer ${pdd_acccess_token}` },
      }
    );

    const pidList = response.data.pid_list; // 获取生成的PID列表
    console.log("Generated PIDs:", pidList);
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
    console.error("搜索商品时发生错误:", error);
    // 回复用户搜索出错的消息
    // ...
  }
  return "result";
};

module.exports = {
  searchGoods,
  generatePid,
};
