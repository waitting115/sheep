const crypto = require("crypto");
const axios = require("axios");

const clientId = "d709d20720ee410bb771f687f853456f"; // 拼多多客户端ID
const clientSecret = "8db33afc093b64c6c6950bc2d92e8dddd66c8aae"; // 拼多多客户端密钥

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
  // 将参数和值拼接成字符串
  const paramString = Object.entries(sortedParams)
    .map(([key, value]) => `${key}${value}`)
    .join("");

  // 添加应用的 client_secret
  const stringWithSecret = `${clientSecret}${paramString}${clientSecret}`;

  // 计算 MD5 哈希
  const sign = crypto
    .createHash("md5")
    .update(stringWithSecret)
    .digest("hex")
    .toUpperCase();

  params.sign = sign;

  const response = await axios.post(
    "https://gw-api.pinduoduo.com/api/router",
    params
  );

  return response;
};

module.exports = getFetch;
