import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import "@nutui/nutui-react/dist/style.css";
import "@nutui/nutui-biz/dist/style.css";
import "@nutui/nutui-biz/dist/styles/demo.css";
import getToken from "@/hooks/getToken";

getToken();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
