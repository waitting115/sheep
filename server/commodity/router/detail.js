// 获取详情：get commodity/detail/{id}（标注是否已添加提醒）
const sql = require("../utils/sql");
const url = require("url");
const { getDetail: pddGetDetail } = require("../modules/pdd/getDetail");
const { getDetail: jdGetDetail } = require("../modules/jd/getDetail");
const { getDetail: tbGetDetail } = require("../modules/tb/getDetail");

const detail = async (req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const { platform, goodSign } = parsedUrl.query;

  // 获取请求中的动态值
  console.log(3, platform, goodSign);
  try {
    // 示例查询
    // const queryString = "SELECT * FROM user_table WHERE openid = 100 LIMIT 1;";
    // const { remindList } = await sql(queryString);
    let result = null;
    switch (platform) {
      case "pdd":
        result = await pddGetDetail(goodSign);
        break;
      case "jd":
        result = await jdGetDetail(goodSign);
        break;
      case "tb":
        result = await tbGetDetail(goodSign);
        break;
      default:
        console.log("未知的平台类型：", v.platform);
        return null;
    }
    // result.remind = remindList.includes(id); // 当前商品在当前用户那里是否为已标记
    result && (result.remind = false);

    res.end(JSON.stringify(result));
  } catch (error) {
    console.log("err", error);
  }
};

module.exports = detail;
