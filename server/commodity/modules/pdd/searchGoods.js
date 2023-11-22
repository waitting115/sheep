const getFetch = require("./getFetch");
const { pid } = require("./config");

const searchGoods = async (title) => {
  let res = [];
  try {
    res = await getFetch({
      type: "pdd.ddk.goods.search",
      body: {
        pid: pid, // 新的pid审核通过后试一下
        keyword: title,
      },
    });
    console.log("res", res.data);
  } catch (error) {
    console.log("error pdd.ddk.goods.search", error);
  }

  return res.data.goods_search_response;
};

module.exports = {
  searchGoods,
};
