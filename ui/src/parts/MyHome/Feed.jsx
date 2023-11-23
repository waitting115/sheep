import { Price } from "@nutui/nutui-react";
import { ProductFeed } from "@nutui/nutui-biz";
import { useEffect, useState } from "react";

function Feed({ id }) {
  console.log("id", id);
  const [data, setData] = useState([]);
  const [listDouble, setListDouble] = useState([]);
  const [hasMoreDouble, setHasMoreDouble] = useState(true);

  useEffect(() => {
    initData();
  }, []);

  const init = () => {
    for (let i = 0; i < 6; i++) {
      listDouble.push(data[i]);
    }
    setListDouble([...listDouble]);
  };

  const initData = () => {
    for (var i = 0; i < 12; i++) {
      data.push({
        id: i + 1,
        imgUrl:
          "//img13.360buyimg.com/imagetools/jfs/t1/190855/7/12881/42147/60eb0cabE0c3b7234/d523d551413dc853.png",
        name: "我是标题我是标题我是标题我是标题我是标题",
        desc: "更多买点更多买点",
        tag: i == 3 && "标签标签",
        price: "388",
        label: "自营",
      });
    }
    init();
  };

  const loadMore = (list) => {
    const curLen = list.length;

    if (list.length >= data.length) {
      setHasMoreDouble(false);
    } else {
      for (
        let i = curLen;
        i < (curLen + 6 > data.length ? data.length : curLen + 6);
        i++
      ) {
        list.push(data[i]);
      }
      setListDouble([...list]);
    }
  };

  const loadMoreDouble = (done) => {
    setTimeout(() => {
      loadMore(listDouble);
      done();
    }, 500);
  };

  const handleClick = (item, index) => {
    console.log("click", item, index);
  };

  const handleImageClick = (item, index) => {
    console.log("click image", item, index);
  };

  const customProductDouble = (item) => {
    return (
      <>
        <div className="name-box">{item.name}</div>
        {item.tag && <div className="name-box">{item.tag}</div>}
        <div className="bottom">
          <div className="price-box">
            <div className="price">
              <Price price={item.price} />
            </div>
          </div>
        </div>
      </>
    );
  };
  return (
    <div className="demo product-feed-demo">
      <ProductFeed
        infiniteloadingProps={{
          hasMore: hasMoreDouble,
          onLoadMore: loadMoreDouble,
          isOpenRefresh: true, // 下拉刷新
        }}
        customProduct={customProductDouble}
        data={listDouble}
        col={2}
        imgUrl="imgUrl"
        imgWidth="144"
        imgHeight="144"
        imgTag={
          <div className="img-label">
            <img src="https://img12.360buyimg.com/imagetools/jfs/t1/186347/7/7338/1009/60c0806bE0b6c7207/97fd04b48d689ffe.png" />
          </div>
        }
        onClick={handleClick}
        onImageClick={handleImageClick}
      />
    </div>
  );
}

export default Feed;
