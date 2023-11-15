const axios = require("axios");
const appId = "wx26f9ebb812c9ad7f"; // vx
const appSecret = "032b9f27c6dd711fda6efaea27378ac4"; // vx

let vx_access_token = "";

const requestVXAccessToken = async () => {
  try {
    const response = await axios.get(
      "https://api.weixin.qq.com/cgi-bin/token",
      {
        params: {
          appid: appId,
          secret: appSecret,
          grant_type: "client_credential",
        },
      }
    );
    vx_access_token = response.data.access_token;
    // 存到数据库
    console.log("vx Access Token:", vx_access_token);
  } catch (error) {
    console.error("获取Access Token时发生错误:", error);
  }
};

const initVXAccessToken = async () => {
  requestVXAccessToken();
  setInterval(() => {
    requestVXAccessToken();
  }, 2 * 60 * 60 * 1000);
};

module.exports = initVXAccessToken;
