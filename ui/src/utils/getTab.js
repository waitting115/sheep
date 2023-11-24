/**
 * 通过商品信息输出商品标签
 * @param {object} item 商品信息
 * @returns tag列表 string[]
 */
function getTab(item) {
  console.log("item", item);
  return ["tag1", "tag2", "tag3", "tag4", "tag5"];
}

export default getTab;
