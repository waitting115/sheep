import { useMemo } from "react";
import { Image, Cell, Price } from "@nutui/nutui-react";
import { HorizontalScrolling, Coupon } from "@nutui/nutui-biz";
import { Jimi40 } from "@nutui/icons-react";
import jd from "@/assets/jd.svg";
import tb from "@/assets/tb.svg";
import tm from "@/assets/tm.svg";
import pdd from "@/assets/pdd.svg";

function Charts() {
  // 数据需要传进来

  return (
    <>
      <div className="demo">
        排行榜
        <Cell className="nut-cell-left-zero">
          <HorizontalScrolling showMask={false}>
            {[1, 2, 3, 4, 5, 6].map((item) => {
              return (
                <div
                  className="nb-horizontalscrolling__contain-item"
                  key={item}
                >
                  <Image src="https://img13.360buyimg.com/imagetools/s140x140_jfs/t1/209493/27/20842/369749/6260d2eeE02eb253c/97386232ecf1c1ef.jpg" />
                  <div style={{ display: "flex" }}>
                    {/* <Jimi40 /> */}
                    {/* <Image src={cp} /> */}
                    <div>尿不湿</div>
                  </div>
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Price price={15} size="normal" thousands digits={0} />
                  </div>
                </div>
              );
            })}
          </HorizontalScrolling>
        </Cell>
      </div>
    </>
  );
}

export default Charts;
