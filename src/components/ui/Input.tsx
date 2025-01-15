import { InputHTMLAttributes, ReactNode } from "react";

interface IInput extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  className?: string;
  children?: ReactNode;
}

const Input = ({ label, className, children, ...props }: IInput) => {
  return (
    <div className="relative w-full">
      {label && (
        <label className="text-white text-[12px] mb-2 block">{label}</label>
      )}
      <input
        {...props}
        className={`w-full text-white bg-white/10 px-3 py-3 rounded-xl placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
      />
    </div>
  );
};

export default Input;
