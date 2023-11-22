const axios = require("axios");
const crypto = require("crypto");
// const { getVXAccessToken } = require("../vx/AccessToken");

// 思路：不一定要先获取token，先走流程，看哪里需要再去琢磨获取
const requestPDDAccessToken = async () => {};

const initPDDAccessToken = async () => {
  requestPDDAccessToken();
  setInterval(() => {
    requestPDDAccessToken();
  }, 2 * 60 * 60 * 1000);
};

module.exports = initPDDAccessToken;
