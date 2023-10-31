const axios = require("axios");
const { clientId, clientSecret } = require("../public");

let pdd_acccess_token = "";
let pddLastTime = "";

axios.defaults.headers.post["Content-Type"] = "application/json";

const requestPDDAccessToken = async () => {
  try {
    // 请求参数
    const requestData = {
      client_id: clientId,
      client_secret: clientSecret,
      grant_type: "client_credentials", // 使用 Client Credentials 授权模式
    };
    const response = await axios.post(
      "https://oauth.pinduoduo.com/oauth/token",
      requestData
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
