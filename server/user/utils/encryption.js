const crypto = require("crypto");
// const crypto = require("node:crypto");

// 加密函数
const encrypt = (text, key, iv) => {
  const cipher = crypto.createCipheriv("aes-256-cbc", key, iv);
  let encrypted = cipher.update(text, "utf-8", "hex");
  encrypted += cipher.final("hex");
  return encrypted;
};

// 解密函数
const decrypt = (encryptedText, key, iv) => {
  const decipher = crypto.createDecipheriv("aes-256-cbc", key, iv);
  let decrypted = decipher.update(encryptedText, "hex", "utf-8");
  decrypted += decipher.final("utf-8");
  return decrypted;
};

module.exports = {
  encrypt,
  decrypt,
};
