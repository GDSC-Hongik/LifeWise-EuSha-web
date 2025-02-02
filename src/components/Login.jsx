// Login.jsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import API from "../api/axiosInstance.js";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const login = async (e) => {
    e.preventDefault(); // 폼 제출 시 페이지 reload 방지

    try {
      const result = await API.post(
        "members/login", // AWS 서버 주소로 변경
        { email, password }
      );

      // 정상 작동 확인용
      console.log(result.data.accessToken);
      console.log(result.data.refreshToken);
      console.log(result.data.memberId);
      console.log(result.data.membername);

      if (result.data.accessToken && result.data.refreshToken) {
        localStorage.setItem("accessToken", result.data.accessToken);
        localStorage.setItem("refreshToken", result.data.refreshToken);
        localStorage.setItem("memberID", result.data.memberId);
        localStorage.setItem("memberName", result.data.memberName);
        navigate("/");
      }
    } catch (error) {
      console.error("로그인 실패", error);
    }
  };

  const sethandleEmail = (e) => {
    setEmail(e.target.value);
  };

  const sethandlePW = (e) => {
    setPassword(e.target.value);
  };

  return (
    <div className="container">
      <div className="login">
        <div className="title">LifeWise</div>
        <form onSubmit={login}>
          {" "}
          {/* form 태그 추가로 제출 처리 */}
          <div className="inputEmail">
            <input
              className="Email"
              type="text"
              placeholder="이메일을 입력해주세요"
              value={email}
              onChange={sethandleEmail}
            ></input>
          </div>
          <div className="inputPW">
            <input
              className="PW"
              type="password"
              placeholder="비밀번호를 입력해주세요"
              value={password}
              onChange={sethandlePW}
            ></input>
          </div>
          <div className="buttonWrap">
            <button type="submit">로그인</button> {/* submit type으로 변경 */}
          </div>
        </form>
        <div className="firstLogin">
          <h6>
            <Link to="/Signup">로그인이 처음이신가요? 회원가입하러가기</Link>
          </h6>
        </div>
      </div>
      <div className="image">
        <h1>image</h1>
      </div>
    </div>
  );
};

export default Login;
