import { useEffect, useState } from "react";
import { SearchBar, Tabs } from "@nutui/nutui-react";
import "@nutui/nutui-biz/dist/styles/demo.css";
import ActiveSwiper from "../parts/MyHome/ActiveSwiper";
import Charts from "../parts/MyHome/Charts";
import Feed from "../parts/MyHome/Feed";
import request from "@/utils/request";

const panelList = [
  {
    id: "pdd",
    name: "拼多多",
  },
  {
    id: "jd",
    name: "京东",
  },
  {
    id: "tb",
    name: "淘宝",
  },
];

/**
 * 首页
 */
function MyHome() {
  const [tab1value, setTab1value] = useState("0");

  useEffect(() => {}, []);

  return (
    <>
      <SearchBar placeholder="111" />
      <ActiveSwiper />
      <Charts />
      <Tabs
        value={tab1value}
        onChange={(value) => {
          setTab1value(value);
        }}
        // activeType="smile"
      >
        {panelList.map((v) => (
          <Tabs.TabPane title={v.name} key={v.id}>
            <Feed id={v.id} />
          </Tabs.TabPane>
        ))}
      </Tabs>
    </>
  );
}

export default MyHome;
