const getFetch = require('./getFetch');

// 生成多多客推广位
async function generatePid() {
    let promotionSite = 0;
    try {
      const response = await getFetch({
        type: "pdd.ddk.goods.pid.generate",
        body: {
          number: 1, // 创建1个推广位
        },
      });
  
      promotionSite = response.data.p_id_generate_response.p_id_list[0].p_id;
    } catch (error) {
      console.error("Error generating PIDs:", error);
    }
  
    if (promotionSite === 0) {
      console.log("pid获取失败");
      return;
    }
  
    try {
      const response = await getFetch({
        type: "pdd.ddk.member.authority.query",
        body: {
          pid: promotionSite,
        },
      });
      if (response.data.authority_query_response.bind === 0) {
        try {
          const response = await getFetch({
            type: "pdd.ddk.oauth.goods.prom.url.generate",
            body: {
              generate_authority_url: true,
            },
          });
  
          console.log("response", response.data);
        } catch (error) {
          console.log("pdd.ddk.oauth.goods.prom.url.generate接口错误");
        }
        // 未备案 here
      } else if (response.data.authority_query_response.bind === 1) {
        // 已备案
      } else {
        console.log("pdd.ddk.member.authority.query接口错误");
      }
    } catch (error) {}
  
    return promotionSite;
  }