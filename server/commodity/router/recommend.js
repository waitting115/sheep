// 获取推荐：get  commodity/recommend
const sql = require("../utils/sql");
const {
  getRecommend: pddGetRecommend,
} = require("../modules/pdd/getRecommend");
const { getRecommend: jdGetRecommend } = require("../modules/jd/getRecommend");
const { getRecommend: tbGetRecommend } = require("../modules/tb/getRecommend");

const recommend = async (req, res) => {
  // - 获取搜索类型mysql
  // - promise.all三个请求，带着类型
  // - 返回多个列表
  try {
    // 示例查询
    const queryString = "SELECT * FROM user_table WHERE openid = 100 LIMIT 1;";
    const type = await sql(queryString).type;

    //   发起请求
    Promise.all([
      pddGetRecommend(type),
      jdGetRecommend(type),
      tbGetRecommend(type),
    ]).then((result) => {
      console.log("搜索结果", result);
      // res.end(res);
      res.end([]);
      res.end();
    });
  } catch (error) {
    console.log("err", error);
  }
};

module.exports = recommend;
