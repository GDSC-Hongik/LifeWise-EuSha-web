import "./Header.css";
import slide01 from "../assets/slide01.jpg";
import slide02 from "../assets/slide02.jpg";
import slide03 from "../assets/slide03.jpg";

const Header = () => {
  return (
    <div className="section">
      <input type="radio" name="slide" id="slide01" checked></input>
      <input type="radio" name="slide" id="slide02" checked></input>
      <input type="radio" name="slide" id="slide03" checked></input>

      <div className="slidewrap">
        <ul className="slidelist">
          <li>
            <a>
              <img src={slide01}></img>
            </a>
          </li>
          <li>
            <a>
              <img src={slide02}></img>
            </a>
          </li>
          <li>
            <a>
              <img src={slide03}></img>
            </a>
          </li>
        </ul>

        <div className="slide-control">
          <div className="control01">
            <label htmlFor="slide03" className="left"></label>
            <label htmlFor="slide02" className="right"></label>
          </div>
          <div className="control02">
            <label htmlFor="slide01" className="left"></label>
            <label htmlFor="slide03" className="right"></label>
          </div>
          <div className="control03">
            <label htmlFor="slide02" className="left"></label>
            <label htmlFor="slide01" className="right"></label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
