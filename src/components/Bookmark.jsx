import { useState } from "react";
import { Link } from "react-router-dom";
import "./Mypage.css";
import Bookmarklist from "./Mypage_Ingredient/Bookmarklist";

const Mypage = () => {
  const [selectedMenu, setSelectedMenu] = useState("account"); // 기본값 설정

  const renderContent = () => {
    console.log("현재 선택된 메뉴:", selectedMenu); // 상태 변경 확인
    switch (selectedMenu) {
      case "bookmark":
        return <Bookmarklist></Bookmarklist>;
      default:
        return <Bookmarklist></Bookmarklist>;
    }
  };

  return (
    <div className="mypage-container">
      <div className="mypage-logo">
        <Link to="/">LifeWise</Link>
      </div>

      <div className="mypage-body">
        {/* 사이드바 */}
        <div className="sidebar">
          <ul>
            <li
              className="selected"
              onClick={() => setSelectedMenu("bookmark")}
            >
              내 북마크 목록
            </li>
          </ul>
        </div>

        {/* 오른쪽 컨텐츠 변경 */}
        <main className="mypage-content">{renderContent()}</main>
      </div>
    </div>
  );
};

export default Mypage;
