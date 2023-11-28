const getPostData = require("../utils/getPostData");
const request = require("../utils/request");
const { createHmac } = require("node:crypto");

const key = "8dcfse234";

// token管理
const getToken = async (req, res) => {
  try {
    const data = await getPostData(req);
    const cid = data.cid;

    const openid = await request.get(`/getToken?cid=${cid}`);

    // const stringWithSecret = `${openid}-${time}${ip}`;

    // const secret = "abcdefg";
    // const hash = createHmac("sha256", secret)
    //   .update("I love cupcakes")
    //   .digest("hex");
    // console.log(hash);

    res.end(token);
  } catch (error) {
    console.log("getToken error:", error);
  }
};

module.exports = {
  getToken,
};
