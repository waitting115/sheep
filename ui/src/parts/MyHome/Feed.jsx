import { Price, Row, Col, Tag, Ellipsis } from "@nutui/nutui-react";
import { ProductFeed, Coupon } from "@nutui/nutui-biz";
import { useEffect, useState, useMemo, useCallback } from "react";
import getTab from "@/utils/getTab";
import { useNavigate } from "react-router-dom";
import { Dongdong } from "@nutui/icons-react";
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
      console.log("res", res);
    } catch (error) {
      console.error("error:", error);
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
    //优惠券样式
    const couponSmallStyle = useMemo(() => {
      return {
        width: "127px",
        height: "auto",
        backgroundImage: `url(https://static.360buyimg.com/jdcdkh/open/1.0.0/assets/bg-coupon.6df5b4ed.png)`,
        marginRight: `10px`,
        marginBottom: `10px`,
      };
    }, []);
    //优惠券主体样式
    const couponMainSmallStyle = useMemo(() => {
      return {
        width: "80%",
        color: "red",
      };
    }, []);
    //渲染优惠券文案
    const couponObj = useMemo(() => {
      return {
        price: 9,
        currency: "¥",
        mainTitle: "满100元可用",
        subTitle: "仅可购买满折券测试",
        label: "618",
      };
    }, []);
    //已经使用的icon标记
    const usedIcon = useMemo(() => {
      return (
        <img
          src="https://storage.360buyimg.com/jdcdkh/open/1.0.0/assets/use-mask.60dc7c10.png"
          width="45px"
          height="42px"
        />
      );
    }, []);

    const [arrReceived, setArrReceived] = useState([]);
    //点击小优惠券领取按钮交互
    const receivedBtn = useCallback(
      (item) => {
        console.log(item);
        if (!arrReceived.includes(item.item)) {
          arrReceived.push(item.item);
        }
        setArrReceived([...arrReceived]);
      },
      [arrReceived]
    );

    return (
      <>
        <Row>
          {getTab(item).map((v, i) => (
            <Col span={4} key={i}>
              <Tag color="#FA2400" plain>
                {v}
              </Tag>
            </Col>
          ))}
        </Row>
        <Row>
          <Col span={4}>
            <Dongdong />
          </Col>
          <Col span={20}>
            <Ellipsis content={item.name} direction="end" rows="2" />
          </Col>
        </Row>
        <Row>
          <Col span={14}>
            <Price price={10} size="small" needSymbol thousands />
          </Col>
          <Col span={10}>
            {/* <Price
              price={5}
              size="normal"
              position="after"
              symbol="券"
              needSymbol
              thousands
            /> */}
            <Coupon
              pricePosition="front"
              type="small"
              usedIcon={usedIcon}
              couponMainStyle={couponMainSmallStyle}
              couponStyle={couponSmallStyle}
              couponData={{ ...couponObj }}
              onBtnClick={receivedBtn}
            ></Coupon>
          </Col>
        </Row>
        <Row>
          <Col span={12}>**********</Col>
          <Col span={12}>月销1000+</Col>
        </Row>
      </>
    );
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="demo product-feed-demo">
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
      />
    </div>
  );
}

export default Feed;
