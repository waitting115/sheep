import React from "react";
import { View, Text } from "@tarojs/components";
import { useLoad } from "@tarojs/taro";
import "./index.css";
import { Tabbar } from "@nutui/nutui-react";
import { Cart, Category, Find, Home, My } from "@nutui/icons-react";

export default function Index() {
  useLoad(() => {
    console.log("Page loaded.");
  });

  return (
    <View className="index">
      <Tabbar
        onSwitch={(value) => {
          console.log(value);
        }}
      >
        <Tabbar.Item
          title="首页"
          icon={<Home width={18} height={18} />}
          value={9}
        />
        <Tabbar.Item
          title="分类"
          icon={<Category width={18} height={18} dot />}
        />
        <Tabbar.Item title="发现" icon={<Find width={18} height={18} />} />
        <Tabbar.Item title="购物车" icon={<Cart width={18} height={18} />} />
        <Tabbar.Item title="我的" icon={<My width={18} height={18} />} />
      </Tabbar>
    </View>
  );
}
