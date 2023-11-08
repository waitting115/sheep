const axios = require("axios");
const { clientId, clientSecret } = require("../public");
const { getVXAccessToken, getPDDAccessToken } = require("../vx/AccessToken");
const crypto = require("crypto");

const getFetch = async (option) => {
  const params = {
    type: option.type,
    client_id: clientId,
    timestamp: Math.floor(Date.now() / 1000).toString(),
    ...option.body,
  };

  // 按参数名进行首字母升序排列
  const sortedParams = {};
  Object.keys(params)
    .sort()
    .forEach((key) => {
      sortedParams[key] = params[key];
    });
  console.log("sortedParams", sortedParams);
  // 将参数和值拼接成字符串
  const paramString = Object.entries(sortedParams)
    .map(([key, value]) => `${key}${value}`)
    .join("");
  console.log("paramString", paramString);

  // 添加应用的 client_secret
  const stringWithSecret = `${clientSecret}${paramString}${clientSecret}`;

  console.log("stringWithSecret", stringWithSecret);
  // 计算 MD5 哈希
  const sign = crypto
    .createHash("md5")
    .update(stringWithSecret)
    .digest("hex")
    .toUpperCase();

  console.log("生成的签名值:", sign);
  params.sign = sign;

  const response = await axios.post(
    "https://gw-api.pinduoduo.com/api/router",
    params
  );

  return response;
};

// 工作流程：
// init：获取AccessToken
// 拿到用户的搜索关键字后，调用pdd商品搜索接口获取一个或多个商品
// 创建一个推广位
// 将商品和推广位绑定并生成推广链接
// 将推广链接和商品信息返回给用户

// 生成多多客推广位
async function generatePid() {
  let promotionSite = 0;
  try {
    const response = await getFetch({
      type: "pdd.ddk.goods.pid.generate",
      body: {
        number: 1, // 创建1个推广位
      },
    });

    promotionSite = response.data.p_id_generate_response.p_id_list[0].p_id;
  } catch (error) {
    console.error("Error generating PIDs:", error);
  }

  if (promotionSite === 0) {
    console.log("pid获取失败");
    return;
  }

  try {
    const response = await getFetch({
      type: "pdd.ddk.member.authority.query",
      body: {
        pid: promotionSite,
      },
    });
    if (response.data.authority_query_response.bind === 0) {
      try {
        const response = await getFetch({
          type: "pdd.ddk.oauth.goods.prom.url.generate",
          body: {
            generate_authority_url: true,
          },
        });

        console.log("response", response.data);
      } catch (error) {
        console.log("pdd.ddk.oauth.goods.prom.url.generate接口错误");
      }
      // 未备案 here
    } else if (response.data.authority_query_response.bind === 1) {
      // 已备案
    } else {
      console.log("pdd.ddk.member.authority.query接口错误");
    }
  } catch (error) {}

  return promotionSite;
}

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

module.exports = {
  searchGoods,
  generatePid,
};
