// 회원가입 페이지
import "./Signup.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
// import API from "../api/axiosInstance";
import axios from "axios";

const Signup = () => {
  const [memberName, setmemberName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleName = (e) => {
    setmemberName(e.target.value);
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8080/members/signup",
        {
          memberName,
          email,
          password,
        }
      );
      console.log("회원가입 성공", response.data); // 검증
      navigate("/Login"); // 회원가입 성공시 로그인 페이지 이동
    } catch (error) {
      console.error("signup 실패", error); // 검증
      alert("signup 실패");
    }
  };

  return (
    <div className="container">
      {/* 왼쪽 영역 */}
      <div className="left">
        <h1 className="title">LifeWise</h1>
        <form className="form" onSubmit={handleSubmit}>
          <label>이름</label>
          <div className="inputBox">
            <span>👤</span>
            <input
              type="text"
              name="name"
              placeholder="이름을 입력해주세요"
              value={memberName}
              onChange={handleName}
            ></input>
          </div>

          <label>이메일</label>
          <div className="inputBox">
            <span>✉️</span>
            <input
              type="email"
              name="email"
              placeholder="이메일을 입력해주세요"
              value={email}
              onChange={handleEmail}
            ></input>
          </div>

          <label>비밀번호</label>
          <div className="inputBox">
            <span>🔒</span>
            <input
              type="password"
              name="password"
              placeholder="비밀번호를 입력해주세요"
              value={password}
              onChange={handlePassword}
            ></input>
          </div>
          <button type="submit" className="button">
            회원가입
          </button>
        </form>
      </div>
      <div className="right">
        <h2>LifeWise</h2>
      </div>
    </div>
  );
};

export default Signup;

// 영문자 숫자 특수문자 포함 8~ 25사이
