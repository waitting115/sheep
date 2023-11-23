import React, { useEffect, useState } from "react";
import { View } from "@tarojs/components";
import { useLoad } from "@tarojs/taro";
import request from "../../utils/request";
import TabBar from "../../components/TabBar/index";
// import "./index.css";
import styles from "./index.module.css";
import {
  Switch,
  SearchBar,
  Swiper,
  SwiperItem,
  Tabs,
  BackTop,
} from "@nutui/nutui-react";

export default function Index() {
  useLoad(() => {
    console.log("Page loaded.");
  });
  const [tab1value, setTab1value] = useState("0");
  const [pddList, setPddList] = useState([]);

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

  const getSwiperData = () => {};
  const getPddList = async () => {
    try {
      const res = await request.get("commodity/recommend");
      setPddList(res.pdd.list);
    } catch (error) {
      console.error("error:", error);
    }
  };

  const getGoodsDetail = async () => {
    try {
      const res = await request.get(`/commodity/detail`, {
        params: {
          platform: "pdd",
          goodSign: "E9_2zvybn4hKtOylwfvcrAvqomLECox6_JQSC0yijXh",
        },
      });
      // console.log("res", res.goods_details[0]);
    } catch (error) {
      console.error("error:", error);
    }
  };

  const [initPage1, setInitPage1] = useState(0);
  const [height, setHeight] = useState(150);
  const onChange = (e) => {
    // do something
  };

  useEffect(() => {
    // getSwiperData();
    getPddList();
    // search("袜子"); // pid未备案
    // getGoodsDetail();
  }, []);

  return (
    <View>
      <View>
        <SearchBar placeholder="search" onSearch={search} />
        {/* <Switch checked /> */}
      </View>
      <View>
        <Swiper
          height={height}
          paginationColor="#426543"
          paginationBgColor="#426ddd"
          autoPlay="3000"
          initPage={initPage1}
          paginationVisible
          onChange={onChange}
        >
          {pddList.slice(0, 3).map((v, i) => (
            <SwiperItem key={i}>
              <img src={v.goods_thumbnail_url} alt="" />
            </SwiperItem>
          ))}
        </Swiper>
      </View>
      <Tabs
        value={tab1value}
        onChange={({ paneKey }) => {
          setTab1value(paneKey);
        }}
      >
        <Tabs.TabPane title="拼多多">
          {pddList.map((v, i) => (
            <img
              key={i}
              src={v.goods_thumbnail_url}
              style={{ width: 100, height: 100 }}
            ></img>
          ))}
        </Tabs.TabPane>
        <Tabs.TabPane title="京东"> Tab 2 </Tabs.TabPane>
        <Tabs.TabPane title="淘宝"> Tab 3 </Tabs.TabPane>
      </Tabs>
      <BackTop />
      <TabBar />
    </View>
  );
}
