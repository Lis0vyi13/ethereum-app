import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

import { MetaMaskProvider } from "@metamask/sdk-react";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <MetaMaskProvider
      sdkOptions={{
        injectProvider: true,
        dappMetadata: {
          name: "Ethereum app",
        },
      }}
    >
      <App />
    </MetaMaskProvider>
  </StrictMode>
);
