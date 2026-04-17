import { StrictMode } from "react";
import { ConfigProvider } from "antd";
import { createRoot } from "react-dom/client";
import { GoogleOAuthProvider } from "@react-oauth/google";
import App from "./App.jsx";
import "./index.css";

const customTheme = {
  token: {
    borderRadius: 6,
    colorBgMask: "rgba(142, 91, 166, 0.85)",
  },

  components: {
    Modal: {
      contentBg: "#fef6f5",
      headerBg: "#fef6f5",
      titleFontSize: "1.5rem",
    },
    Input: {
      borderColor: "#8e5ba6",
      activeBorderColor: "#8e5ba6",
      hoverBorderColor: "#8e5ba6",
    },

    Menu: {
      itemSelectedBg: "none",
      itemSelectedColor: "#8e5ba6",
      iconSize: 18,
      itemMarginBlock: 6,
    },
    Layout: {
      headerHeight: 60,
    },
    DatePicker: {
      inputBorderRadius: 6,
      activeBorderColor: "#8e5ba6",
      hoverBorderColor: "#8e5ba6",
    },
    Button: {
      borderRadius: 6,
      defaultHoverBorderColor: "#8e5ba6",
      defaultBorderColor: "#8e5ba6",
      borderColorDisabled: "white",
      colorBgHover: "#8e5ba6",
      colorBgActive: "#8e5ba6",
      defaultHoverColor: "#F9B0AA",
    },
    Calendar: {
      itemActiveBg: "#f0f0f0",
    },
    Select: {
      hoverBorderColor: "#ffffff",
      borderColor: "#8e5ba6",
      activeBorderColor: "#ffffff",
    },
  },
};

createRoot(document.getElementById("root")).render(
  <GoogleOAuthProvider clientId="590109006053-qqnqgbvfmofmcdco4pqqk5rl617jj2kf.apps.googleusercontent.com">
    <StrictMode>
      <ConfigProvider theme={customTheme}>
        <App />
      </ConfigProvider>
    </StrictMode>
  </GoogleOAuthProvider>
);
