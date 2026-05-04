import "react-toastify/dist/ReactToastify.css";

import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";

import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import React from "react";
import ReactDOM from "react-dom/client";
import { ToastContainer } from "react-toastify";
import { store } from "./store/store";
import { theme } from "./theme";

ReactDOM.createRoot(document.getElementById("admin-root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <ChakraProvider theme={theme}>
          <ColorModeScript />
          <App />
          <ToastContainer position="top-center" />
        </ChakraProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
