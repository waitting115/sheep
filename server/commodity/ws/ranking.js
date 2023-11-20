// 获取排行榜 websocket
// 根据一定规则进行更新数据
const { getRanking: pddGetRanking } = require("../modules/pdd/getRanking");
const { getRanking: jdGetRanking } = require("../modules/jd/getRanking");
const { getRanking: tbGetRanking } = require("../modules/tb/getRanking");

const ranking = (ws) => {
  ws.send(`Server received: ${message}`);
};

module.exports = ranking;
