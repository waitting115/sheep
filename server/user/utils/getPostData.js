// 处理 POST 请求数据
function getPostData(req) {
  return new Promise((request, reset) => {
    let data = "";

    req.on("data", (chunk) => {
      data += chunk;
    });

    req.on("end", () => {
      request(data);
    });

    req.on("error", (error) => {
      reset(error);
    });
  });
}

module.exports = getPostData;
