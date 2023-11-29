const getPostData = require("../utils/getPostData");
const request = require("../utils/request");
const { encrypt, decrypt } = require("../utils/encryption");
const sql = require("../utils/sql");

// 生成随机的密钥和初始化向量（IV）
const generateKeyAndIV = () => {
  const key = crypto.randomBytes(32); // 256 bits
  const iv = crypto.randomBytes(16); // 128 bits
  // 存储到数据库
  const insertQuery = 'INSERT INTO admin (key_column, iv_column) VALUES (?, ?)';
  sql(insertQuery);
  
  return { key, iv };
};

// token管理
const getToken = async (req, res) => {
  try {
    const data = await getPostData(req);
    const cid = data.cid;

    const openid = await request.get(`/getToken?cid=${cid}`);
    const clientIP =
      req.headers["x-forwarded-for"] || req.connection.remoteAddress; // 请求中的用户网络ip

    const plaintext = `${openid}-${new Date().getTime()}-${clientIP}`;
    const { key, iv } = generateKeyAndIV();

    const token = encrypt(plaintext, key, iv);
    console.log("Encrypted Text:", token);

    // const decryptedText = decrypt(encryptedText, key, iv);
    // console.log("Decrypted Text:", decryptedText);

    res.end(token);
  } catch (error) {
    console.log("getToken error:", error);
  }
};

module.exports = {
  getToken,
};
