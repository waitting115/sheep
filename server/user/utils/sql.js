const mysql = require("mysql");
const process = require("process");

// 创建数据库连接配置
const dbConfig = {
  host: process.env.DATABASE_HOST,
  user:  process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
};

const sql = (queryString) => {
  return new Promise((resolve, reject) => {
    // 创建数据库连接池
    const pool = mysql.createPool(dbConfig);

    // 获取连接
    pool.getConnection((err, connection) => {
      if (err) {
        reject(err);
        return;
      }

      // 执行查询
      connection.query(queryString, (error, results, fields) => {
        // 释放连接
        connection.release();

        if (error) {
          reject(error);
          return;
        }

        // 成功时返回结果
        resolve(results);
      });

      // 关闭连接池（在应用程序关闭时调用）
      pool.end((err) => {
        if (err) {
          console.error("Error closing database pool: ", err);
        }
      });
    });
  });
};

module.exports = sql;
