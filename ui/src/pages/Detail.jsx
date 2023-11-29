import React, { useEffect, useState, useCallback, useMemo } from "react";
import {
  Row,
  Col,
  Swiper,
  SwiperItem,
  NavBar,
  Toast,
  Image,
} from "@nutui/nutui-react";
import { CartBar, CartBarIcon, CartBarButton, Coupon } from "@nutui/nutui-biz";
import request from "@/utils/request";
import { useSearchParams, useNavigate } from "react-router-dom";
import PriceTrend from "@/parts/Detail/PriceTrend";
import { Left, Share, Close } from "@nutui/icons-react";
import { Shop } from "@nutui/icons-react";

/**
 * 商品详情组件
 */
function Detail() {
  const navigate = useNavigate();
  let [searchParams, setSearchParams] = useSearchParams();
  const platform = searchParams.get("platform");
  const goodSign = searchParams.get("goodSign");
  console.log(878, platform, goodSign);
  const [data, setData] = useState({});

  const getGoodsDetail = async () => {
    try {
      const res = await request.get(`/commodity/detail`, {
        params: {
          // platform: "pdd",
          // goodSign: "E9_2zvybn4hKtOylwfvcrAvqomLECox6_JQSC0yijXh",
          platform: platform,
          goodSign: goodSign,
        },
      });
      setData(res.goods_details[0]);
      // console.log("res", res.goods_details[0]);
    } catch (error) {
      console.error("error:", error);
    }
  };

  const [initPage1, setInitPage1] = useState(0);
  const onChange = (e) => {
    // do something
  };

  //按钮props
  const buttonProps = useMemo(() => {
    return {
      type: "primary",
      size: "small",
      plain: true,
      className: "cancel-btn",
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
  //渲染组件文案内容
  const baseCouponObj = useMemo(() => {
    return {
      price: "9",
      currency: "¥",
      mainTitle: "满100元可用",
      subTitle: "仅可购买满折券测试",
      label: <div style={{ color: "red" }}>内购专享</div>,
      timeRange: "2022.03.01-2022.04.01",
    };
  }, []);
  //优惠券样式
  const couponBaseStyle = useMemo(() => {
    return {
      width: "100%",
      height: "auto",
      backgroundImage: `url(https://storage.360buyimg.com/jdcdkh/open/1.0.0/assets/bg-coupon-red.f6ae2e19.png)`,
    };
  }, []);
  //优惠券主体样式
  const couponMainBaseStyle = useMemo(() => {
    return {
      width: "69%",
      color: "#fff",
    };
  }, []);
  //按钮文案
  const [btnText, setBtnText] = useState("立即领取");
  //是否点击了立即领取按钮
  const [receivedStatus, setReceivedStatus] = useState(false);
  const basedOnClick = useCallback(() => {
    setBtnText("已领取");
    setReceivedStatus(true);
  }, [btnText, receivedStatus]);
  const demoStyle = {
    height: "100%",
    overflow: "auto",
    padding: "17px 17px 0 17px",
  };

  const chartData = [
    {
      date: "2017-06-05",
      value: 116,
    },
    {
      date: "2017-06-06",
      value: 129,
    },
    {
      date: "2017-06-07",
      value: 135,
    },
    {
      date: "2017-06-08",
      value: 86,
    },
    {
      date: "2017-06-09",
      value: 73,
    },
    {
      date: "2017-06-10",
      value: 85,
    },
    {
      date: "2017-06-11",
      value: 73,
    },
    {
      date: "2017-06-12",
      value: 68,
    },
    {
      date: "2017-06-13",
      value: 92,
    },
    {
      date: "2017-06-14",
      value: 130,
    },
    {
      date: "2017-06-15",
      value: 245,
    },
    {
      date: "2017-06-16",
      value: 139,
    },
    {
      date: "2017-06-17",
      value: 115,
    },
    {
      date: "2017-06-18",
      value: 111,
    },
    {
      date: "2017-06-19",
      value: 309,
    },
    {
      date: "2017-06-20",
      value: 206,
    },
    {
      date: "2017-06-21",
      value: 137,
    },
    {
      date: "2017-06-22",
      value: 128,
    },
    {
      date: "2017-06-23",
      value: 85,
    },
    {
      date: "2017-06-24",
      value: 94,
    },
    {
      date: "2017-06-25",
      value: 71,
    },
    {
      date: "2017-06-26",
      value: 106,
    },
    {
      date: "2017-06-27",
      value: 84,
    },
    {
      date: "2017-06-28",
      value: 93,
    },
    {
      date: "2017-06-29",
      value: 85,
    },
    {
      date: "2017-06-30",
      value: 73,
    },
    {
      date: "2017-07-01",
      value: 83,
    },
    {
      date: "2017-07-02",
      value: 125,
    },
    {
      date: "2017-07-03",
      value: 107,
    },
    {
      date: "2017-07-04",
      value: 82,
    },
    {
      date: "2017-07-05",
      value: 44,
    },
    {
      date: "2017-07-06",
      value: 72,
    },
    {
      date: "2017-07-07",
      value: 106,
    },
    {
      date: "2017-07-08",
      value: 107,
    },
    {
      date: "2017-07-09",
      value: 66,
    },
    {
      date: "2017-07-10",
      value: 91,
    },
    {
      date: "2017-07-11",
      value: 92,
    },
    {
      date: "2017-07-12",
      value: 113,
    },
    {
      date: "2017-07-13",
      value: 107,
    },
    {
      date: "2017-07-14",
      value: 131,
    },
    {
      date: "2017-07-15",
      value: 111,
    },
    {
      date: "2017-07-16",
      value: 64,
    },
    {
      date: "2017-07-17",
      value: 69,
    },
    {
      date: "2017-07-18",
      value: 88,
    },
    {
      date: "2017-07-19",
      value: 77,
    },
    {
      date: "2017-07-20",
      value: 83,
    },
    {
      date: "2017-07-21",
      value: 111,
    },
    {
      date: "2017-07-22",
      value: 57,
    },
    {
      date: "2017-07-23",
      value: 55,
    },
    {
      date: "2017-07-24",
      value: 60,
    },
  ];

  useEffect(() => {
    getGoodsDetail();
  }, []);

  return (
    <>
      <NavBar
        back={
          <>
            <Left name="left" color="#979797" />
          </>
        }
        right={
          <span onClick={(e) => Toast.show("icon")}>
            <Share />
          </span>
        }
        onBackClick={() => navigate(-1)}
      >
        <span>商品详情</span>
      </NavBar>
      <Row>
        <Col span={24}>
          <Swiper
            height={200}
            paginationColor="#426543"
            paginationBgColor="#426ddd"
            autoPlay="3000"
            initPage={initPage1}
            paginationVisible
            onChange={onChange}
          >
            <SwiperItem>
              <Image
                src="https://storage.360buyimg.com/jdc-article/NutUItaro34.jpg"
                alt=""
                height="200"
              />
            </SwiperItem>
            <SwiperItem>
              <Image
                src="https://storage.360buyimg.com/jdc-article/NutUItaro2.jpg"
                alt=""
                height="200"
              />
            </SwiperItem>
            <SwiperItem>
              <Image
                src="https://storage.360buyimg.com/jdc-article/welcomenutui.jpg"
                alt=""
                height="200"
              />
            </SwiperItem>
            <SwiperItem>
              <Image
                src="https://storage.360buyimg.com/jdc-article/fristfabu.jpg"
                alt=""
                height="200"
              />
            </SwiperItem>
          </Swiper>
        </Col>
      </Row>
      <Row className="px-2">
        <Col span={24} className="text-left">
          尿不湿尿不湿尿不湿尿不湿尿不湿尿不湿尿不湿尿不湿尿不湿尿不湿尿不湿尿不湿尿不湿尿不湿尿不湿尿不湿尿不湿尿不湿
        </Col>
      </Row>
      <div className="flex justify-between px-2">
        <div>特步旗舰店</div>
        <div className="text-gray-400 text-xs">月销1000+</div>
      </div>
      <Row className="px-2">
        <Col span={24}>
          <Coupon
            pricePosition="back"
            couponStyle={couponBaseStyle}
            couponMainStyle={couponMainBaseStyle}
            couponData={baseCouponObj}
            btnText={btnText}
            isReceived={receivedStatus}
            usedIcon={usedIcon}
            buttonProps={buttonProps}
            onBtnClick={basedOnClick}
          ></Coupon>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <PriceTrend chartData={chartData} />
        </Col>
      </Row>
      <div className="demo">
        <CartBar placeholder={true}>
          <CartBarIcon text="加入降价提醒" iconProps={{ name: "Shop" }} />
          <CartBarButton text="复制口令" buttonProps={{ type: "danger" }} />
          <CartBarButton text="领券购买" buttonProps={{ type: "warning" }} />
        </CartBar>
      </div>
    </>
  );
}

export default Detail;
