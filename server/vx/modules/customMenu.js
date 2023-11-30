const axios = require("axios");
const { getToken } = require("./AccessToken");

let menu = [
  {
    type: "view",
    name: "主页入口",
    url: "https://miemie.online/",
  },
];

const initCustomMenu = async () => {
  try {
    const token = await getToken();
    const form = new FormData();
    form.append("button", JSON.stringify(menu));
    const res = await axios.post(
      `https://api.weixin.qq.com/cgi-bin/menu/create?access_token=${token}`,
      form
    );
    if (res.errcode === 0) {
      // {"errcode":0,"errmsg":"ok"}
      console.log("自定义菜单设置成功");
    } else {
      // {"errcode":40018,"errmsg":"invalid button name size"}
      console.log("自定义菜单设置失败：", res.errcode, res.errmsg);
    }
  } catch (error) {
    console.log("自定义菜单设置错误：", error);
  }
};

module.exports = {
  initCustomMenu,
};
