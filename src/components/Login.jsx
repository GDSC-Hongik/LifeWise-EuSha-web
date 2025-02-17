// Login.jsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import API from "../api/axiosInstance.js";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handlelogin = async (e) => {
    e.preventDefault(); // 폼 제출 시 페이지 reload 방지

    try {
      const response = await API.post(
        "http://43.201.193.230:8080/members/login", // AWS 서버 주소로 변경
        { email, password }
      );

      // 정상 작동 확인용
      console.log(response.data.accessToken);
      console.log(response.data.refreshToken);
      console.log(response.data.memberId);
      console.log(response.data.memberName);
      console.log(response.data.email);

      if (response.data.accessToken && response.data.refreshToken) {
        localStorage.setItem("accessToken", response.data.accessToken);
        localStorage.setItem("refreshToken", response.data.refreshToken);
        localStorage.setItem("memberId", response.data.memberId);
        localStorage.setItem("memberName", response.data.memberName);
        localStorage.setItem("email", response.data.email);
        navigate("/");
      }
    } catch (error) {
      alert("로그인 실패");
      console.error("로그인 실패", error);
    }
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePW = (e) => {
    setPassword(e.target.value);
  };

  return (
    <div className="loginpage">
      <div className="left">
        <div className="title">LifeWise</div>
        <form className="form" onSubmit={handlelogin}>
          <label>이메일</label>
          <div className="inputBox">
            <span>✉️</span>
            <input
              className="Email"
              type="text"
              placeholder="이메일을 입력해주세요"
              value={email}
              onChange={handleEmail}
            ></input>
          </div>

          <label>비밀번호</label>
          <div className="inputBox">
            <span>🔒</span>
            <input
              className="PW"
              type="password"
              placeholder="비밀번호를 입력해주세요"
              value={password}
              onChange={handlePW}
            ></input>
          </div>
          <button type="submit" className="button">
            로그인
          </button>
        </form>
        <div className="firstLogin">
          <h5>
            <Link to="/Signup">로그인이 처음이신가요? 회원가입하러가기</Link>
          </h5>
        </div>
      </div>
      <div className="right">
        <h2>LifeWise</h2>
      </div>
    </div>
  );
};

export default Login;
