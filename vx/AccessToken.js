const axios = require("axios");
const { appId, appSecret } = require("../public");

let vx_access_token = ""; // 2h有效期 需定时刷新
let vxLastTime = "";

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
    console.log("Access Token:", accessToken);
  } catch (error) {
    console.error("获取Access Token时发生错误:", error);
  }
};

const getVXAccessToken = async () => {
  if (
    vxLastTime === "" ||
    new Date().getTime() - vxLastTime >= 2 * 60 * 60 * 1000
  ) {
    await requestVXAccessToken();
    vxLastTime = new Date().getTime();
  }
  return vx_access_token;
};

module.exports = {
  getVXAccessToken,
};
