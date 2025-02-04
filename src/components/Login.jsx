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
        "http://AWS/members/login", // AWS 서버 주소로 변경
        { email, password }
      );

      // 정상 작동 확인용
      console.log(response.data.accessToken);
      console.log(response.data.refreshToken);
      console.log(response.data.memberId);
      console.log(response.data.memberName);

      if (response.data.accessToken && response.data.refreshToken) {
        localStorage.setItem("accessToken", response.data.accessToken);
        localStorage.setItem("refreshToken", response.data.refreshToken);
        localStorage.setItem("memberID", response.data.memberId);
        localStorage.setItem("memberName", response.data.memberName);
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
        <form onSubmit={handlelogin}>
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
