import { Swiper, Image } from "@nutui/nutui-react";
import { useState } from "react";

function ActiveSwiper() {
  const [defaultValue1, setdefaultValue1] = useState(0);
  const [height, setHeight] = useState(150);
  const list = [
    "https://storage.360buyimg.com/jdc-article/NutUItaro34.jpg",
    "https://storage.360buyimg.com/jdc-article/NutUItaro2.jpg",
    "https://storage.360buyimg.com/jdc-article/welcomenutui.jpg",
    "https://storage.360buyimg.com/jdc-article/fristfabu.jpg",
  ];

  return (
    <>
      <Swiper
        height={height}
        style={{
          "--nutui-indicator-color": "#426543",
          "--nutui-indicator-dot-color": "#426ddd",
        }}
        autoPlay="3000"
        defaultValue={defaultValue1}
        indicator
      >
        {list.map((item, index) => {
          return (
            <Swiper.Item key={item}>
              <Image src={item} onClick={() => console.log(index)} alt="" />
            </Swiper.Item>
          );
        })}
      </Swiper>
    </>
  );
}

export default ActiveSwiper;
