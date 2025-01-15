import { Dispatch, SetStateAction, useState } from "react";
import Input from "../ui/Input";
import Button from "../ui/Button";
import { ArrowLeft } from "lucide-react";
import useTransactionForm from "./useTransactionForm";

interface ITransactionForm {
  account: string | undefined;
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
  onBack: (value: SetStateAction<boolean>) => void;
}

const TransactionForm = ({
  account,
  loading,
  setLoading,
  onBack,
}: ITransactionForm) => {
  const [walletAddress, setWalletAddress] = useState("");
  const [amount, setAmount] = useState("");

  const { error, handleGoBack, handleSubmit } = useTransactionForm({
    account,
    setLoading,
    onBack,
    walletAddress,
    amount,
  });

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-3 p-4 mt-3 bg-gradient-to-br from-purple-900 to-black rounded-xl border-4 border-transparent bg-clip-padding backdrop-filter backdrop-blur-lg"
    >
      <button
        type="button"
        onClick={handleGoBack}
        className="flex w-fit gap-1 items-center hover:underline cursor-pointer"
      >
        <ArrowLeft size={16} />
        <span className="text-[12px]">Back</span>
      </button>

      <h1 className="text-center uppercase text-lg">Transaction</h1>

      <Input
        label="Wallet Address"
        value={walletAddress}
        onChange={(e) => setWalletAddress(e.target.value)}
        placeholder="Enter wallet address"
      />

      <Input
        label="Amount (BNB)"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="0.01"
        type="number"
        step="0.000000000000000001"
      />

      {error && <p className="text-red-500 text-sm">{error}</p>}
      <Button
        className="bg-green-600 hover:bg-green-900"
        title="Send"
        loading={loading}
      />
    </form>
  );
};

export default TransactionForm;
