const { appId, appSecret } = require("../public");

let access_token = ""; // 2h有效期 需定时刷新
let lastTime = "";

const requestAccessToken = async () => {
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

    access_token = response.data.access_token;
    console.log("Access Token:", accessToken);
  } catch (error) {
    console.error("获取Access Token时发生错误:", error);
  }
};

const getAccessToken = async () => {
  if (
    lastTime === "" ||
    new Date().getTime() - lastTime >= 2 * 60 * 60 * 1000
  ) {
    await requestAccessToken();
    lastTime = new Date().getTime();
  }
  return access_token;
};

module.exports = {
  getAccessToken,
};
