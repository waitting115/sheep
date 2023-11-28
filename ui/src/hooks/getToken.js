import request from "../utils/request";

/**
 * 通过cid获取token 并存到localStore
 */
const getToken = async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const cid = urlParams.get("cid");

  if (cid) {
    try {
      const res = await request.get("user/getToken", {
        params: {
          cid: cid,
        },
      });
      const newToken = res?.data?.token;
      newToken && localStorage.setItem("token", newToken);
    } catch (error) {
      console.error("Error fetching token:", error);
    }
  }
};

export default getToken;
