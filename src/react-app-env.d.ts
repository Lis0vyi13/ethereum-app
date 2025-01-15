/// <reference types="react-scripts" />
/// <reference types="vite/client" />

import { MetaMaskInpageProvider } from "@metamask/providers";

declare global {
  interface Window {
    ethereum?: MetaMaskInpageProvider;
  }
}
