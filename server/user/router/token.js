const getPostData = require("../utils/getPostData");
const request = require("../utils/request");
const { encrypt, decrypt } = require("../utils/encryption");
const sql = require("../utils/sql");

// 生成随机的密钥和初始化向量（IV）
const getKeyAndIV = async () => {
  let { key, iv } = await sql("SELECT key_column, iv_column FROM admin");

  if (key && iv) {
    return { key, iv };
  } else {
    key = crypto.randomBytes(32); // 256 bits
    iv = crypto.randomBytes(16); // 128 bits
    // 存储到数据库
    const insertQuery =
      "INSERT INTO admin (key_column, iv_column) VALUES (?, ?)";
    sql(insertQuery);

    return { key, iv };
  }
};

// token管理
const getToken = async (req, res) => {
  try {
    const data = await getPostData(req);
    const cid = data.cid;

    const openid = await request.get(`https//:vx.com/getToken?cid=${cid}`);
    const clientIP =
      req.headers["x-forwarded-for"] || req.connection.remoteAddress; // 请求中的用户网络ip

    const plaintext = `${openid}-${new Date().getTime()}-${clientIP}`;
    const { key, iv } = await getKeyAndIV();

    const token = encrypt(plaintext, key, iv);

    res.end(token);
  } catch (error) {
    console.log("getToken error:", error);
  }
};

// 校验token
const checkToken = async (req, res) => {
  try {
    const token = req.headers["sheep_token"];
    const clientIP =
      req.headers["x-forwarded-for"] || req.connection.remoteAddress; // 请求中的用户网络ip
    const { key, iv } = await getKeyAndIV();
    const decryptedText = decrypt(token, key, iv);
    const openid = decryptedText.split("-")[0];
    const tokenIP = decryptedText.split("-")[2];
    return {
      status:tokenIP === clientIP,
      openid: openid
    };
  } catch (error) {
    console.log("checkToken error:", error);
  }
};

module.exports = {
  getToken,
  checkToken,
};
