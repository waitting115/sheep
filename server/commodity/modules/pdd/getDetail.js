const getFetch = require("./getFetch");
const { pid } = require("./config");

async function getDetail(goodSign) {
  let res = [];
  try {
    res = await getFetch({
      type: "pdd.ddk.goods.detail",
      body: {
        goods_sign: goodSign,
      },
    });
    console.log("res", res.data.goods_detail_response);
  } catch (error) {
    console.log("error pdd.ddk.goods.search", error);
  }

  return res.data.goods_detail_response;
}

module.exports = {
  getDetail,
};
