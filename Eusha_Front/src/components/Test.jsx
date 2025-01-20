// import React from "react";
import { Link } from "react-router-dom";
import "./Test.css";
import slide01 from "../assets/slide01.jpg";
import slide02 from "../assets/slide02.jpg";
import slide03 from "../assets/slide03.jpg";

const Test = () => {
  return (
    <div className="wrapper">
      <header>
        <div className="logo">LifeWise</div>
        <nav>
          <a href="#">마이페이지</a>
          <a href="#">기록</a>
          <a href="#">즐겨찾기</a>
          <a href="#">설정</a>
        </nav>
      </header>

      <section className="hero">
        <div>
          <h1>똑 부러지는 자취생활을 즐기는 그날까지</h1>
          <p>LifeWise는 당신과 함께합니다.</p>
        </div>
      </section>

      <section className="category">
        <h2>LifeWise Category</h2>
        <div className="cards">
          <div className="card">
            <Link to="/Recycle">
              <img src={slide01} alt="분리수거 가이드"></img>
              <h3>분리수거 가이드</h3>
              <p>분리수거 가이드를 제공하는 내용을 간편히 확인해보세요.</p>
            </Link>
          </div>
          <div className="card">
            <Link to="/Laundary">
              <img src={slide02} alt="손쉬운 세탁법"></img>
              <h3>손쉬운 세탁법</h3>
              <p>효율적인 세탁 요령을 배워보세요.</p>
            </Link>
          </div>
          <div className="card">
            <Link to="/Recipe">
              <img src={slide03} alt="자취생 레시피"></img>
              <h3>자취생 레시피</h3>
              <p>간편하고 맛있는 레시피를 제공합니다.</p>
            </Link>
          </div>
        </div>
      </section>

      <footer>&copy; 2025 LifeWise. All rights reserved.</footer>
    </div>
  );
};

export default Test;
