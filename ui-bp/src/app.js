import { useLaunch } from "@tarojs/taro";
import "./app.css";
import "@nutui/nutui-react/dist/style.css";

function App({ children }) {
  useLaunch(() => {
    console.log("App launched.");
  });

  // children 是将要会渲染的页面
  return children;
}

export default App;
