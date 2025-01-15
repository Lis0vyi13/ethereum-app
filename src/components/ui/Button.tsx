import { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/utils";
import { Loader } from "lucide-react";

interface IButton extends ButtonHTMLAttributes<HTMLButtonElement> {
  title: string;
  loading?: boolean;
  className?: string;
  children?: ReactNode;
}
const Button = ({ title, loading, className, children, ...props }: IButton) => {
  const buttonClassName = cn(
    `flex gap-1 w-full text-center justify-center items-center px-6 py-3 bg-white/10 rounded-xl hover:bg-white/20 transition-colors disabled:cursor-not-allowed disabled:opacity-50`,
    className
  );
  return (
    <button {...props} disabled={loading} className={buttonClassName}>
      <div className="mt-[2px]">{children}</div>
      <span> {loading ? <Loader /> : title}</span>
    </button>
  );
};

export default Button;
