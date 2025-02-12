import entireOff from "../../../assets/ButtonImg/Entire.svg";
import entireOn from "../../../assets/ButtonImg/EntireActive.svg";
import waterOff from "../../../assets/ButtonImg/Water.svg";
import waterOn from "../../../assets/ButtonImg/WaterActive.svg";
import dryOff from "../../../assets/ButtonImg/Dry.svg";
import dryOn from "../../../assets/ButtonImg/DryActive.svg";
import steamOff from "../../../assets/ButtonImg/Steam.svg";
import steamOn from "../../../assets/ButtonImg/SteamActive.svg";
import bleachingOff from "../../../assets/ButtonImg/White.svg";
import bleachingOn from "../../../assets/ButtonImg/WhiteActive.svg";
import dryCleanOff from "../../../assets/ButtonImg/DryCleaning.svg";
import dryCleanOn from "../../../assets/ButtonImg/DryCleaningActive.svg";

const ButtonData = [
  { id: 1, imageOff: entireOff, imageOn: entireOn, text: "전체보기" },
  { id: 2, imageOff: waterOff, imageOn: waterOn, text: "물세탁" },
  { id: 3, imageOff: bleachingOff, imageOn: bleachingOn, text: "표백제" },
  { id: 4, imageOff: dryOff, imageOn: dryOn, text: "건조" },
  { id: 5, imageOff: steamOff, imageOn: steamOn, text: "다림질" },
  { id: 6, imageOff: dryCleanOff, imageOn: dryCleanOn, text: "드라이클리닝" },
];

export default ButtonData;
