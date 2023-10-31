const axios = require("axios");
const { clientId, clientSecret } = require("../public");

let pdd_acccess_token = "";
let pddLastTime = "";

const requestPDDAccessToken = async () => {
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
    console.log("pdd Access Token:", pdd_acccess_token);
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
  getPDDAccessToken,
};
