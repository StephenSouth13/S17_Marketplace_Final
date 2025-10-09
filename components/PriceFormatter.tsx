import { twMerge } from "tailwind-merge";

interface Props {
  amount: number | undefined;
  className?: string;
}

const PriceFormatter = ({ amount, className }: Props) => {
  const formattedPrice = Number(amount ?? 0).toLocaleString("vi-VN", {
    style: "currency",
    currency: "VND",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
  return (
    <span className={twMerge("text-sm font-semibold text-darkColor", className)}>
      {formattedPrice}
    </span>
  );
};

export default PriceFormatter;
