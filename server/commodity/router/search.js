// 搜索 get  commodity/search
const url = require("url");
const { searchGoods: pddSearchGoods } = require("../modules/pdd/searchGoods");
const { searchGoods: jdSearchGoods } = require("../modules/jd/searchGoods");
const { searchGoods: tbSearchGoods } = require("../modules/tb/searchGoods");
const sql = require("../utils/sql");

const search = async (req, res) => {
  // - 获取参数
  // - 获取搜索类型mysql
  // - promise.all三个请求，带着类型
  // - 返回多个列表

  // 解析请求的 URL, 获取查询参数对象
  const { title } = url.parse(req.url, true).query;
  console.log("title", title);

  try {
    // 示例查询
    const queryString = "SELECT * FROM user_table WHERE openid = 100 LIMIT 1;";
    const type = await sql(queryString).type;

    //   发起请求
    Promise.all([
      pddSearchGoods(title, type),
      jdSearchGoods(title, type),
      tbSearchGoods(title, type),
    ]).then((result) => {
      console.log("搜索结果", result);
      // res.send(res);
      res.send([]);
      res.end();
    });
  } catch (error) {
    console.log("err", error);
  }
};

module.exports = search;
