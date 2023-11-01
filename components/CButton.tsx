import React, { HTMLAttributes } from "react";
import { AiOutlineLoading3Quarters } from "@react-icons/all-files/ai/AiOutlineLoading3Quarters";

type CButtonVariant = "primary" | "secondary";

interface ICButtonProps {
  variant?: CButtonVariant;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
  loading?: boolean;
  customClasses?: HTMLAttributes<HTMLButtonElement>["className"];
}

const CButton: React.FC<ICButtonProps> = ({
  children,
  variant = "primary",
  disabled = false,
  loading = false,
  customClasses = "",
  onClick,
}) => {
  const Content = !loading ? (
    children
  ) : (
    <AiOutlineLoading3Quarters className="animate-spin" />
  );

  let variantClasses = "";
  if (variant === "primary") {
    variantClasses = "bg-primary-gradient text-light";
  }

  if (variant === "secondary") {
    variantClasses = "bg-light text-primary";
  }

  if (disabled) {
    variantClasses = "bg-gray100 text-light border-gray100 cursor-not-allowed";
  }

  const activeClasses =
    !loading && !disabled
      ? "active:scale-95 transition-transform hover:shadow-lg"
      : "";

  const notDisabledClasses = !disabled ? "border-primary" : "";

  return (
    <button
      onClick={loading || disabled ? () => {} : onClick}
      className={`xs:text-xs sm:text-xs md:text-base py-2 px-5 rounded-lg border-2 font-semibold cursor-pointer flex justify-center items-center min-w-[108px] min-h-[39px] ${activeClasses} ${notDisabledClasses} ${variantClasses} ${customClasses}`}
    >
      {Content}
    </button>
  );
};

export default CButton;
