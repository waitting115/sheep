// 获取券：get commodity/coupon/{id}（首次需要跳转授权，code 存储）
const { getCoupon: pddGetCoupon } = require("../modules/pdd/getCoupon");
const { getCoupon: jdGetCoupon } = require("../modules/jd/getCoupon");
const { getCoupon: tbGetCoupon } = require("../modules/tb/getCoupon");

const coupon = (req, res) => {
  // - 首次需要跳转授权，code 存储
  // - 请求
  // - 数据返回
  const parsedUrl = url.parse(req.url, true);
  const { platform } = parsedUrl.query;
  const pathSegments = parsedUrl.pathname.split("/");

  // 获取请求中的动态值
  const id = pathSegments[3];

  let result = null;
  switch (platform) {
    case "pdd":
      result = pddGetCoupon(id);
      break;
    case "jd":
      result = jdGetCoupon(id);
      break;
    case "tb":
      result = tbGetCoupon(id);
      break;
    default:
      console.log("未知的平台类型：", v.platform);
      return null;
  }
};

module.exports = coupon;
