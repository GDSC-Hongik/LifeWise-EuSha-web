import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./Popup.css"; // 스타일링을 위한 CSS 파일

const Popup = ({ show, onClose, children }) => {
  if (!show) return null;

  return ReactDOM.createPortal(
    <div className="popup-overlay" onClick={onClose}>
      <div className="popup-content" onClick={(e) => e.stopPropagation()}>
        <button className="popup-close" onClick={onClose}>
          &times;
        </button>
        {children}
      </div>
    </div>,
    document.body
  );
};

const App = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const openPopup = () => setIsPopupOpen(true);
  const closePopup = () => setIsPopupOpen(false);

  return (
    <div className="app">
      <h1>React Popup Example</h1>
      <button onClick={openPopup}>Open Popup</button>

      <Popup show={isPopupOpen} onClose={closePopup}>
        <h2>Popup Content</h2>
        <p>This is a sample popup created using React.</p>
      </Popup>
    </div>
  );
};

export default App;
