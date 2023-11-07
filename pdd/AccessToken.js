const axios = require("axios");
const { clientId, clientSecret } = require("../public");
const crypto = require("crypto");

let pdd_acccess_token = "";
let pddLastTime = "";

const requestPDDAccessToken = async () => {
  try {
    // 请求参数
    const params = {
      type: "pdd.pop.auth.token.create",
      client_id: clientId,
      // client_secret: clientSecret,
      timestamp: Math.floor(Date.now() / 1000).toString(),
      sign: "",
      // grant_type: "client_credentials", // 使用 Client Credentials 授权模式
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

    console.log("生成的签名值:", sign);
    params.sign = sign;

    const response = await axios.post(
      "https://gw-api.pinduoduo.com/api/router",
      params
    );
    const data = response.data;
    if (data.error) {
      console.error("Error:", data.error_description);
    } else {
      pdd_acccess_token = data.access_token;

      console.log("Pdd Access Token:", data.access_token);
      console.log("Expires In:", data.expires_in);
    }
  } catch (error) {
    console.error("获取pdd Access Token时发生错误:", error); // AxiosError: Request failed with status code 405
    throw error;
  }
};

const getPDDAccessToken = async () => {
  if (
    pddLastTime === "" ||
    new Date().getTime() - pddLastTime >= 2 * 60 * 60 * 1000
  ) {
    await requestPDDAccessToken();
    pddLastTime = new Date().getTime();
  }
  return pdd_acccess_token;
};

module.exports = {
  getPDDAccessToken,
};
