import { useState } from "react";
import { toast } from "react-toastify";
import { ethers } from "ethers";

export const useWallet = () => {
  const [account, setAccount] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState(false);

  const connect = async () => {
    if (!window.ethereum) {
      toast("Metamask is not installed");
      return;
    }
    try {
      setLoading(true);
      const provider = new ethers.BrowserProvider(window.ethereum);
      const accounts = await provider.send("eth_requestAccounts", []);
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

  return { loading, setLoading, account, connect, logout };
};
