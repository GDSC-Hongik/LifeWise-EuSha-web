import "./Signup.css";

const Signup = () => {
  return (
    <div className="container">
      {/* 왼쪽 영역 */}
      <div className="left">
        <h2 className="title">LifeWise</h2>
        <form className="form">
          <input
            type="text"
            name="name"
            placeholder="이름을 입력해주세요"
          ></input>
          <input
            type="email"
            name="email"
            placeholder="이메일을 입력해주세요"
          ></input>
          <input
            type="password"
            name="password"
            placeholder="비밀번호를 입력해주세요"
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
