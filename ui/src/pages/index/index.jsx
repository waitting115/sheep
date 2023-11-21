import React from "react";
import { View } from "@tarojs/components";
import { useLoad } from "@tarojs/taro";
// import "./index.css";
import styles from "./index.config";
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

  const serarch = (val) => {
    console.log('search', val);
  }

  return (
    <View>
      <View>
        <SearchBar placeholder="search" onSearch={search}/>
        <Switch checked />
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
          <SwiperItem>
            <img
              src="https://storage.360buyimg.com/jdc-article/NutUItaro34.jpg"
              alt=""
            />
          </SwiperItem>
          <SwiperItem>
            <img
              src="https://storage.360buyimg.com/jdc-article/NutUItaro2.jpg"
              alt=""
            />
          </SwiperItem>
          <SwiperItem>
            <img
              src="https://storage.360buyimg.com/jdc-article/welcomenutui.jpg"
              alt=""
            />
          </SwiperItem>
          <SwiperItem>
            <img
              src="https://storage.360buyimg.com/jdc-article/fristfabu.jpg"
              alt=""
            />
          </SwiperItem>
        </Swiper>
      </View>
      <View className={styles.rankingList}>
        <View className={styles.rankingItem}>
          <View className={styles.rankingItemFirst}>1</View>
          <View className={styles.rankingItemSecond}>2</View>
          <View className={styles.rankingItemThird}>3</View>
        </View>
        <View className={styles.rankingItem}>
          <View className={styles.rankingItemFirst}>1</View>
          <View className={styles.rankingItemSecond}>2</View>
          <View className={styles.rankingItemThird}>3</View>
        </View>
        <View className={styles.rankingItem}>
          <View className={styles.rankingItemFirst}>1</View>
          <View className={styles.rankingItemSecond}>2</View>
          <View className={styles.rankingItemThird}>3</View>
        </View>
      </View>
      <View>
        <Tabs
          value={tab1value}
          onChange={({ paneKey }) => {
            setTab1value(paneKey);
          }}
        >
          <Tabs.TabPane title="Tab 1"> Tab 1 </Tabs.TabPane>
          <Tabs.TabPane title="Tab 2"> Tab 2 </Tabs.TabPane>
          <Tabs.TabPane title="Tab 3"> Tab 3 </Tabs.TabPane>
        </Tabs>
      </View>
      <BackTop />
    </View>
  );
}
