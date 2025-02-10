import "./Account.css";

const Account = () => {
  return (
    <div className="account-container">
      <h2 className="mypageh2">계정 관리</h2>

      {/* 프로필 정보 */}
      <section className="profile-section">
        <div className="profile-info">
          <h3>김강민</h3>
          <p>pickofee@gmail.com</p>
        </div>
        <button className="edit-btn">수정</button>
      </section>

      {/* 비밀번호 변경 */}
      <section className="password-section">
        <h3>비밀번호</h3>
        <p>최근 업데이트:</p>
        <button className="password-btn">비밀번호 변경</button>
      </section>
    </div>
  );
};

export default Account;
