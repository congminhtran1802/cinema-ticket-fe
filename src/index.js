import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import store from "./redux-toolkit/store";
import "antd";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { RecoilRoot } from "recoil";
import i18nConfig from "./i18n";
import Kommunicate from "@kommunicate/kommunicate-chatbot-plugin";
Kommunicate.init("2a9518232a7edc2861dab98b27815ea25", {
  automaticChatOpenOnNavigation: true,
  popupWidget: true
});
i18nConfig()
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
  <RecoilRoot>
      <App />
      </RecoilRoot>
  </Provider>
  
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
