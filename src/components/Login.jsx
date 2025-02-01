import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import axios from "axios";
import API from "../api/axiosInstance";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const login = () => {
    axios
      .post(
        "http://localhost:5000/members/login", // 백앤드 로그인 API
        { email, password },
        { withCredentials: true }
      )
      .then((result) => {
        console.log(result.data); // 확인용
        if (result.status === 200) {
          localStorage.setItem("accessToken", result.data.accessToken);
          navigate("/"); // 로그인 성공 시 홈페이지로 이동
        }
      })
      .catch((error) => {
        console.error("로그인 실패", error);
      });
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePW = (e) => {
    setPassword(e.target.value);
  };

  return (
    <div className="login">
      <div className="title">LifeWise</div>
      <div className="inputEmail">
        <input
          className="Email"
          type="text"
          placeholder="이메일을 입력해주세요"
          value={email}
          onChange={handleEmail}
        ></input>
      </div>
      <div className="inputPW">
        <input
          className="PW"
          type="password"
          placeholder="비밀번호를 입력해주세요"
          value={password}
          onChange={handlePW}
        ></input>
      </div>
      <div className="buttonWrap">
        <button onClick={login}>로그인</button>
      </div>
    </div>
  );
};

export default Login;
