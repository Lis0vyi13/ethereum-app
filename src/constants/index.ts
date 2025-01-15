export const TRANSACTION_INPUTS = [
  {
    name: "walletAddress",
    title: "Recipient Wallet Address",
    placeholder: "Enter wallet address",
    required: true,
    autoComplete: "off",
  },
  {
    name: "amount",
    title: "Amount of Coins",
    type: "number",
    placeholder: "Enter amount",
    required: true,
    min: 0.01,
    autoComplete: "off",
  },
];
