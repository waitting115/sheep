import { Image, Price, Ellipsis } from "@nutui/nutui-react";
import { HorizontalScrolling, Coupon } from "@nutui/nutui-biz";
import getPlatformLogo from "@/utils/getPlatformLogo";
import { useNavigate } from "react-router-dom";

function Charts() {
  // 数据需要传进来
  const navigate = useNavigate();

  const handleClick = (item, index) => {
    // 带着id跳转到详情
    navigate(
      "/detail?platform=pdd&goodSign=E9_2zvybn4hKtOylwfvcrAvqomLECox6_JQSC0yijXh"
    );
  };

  return (
    <>
      <div className="demo">
        排行榜
        <HorizontalScrolling showMask={false} className="px-2">
          {[1, 2, 3, 4, 5, 6].map((item) => {
            return (
              <div
                className="nb-horizontalscrolling__contain-item"
                key={item}
                onClick={handleClick}
              >
                <Image src="https://img13.360buyimg.com/imagetools/s140x140_jfs/t1/209493/27/20842/369749/6260d2eeE02eb253c/97386232ecf1c1ef.jpg" />
                <Ellipsis
                  content={"尿不湿尿不湿尿不湿尿不湿尿不湿"}
                  direction="end"
                  rows="1"
                  className="py-1"
                />
                <div className="flex justify-between px-1">
                  {getPlatformLogo("pdd")}
                  <Price price={15} size="normal" thousands digits={0} />
                </div>
              </div>
            );
          })}
        </HorizontalScrolling>
      </div>
    </>
  );
}

export default Charts;
