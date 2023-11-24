import request from "@/utils/request";

function Search() {
  const search = async (val) => {
    console.log("search", val);
    try {
      const res = await request.get("commodity/search", {
        params: {
          title: "袜子",
        },
      });
      console.log("res", res);
      s;
    } catch (error) {}
  };
  return <>Search</>;
}

export default Search;
