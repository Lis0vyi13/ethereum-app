import { useState } from "react";
import { ethers } from "ethers";
import { toast } from "react-toastify";

interface IUseTransactionFormProps {
  account: string | undefined;
  setLoading: (value: boolean) => void;
  onBack: (value: boolean) => void;
  walletAddress: string;
  amount: string;
}

const useTransactionForm = ({
  account,
  setLoading,
  onBack,
  walletAddress,
  amount,
}: IUseTransactionFormProps) => {
  const [error, setError] = useState<string | null>(null);

  const handleGoBack = () => {
    onBack(false);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!walletAddress || !amount) {
      setError("Please fill in all fields.");
      return;
    }

    if (!ethers.isAddress(walletAddress)) {
      setError("Invalid wallet address.");
      return;
    }

    if (!window.ethereum || !account) {
      toast.error("MetaMask is not installed or account is not connected!");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const provider = new ethers.BrowserProvider(window.ethereum);

      const value = ethers.parseUnits(amount, "ether");

      const tx = {
        to: walletAddress,
        value,
        gasLimit: 21000,
      };

      const signer = await provider.getSigner();
      const response = await signer.sendTransaction(tx);
      toast.success(`Transaction sent! Hash: ${response.hash}`);

      const receipt = await response.wait();

      if (receipt?.status === 1) {
        toast.success("Transaction confirmed successfully!");
        handleGoBack();
      } else {
        toast.error("Transaction failed");
      }
    } catch (error: any) {
      console.error("Transaction error:", error);
      toast.error(error.message || "Transaction failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return { error, handleGoBack, handleSubmit };
};

export default useTransactionForm;
