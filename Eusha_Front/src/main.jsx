// import { createRoot } from "react-dom/client";
// import "./index.css";
// import App from "./App.jsx";

// createRoot(document.getElementById("root")).render(<App />);

import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import App from "./App";
import Recycle from "./components/Recycle"; // 추가된 Recycle 컴포넌트
import "./index.css";
import Laundary from "./components/Laundary";
import Recipe from "./components/Recipe";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <Routes>
        {/* 메인 화면 */}
        <Route path="/" element={<App />} />
        {/* 분리수거 화면 */}
        <Route path="/recycle" element={<Recycle />} />
        {/* 세탁 화면 */}
        <Route path="/laundary" element={<Laundary />} />
        {/* 레시피 화면 */}
        <Route path="/recipe" element={<Recipe />} />
      </Routes>
    </Router>
  </React.StrictMode>
);
