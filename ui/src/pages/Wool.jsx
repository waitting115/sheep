import { useEffect, useState } from "react";
import { SearchBar, Tabs, Image } from "@nutui/nutui-react";
/**
 * 羊毛组件
 */
function Wool() {
  const [tab1value, setTab1value] = useState("0");
  const panelList = [
    {
      id: "0",
      name: "0元购",
    },
    {
      id: "9.9",
      name: "9.9包邮",
    },
    {
      id: "qc",
      name: "断码清仓",
    },
  ];

  return (
    <>
      <Image src={""} alt="" />
      <Tabs
        value={tab1value}
        onChange={(value) => {
          setTab1value(value);
        }}
        // activeType="smile"
      >
        {panelList.map((v) => (
          <Tabs.TabPane title={v.name} key={v.id}>
            {v.name}
          </Tabs.TabPane>
        ))}
      </Tabs>
    </>
  );
}

export default Wool;
