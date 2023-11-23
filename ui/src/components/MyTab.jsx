import { Tabbar } from "@nutui/nutui-react";
import { Cart, Category, Find, Home } from "@nutui/icons-react";
import { useNavigate } from "react-router-dom";

const MyTab = () => {
  const navigate = useNavigate();
  const routeList = ["/", "/wool", "/remind", "/party"];

  return (
    <>
      <Tabbar
        fixed
        onSwitch={(value) => {
          navigate(routeList[value]);
        }}
      >
        <Tabbar.Item
          title="首页"
          icon={<Home width={18} height={18} />}
          // value={9}
        />
        <Tabbar.Item
          title="羊毛"
          icon={<Category width={18} height={18} dot />}
        />
        <Tabbar.Item title="降价提醒" icon={<Find width={18} height={18} />} />
        <Tabbar.Item title="吃喝玩乐" icon={<Cart width={18} height={18} />} />
      </Tabbar>
    </>
  );
};

export default MyTab;
