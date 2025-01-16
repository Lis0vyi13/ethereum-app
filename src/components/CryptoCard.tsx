import { useEffect, useState } from "react";

import { useWallet } from "../hooks/useWallet";

import Button from "./ui/Button";
import TransactionForm from "./TransactionForm/TransactionForm";

import { ArrowUpRight, Wallet, Loader, LogOut } from "lucide-react";

interface ICryptoCardProps {
  name?: string;
}

const CryptoCard = ({ name = "Binance Coin" }: ICryptoCardProps) => {
  const [price, setPrice] = useState("");
  const { account, loading, setLoading, connect, logout } = useWallet();
  const [isFormActive, setIsFormActive] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          "https://api.coincap.io/v2/assets/binance-coin"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch");
        }

        const data = await response.json();
        setPrice(parseFloat(data.data.priceUsd).toFixed(2));
      } catch (error) {
        console.error("Error:", error);
        setPrice("No data found");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <section className="w-[380px] break-words p-6 rounded-3xl bg-gradient-to-br from-purple-900/90 to-black text-white">
      <h2 className="text-3xl font-light">{name}</h2>

      {account ? (
        <div className="mt-3">
          Connected account:{" "}
          <span className="font-bold text-[13px]">{account}</span>
        </div>
      ) : (
        <div className="mt-3">
          <p className="text-sm text-gray-400 mb-1">PRICE</p>
          <div className="text-3xl font-light mb-1">
            {loading ? <Loader /> : price}
          </div>
        </div>
      )}

      {!isFormActive ? (
        <section className="flex flex-col gap-3 mt-6">
          {!account ? (
            <Button
              className="bg-orange-600 hover:bg-orange-900"
              loading={loading}
              onClick={connect}
              title="Connect Wallet"
            >
              <Wallet size={16} />
            </Button>
          ) : (
            <>
              <Button
                className="bg-red-700 hover:bg-red-900"
                loading={loading}
                onClick={logout}
                title="Log out"
              >
                <LogOut size={16} />
              </Button>
              <Button onClick={() => setIsFormActive(true)} title="Send">
                <ArrowUpRight size={16} />
              </Button>
            </>
          )}
        </section>
      ) : (
        <TransactionForm
          account={account}
          onBack={setIsFormActive}
          loading={loading}
          setLoading={setLoading}
        />
      )}
    </section>
  );
};

export default CryptoCard;
