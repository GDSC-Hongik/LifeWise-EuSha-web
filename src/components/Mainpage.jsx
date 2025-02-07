import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
// react-router-dom 말고 react-dom에서 가져와야 하는구나
import { createPortal } from "react-dom";
import slide01 from "../assets/recycle.jpg";
import slide02 from "../assets/laundary.jpg";
import slide03 from "../assets/recipe.jpg";
import banner01 from "../assets/banner01.jpg";
import banner02 from "../assets/banner02.jpg";
import banner03 from "../assets/banner03.jpg";
import Profile from "./Profile";
import "./Mainpage.css";

const Mainpage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [banner01, banner02, banner03];
  // const [isLogin, setIsLogin] = useState(false);
  // const [user, setUser] = useState({}); // 사용자 정보 state

  // 프로필 사진 클릭 시 모달창이 나타나는 기능
  // 처음에는 모달 창 = false
  const [showModal, setShowModal] = useState(false);

  // ******************************************
  // 여기 코드는 AWS배포 후 검증 예정
  // // 로그인이 되어있지 않다면 로그인 버튼이 나오고
  // // 로그인이 되어있다면 Profile 모달창 버튼이 나오게끔
  // const [isLogin, setIsLogin] = useState(false);

  // useEffect(() => {
  //   const accessToken = localStorage.getItem("accessToken");

  //   // accessToken이 있다면 True값, 없다면 False값으로 토글
  //   setIsLogin(accessToken ? true : false);
  //   //console.log(accessToken); // 추후 삭제
  //   // alert(accessToken); // 추후 삭제
  // }, []);

  // 자동 슬라이드 전환 기능
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide(
        (prevSlide) => (prevSlide + 1) % slides.length
      ); // 순환
    }, 5000); // 3초마다 변경
    return () => clearInterval(interval);
  }, [slides.length]);

  const handleSlideChange = (index) => {
    setCurrentSlide(index);
  };

  return (
    <div className="wrapper">
      <header>
        <div className="logo">
          <Link to="/">LifeWise</Link>
        </div>

        {/* 로그인 여부에 따라 변하나? */}
        <nav>
          {/* {isLogin ? (
            <button onClick={() => setShowModal(true)}>⏺️</button>
          ) : (
            <button className="login">
              <Link to="/Login">로그인</Link>
            </button>
          )} */}

          {/* ************************************* */}
          {/* 임시 코드 */}
          <button className="login">
            <Link to="/Login">로그인</Link>
          </button>
          <button onClick={() => setShowModal(true)}>
            ⏺️
          </button>

          {showModal &&
            createPortal(
              <Profile
                onClose={() => setShowModal(false)}
              ></Profile>,
              document.getElementById("modal-root")
            )}
        </nav>
      </header>

      <section className="hero">
        <img
          src={slides[currentSlide]}
          alt={`슬라이드 ${currentSlide + 1}`}
        />
        <div className="hero-text">
          <h1>똑 부러지는 자취생활을 즐기는 그날까지</h1>
          <p>LifeWise는 당신과 함께합니다.</p>
        </div>

        <div className="radio-buttons">
          {slides.map((_, index) => (
            <input
              key={index}
              type="radio"
              name="slide"
              checked={currentSlide === index}
              onChange={() => handleSlideChange(index)}
            />
          ))}
        </div>
      </section>

      <section className="category">
        <h2>LifeWise Category</h2>
        <div className="cards">
          <div className="card">
            <Link to="/Recycle">
              <img
                src={slide01}
                alt="분리수거 가이드"
              ></img>
              <h3>분리수거 가이드</h3>
              <p>
                분리수거 가이드를 제공하는 내용을 간편히
                확인해보세요.
              </p>
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

      <footer>
        &copy; 2025 LifeWise. All rights reserved.
      </footer>
    </div>
  );
};

export default Mainpage;
