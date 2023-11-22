const { pid } = require("./config");
const getFetch = require("./getFetch");

async function getRecommend() {
  let res = [];
  try {
    res = await getFetch({
      type: "pdd.ddk.goods.recommend.get",
    });
  } catch (error) {
    console.log("error pdd.ddk.goods.recommend.get", error);
  }

  return res.data.goods_basic_detail_response;
}

module.exports = {
  getRecommend,
};
