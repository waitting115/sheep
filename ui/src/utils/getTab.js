/**
 * 通过商品信息输出商品标签
 * @param {object} item 商品信息
 * @returns tag列表 string[]
 */
function getTab(item) {
  return ["史低", "销冠", "新品", "好评"];
}

export default getTab;
