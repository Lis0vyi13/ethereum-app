import { useState } from "react";
import { useSDK } from "@metamask/sdk-react";

export const useWallet = () => {
  const { sdk, connected } = useSDK();
  const [account, setAccount] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState(false);

  const connect = async () => {
    try {
      setLoading(true);
      const accounts = await sdk?.connect();
      setAccount(accounts?.[0]);
    } catch (err) {
      console.warn("Failed to connect..", err);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      setLoading(true);
      setAccount("");
    } catch (err) {
      console.warn("Failed to disconnect..", err);
    } finally {
      setLoading(false);
    }
  };

  return { loading, setLoading, connected, account, connect, logout };
};
