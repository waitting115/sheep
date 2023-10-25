const axios = require("axios");
const { appId, appSecret, clientId, clientSecret } = require("../public");

let vx_access_token = ""; // 2h有效期 需定时刷新
let vxLastTime = "";

let pdd_acccess_token = "";
let pddLastTime = "";

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

const requestPDDAccessToken = async () => {
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
    console.log("vx Access Token:", accessToken);
  } catch (error) {
    console.error("获取vx Access Token时发生错误:", error);
  }

  try {
    const response = await axios.post(
      "https://open-api.pinduoduo.com/oauth/token",
      {
        client_id: clientId,
        client_secret: clientSecret,
        grant_type: "authorization_code",
      }
    );
    pdd_acccess_token = response.data.access_token;
    console.log("pdd Access Token:", accessToken);
  } catch (error) {
    console.error("获取pdd Access Token时发生错误:", error);
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
  getVXAccessToken,
  getPDDAccessToken,
};
