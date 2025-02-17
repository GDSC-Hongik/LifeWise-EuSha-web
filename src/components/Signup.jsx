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
  const [emailValid, setEmailValid] = useState(false);
  const [pwValid, setPwValid] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleName = (e) => {
    setmemberName(e.target.value);
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setEmailValid(regex.test(e.target.value));
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
    const regex =
      /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    setPwValid(regex.test(e.target.value));
  };

  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://life-wise.site/members/signup",
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
    <div className="signuppage">
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
          <div className="errormsg">
            {!emailValid && email.length > 0 && (
              <div>이메일 형식에 맞게 입력해주세요.</div>
            )}
          </div>
          <label>비밀번호</label>
          <div className="inputBox">
            <span>🔒</span>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="비밀번호를 입력해주세요"
              value={password}
              onChange={handlePassword}
            ></input>
            <button
              type="button"
              className="showbtn"
              onClick={toggleShowPassword}
            >
              {showPassword ? "👁️" : "👁️"}
            </button>
          </div>
          <div className="errormsg">
            {!pwValid && password.length > 0 && (
              <div>영문, 숫자, 특수문자 포함 8~25자로 입력해주세요.</div>
            )}
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
