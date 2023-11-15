// 处理 POST 请求数据
function handlePostData(req, callback) {
  let data = "";

  req.on("data", (chunk) => {
    data += chunk;
  });

  req.on("end", () => {
    callback(null, data);
  });

  req.on("error", (error) => {
    callback(error, null);
  });
}

module.exports = {
  handlePostData,
};
