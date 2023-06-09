/* eslint-disable @typescript-eslint/no-var-requires */
import { Suspense } from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "react-query";
import { Provider } from "react-redux";
import { ThemeProvider } from "styled-components";

import App from "./App";
import GlobalStyle from "./assets/style/GlobalStyle";
import { theme } from "./assets/style/Theme";
import GlobalModal from "./common/Modal/GlobalModal";
import store from "./redux/store";

if (process.env.NODE_ENV === "development") {
  const { worker } = require("./mocks/browser");
  worker.start();
}

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <Suspense fallback={<div>Loading...</div>}>
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <GlobalStyle />
          <GlobalModal />
          <App />
        </ThemeProvider>
      </Provider>
    </QueryClientProvider>
  </Suspense>
);
