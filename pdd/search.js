const axios = require("axios");

// 拼多多的API相关信息
const clientId = "d709d20720ee410bb771f687f853456f"; // 你的客户端ID
const clientSecret = "8db33afc093b64c6c6950bc2d92e8dddd66c8aae"; // 你的客户端密钥
const accessToken = "YOUR_ACCESS_TOKEN"; // 你的访问令牌

// 授权参数
const code = "YOUR_AUTHORIZATION_CODE"; // 你获得的授权码
const redirectUri = "YOUR_REDIRECT_URI"; // 你的重定向URI

// 构建请求URL
const apiUrl1 = "https://gw-api.pinduoduo.com/api/openapi/token/create";
const params1 = new URLSearchParams();
params.append("code", code);
params.append("grant_type", "authorization_code");

// 发送POST请求
axios
  .post(apiUrl1, params1)
  .then((response) => {
    const data = response.data;
    console.log("授权令牌信息:", data);
  })
  .catch((error) => {
    console.error("请求出错:", error);
  });

// 商品查询参数
const query = "手机"; // 查询关键词
const pageSize = 10; // 返回的商品数量
const page = 1; // 页码

// 构建请求URL
const apiUrl = "https://gw-api.pinduoduo.com/api/openapi/search";
const params = {
  client_id: clientId,
  client_secret: clientSecret,
  access_token: accessToken,
  data_type: "JSON",
  keyword: query,
  page,
  page_size: pageSize,
};

// 发送GET请求
axios
  .get(apiUrl, { params })
  .then((response) => {
    const data = response.data;

    // 处理返回的商品数据
    if (data.goods_search_response) {
      const goodsList = data.goods_search_response.goods_list;
      goodsList.forEach((goods) => {
        console.log(`商品名称: ${goods.goods_name}`);
        console.log(`商品价格: ￥${(goods.min_group_price / 100).toFixed(2)}`);
        console.log(`商品链接: ${goods.goods_detail_url}`);
        console.log("----------------------------------------");
      });
    } else {
      console.log("未找到商品");
    }
  })
  .catch((error) => {
    console.error("请求出错:", error);
  });
