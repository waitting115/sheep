// 获取详情：get commodity/detail/{id}（标注是否已添加提醒）
const sql = require("../utils/sql");
getDetail;
const { getDetail: pddGetDetail } = require("../modules/pdd/getDetail");
const { getDetail: jdGetDetail } = require("../modules/jd/getDetail");
const { getDetail: tbGetDetail } = require("../modules/tb/getDetail");

const remindList = async (req, res) => {
  try {
    // 示例查询
    const queryString = "SELECT * FROM user_table WHERE openid = 100 LIMIT 1;";
    const remindList = await sql(queryString).remindList;
    const proList = await remindList.map((v) => {
      switch (v.platform) {
        case "pdd":
          return pddGetDetail(v.id);
        case "jd":
          return jdGetDetail(v.id);
        case "tb":
          return tbGetDetail(v.id);
        default:
          console.log("未知的平台类型：", v.platform);
          return null;
      }
    });

    //   发起请求
    Promise.all(proList).then((result) => {
      console.log("搜索结果", result);
      // res.end(res);
      res.end([]);
      res.end();
    });
  } catch (error) {
    console.log("err", error);
  }
};

module.exports = remindList;
