import React from "react";
import { View } from "@tarojs/components";
import { useLoad } from "@tarojs/taro";
import "./index.css";
import {
  NavBar,
  Infiniteloading,
  Cell,
  Card,
  Price,
  Tag,
} from "@nutui/nutui-react";

const InfiniteUlStyle = {
  height: "300px",
  width: "100%",
  padding: "0",
  overflowY: "auto",
  overflowX: "hidden",
};

const InfiniteLiStyle = {
  marginTop: "10px",
  fontSize: "14px",
  color: "rgba(100, 100, 100, 1)",
  textAlign: "center",
};

export default function Index() {
  const [defultList, setDefultList] = useState([]);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    init();
  }, []);

  const loadMore = (done) => {
    setTimeout(() => {
      const curLen = defultList.length;
      for (let i = curLen; i < curLen + 10; i++) {
        defultList.push(`${i}`);
      }
      if (defultList.length >= 30) {
        setHasMore(false);
      } else {
        setDefultList([...defultList]);
      }
      done();
    }, 500);
  };

  const init = () => {
    for (let i = 0; i < 10; i++) {
      defultList.push(`${i}`);
    }
    setDefultList([...defultList]);
  };

  useLoad(() => {
    console.log("Page loaded.");
  });

  return (
    <View>
      <NavBar
        title="订单详情"
        leftShow
        leftText="返回"
        onClickTitle={(e) => alert("标题")}
        onClickBack={(e) => alert("返回")}
        onClickRight={(e) => alert("icon")}
      >
        <Icon name="share" slot="right" />
      </NavBar>
    </View>
  );
}
