import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { createPortal } from "react-dom";
import Profile from "./Profile";
import "./Header.css";

const Header = () => {
  const [showModal, setShowModal] = useState(false);
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    setIsLogin(!!accessToken); // accessToken이 존재하면 true, 없으면 false
  }, []);

  return (
    <div>
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

          {/* ********************/}
          <button className="login">
            <Link to="/Login">로그인</Link>
          </button>

          <button
            className="login"
            onClick={() => setShowModal(true)}
            style={{ fontSize: 20 }}
          >
            🧝
          </button>
          {/* ********************/}

          {showModal &&
            createPortal(
              <Profile onClose={() => setShowModal(false)}></Profile>,
              document.getElementById("modal-root")
            )}
        </nav>
      </header>
    </div>
  );
};

export default Header;
