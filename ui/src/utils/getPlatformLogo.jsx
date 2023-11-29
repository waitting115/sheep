import { Image } from "@nutui/nutui-react";

import jd from "@/assets/jd.svg";
import tb from "@/assets/tb.svg";
import tm from "@/assets/tm.svg";
import pdd from "@/assets/pdd.svg";

const getPlatformLogo = (platform) => {
  let url = "";
  switch (platform) {
    case "pdd":
      url = pdd;
      break;
    case "jd":
      url = jd;
      break;
    case "tb":
      url = tb;
      break;
    default:
      return null;
  }
  return (
    <Image src={url} width="22" height="22" style={{ marginRight: "10px" }} />
  );
};

export default getPlatformLogo;
