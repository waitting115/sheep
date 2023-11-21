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

  const state = {
    imgUrl:
      "//img10.360buyimg.com/n2/s240x240_jfs/t1/210890/22/4728/163829/6163a590Eb7c6f4b5/6390526d49791cb9.jpg!q70.jpg",
    title:
      "【活蟹】湖塘煙雨 阳澄湖大闸蟹公4.5两 母3.5两 4对8只 鲜活生鲜螃蟹现货水产礼盒海鲜水",
    price: "388",
    vipPrice: "378",
    shopDesc: "自营",
    delivery: "厂商配送",
    shopName: "阳澄湖大闸蟹自营店>",
  };

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
      <Cell>
        <ul id="scroll" style={InfiniteUlStyle}>
          <Infiniteloading
            containerId="scroll"
            useWindow={false}
            hasMore={hasMore}
            loadMore={loadMore}
          >
            {defultList.map((item, index) => {
              return (
                <li key={index} style={InfiniteLiStyle}>
                  <Card
                    imgUrl={state.imgUrl}
                    title={state.title}
                    price={state.price}
                    vipPrice={state.vipPrice}
                    shopDesc={state.shopDesc}
                    delivery={state.delivery}
                    shopName={state.shopName}
                  >
                    {" "}
                  </Card>
                </li>
              );
            })}
          </Infiniteloading>
        </ul>
      </Cell>
    </View>
  );
}
