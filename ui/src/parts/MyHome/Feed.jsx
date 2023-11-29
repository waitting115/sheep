import { Price, Row, Col, Tag, Ellipsis, Image } from "@nutui/nutui-react";
import { ProductFeed, Coupon } from "@nutui/nutui-biz";
import { useEffect, useState, useMemo, useCallback } from "react";
import getTab from "@/utils/getTab";
import { useNavigate } from "react-router-dom";
import request from "@/utils/request";
import couponIcon from "@/assets/coupon-icon.svg";
import getPlatformLogo from "@/utils/getPlatformLogo";

/**
 * 推荐商品列表组件
 * @param {string} platform  平台id， pdd/jd/tb
 * @returns
 */
function Feed({ platform }) {
  const [listDouble, setListDouble] = useState([]);
  const navigate = useNavigate();

  const getPddList = async () => {
    let res = [];
    try {
      const result = await request.get("commodity/recommend");
      res = result.list;
    } catch (error) {
      console.error("接口commodity/recommend error:", error);
    }
    return res;
  };
  const getJdList = async () => {};
  const getTbList = async () => {};

  const getData = async () => {
    let res = [];
    switch (platform) {
      case "pdd":
        res = await getPddList();
        break;
      case "jd":
        res = await getJdList();
        break;
      case "tb":
        res = await getTbList();
        break;
      default:
        console.error("未知的platform：", platform);
    }
    res = res ? res : [];
    res.length = 10;
    res.fill(1);
    setListDouble(
      res.map((v, i) => ({
        id: i + 1,
        imgUrl:
          "//img13.360buyimg.com/imagetools/jfs/t1/190855/7/12881/42147/60eb0cabE0c3b7234/d523d551413dc853.png",
        name: "我是标题我是标题我是标题我是标题我是标题",
        desc: "更多买点更多买点",
        tag: i == 3 && "标签标签",
        price: "388",
        label: "自营",
      }))
    );
  };

  const loadMoreDouble = (done) => {
    // setTimeout(() => {
    //   loadMore(listDouble);
    //   done();
    // }, 500);
  };

  const handleClick = (item, index) => {
    // 带着id跳转到详情
    navigate(
      "/detail?platform=pdd&goodSign=E9_2zvybn4hKtOylwfvcrAvqomLECox6_JQSC0yijXh"
    );
    console.log("click", item, index);
  };

  const refresh = () => {};

  const customProductDouble = (item) => {
    return (
      <>
        <Row>
          {getTab(item).map((v, i) => (
            <Col span={6} key={i}>
              <Tag color="#FA2400" plain>
                <span style={{ fontSize: 10 }}>{v}</span>
              </Tag>
            </Col>
          ))}
        </Row>
        <div className="flex">
          <div>{getPlatformLogo(platform)}</div>
          <div>
            <Ellipsis content={item.name} direction="end" rows="1" />
          </div>
        </div>
        <Row>
          <Col span={10}>
            <Price price={10} needSymbol size="normal" thousands />
          </Col>
          <Col span={6}></Col>
          <Col span={8}>
            <div
              className="flex justify-center items-center"
              style={{
                background: `url(${couponIcon})  center center / cover no-repeat`,
                color: "#fff",
                width: 39,
                height: 23,
              }}
            >
              {50}
            </div>
          </Col>
        </Row>
        <div className="flex text-xs justify-between">
          <div>特步旗舰店</div>
          <div className="text-gray-400">月销1000+</div>
        </div>
      </>
    );
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="demo product-feed-demo bg-slate-100">
      <ProductFeed
        infiniteloadingProps={{
          hasMore: true, // 是否还有更多数据
          onLoadMore: loadMoreDouble, // 继续加载的回调函数
          onRefresh: refresh, // 下拉刷新事件回调
          isOpenRefresh: true, // 下拉刷新
          threshold: 200, // 距离底部多远加载
          loadMoreTxt: "到底了", // “没有更多数”据展示文案
        }}
        customProduct={customProductDouble}
        data={listDouble}
        col={2} // 每行商品数量，可选值有 1、 2
        onClick={handleClick}
        imgWidth="160px"
        imgHeight="160px"
      />
    </div>
  );
}

export default Feed;
