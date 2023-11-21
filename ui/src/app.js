import { useLaunch, redirectTo } from "@tarojs/taro";
import "./app.css";
import "@nutui/nutui-react/dist/style.css";
import { View } from "@tarojs/components";
import { Tabbar } from "@nutui/nutui-react";
import { Cart, Category, Find, Home, My } from "@nutui/icons-react";

function App({ children }) {
  useLaunch(() => {
    console.log("App launched.");
  });

  // children 是将要会渲染的页面
  return (
    <>
      {children}
      <View className="index">
        <Tabbar
          onSwitch={(child, idx) => {
            console.log("change", child, idx);
            // Taro.redirectTo({
            // redirectTo({
            //   url: '/pages/party/index',
            // })
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
    </>
  );
}

export default App;
