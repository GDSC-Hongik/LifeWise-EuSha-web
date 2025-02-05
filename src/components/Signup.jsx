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
        <h2 className="title">LifeWise</h2>
        <form className="form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="이름을 입력해주세요"
            value={memberName}
            onChange={handleName}
          ></input>
          <input
            type="email"
            name="email"
            placeholder="이메일을 입력해주세요"
            value={email}
            onChange={handleEmail}
          ></input>
          <input
            type="password"
            name="password"
            placeholder="비밀번호를 입력해주세요"
            value={password}
            onChange={handlePassword}
          ></input>
          <button className="button">회원가입</button>
        </form>
      </div>
      <div className="right">
        <h2>image</h2>
      </div>
    </div>
  );
};

export default Signup;
