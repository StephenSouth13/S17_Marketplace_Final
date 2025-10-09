
import React from "react";
import Title from "../Title";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";

const priceArray = [
  { title: "Dưới 1.000.000 ₫", value: "0-1000000" },
  { title: "1.000.000 ₫ – 2.000.000 ₫", value: "1000000-2000000" },
  { title: "2.000.000 ₫ – 5.000.000 ₫", value: "2000000-5000000" },
  { title: "5.000.000 ₫ – 10.000.000 ₫", value: "5000000-10000000" },
  { title: "Trên 10.000.000 ₫", value: "10000000-100000000" },
];

interface Props {
  selectedPrice?: string | null;
  setSelectedPrice: React.Dispatch<React.SetStateAction<string | null>>;
}

const PriceList = ({ selectedPrice, setSelectedPrice }: Props) => {
  return (
    <div className="w-full bg-white p-5 rounded-2xl shadow-lg border border-gray-100 transition-all hover:shadow-xl">
      <Title className="text-lg font-bold text-gray-800 tracking-wide border-b pb-2 border-gray-200">
        Khoảng giá
      </Title>

      <RadioGroup className="mt-4 space-y-3" value={selectedPrice || ""}>
        {priceArray.map((price, index) => (
          <div
            key={index}
            onClick={() => setSelectedPrice(price.value)}
            className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer transition-all 
            ${
              selectedPrice === price.value
                ? "bg-green-50 ring-1 ring-green-500"
                : "hover:bg-gray-50"
            }`}
          >
            <RadioGroupItem
              value={price.value}
              id={price.value}
              className="rounded-full border-gray-400 data-[state=checked]:border-green-600 data-[state=checked]:bg-green-600"
            />
            <Label
              htmlFor={price.value}
              className={`text-[15px] ${
                selectedPrice === price.value
                  ? "font-semibold text-green-700"
                  : "text-gray-700 hover:text-green-600"
              }`}
            >
              {price.title}
            </Label>
          </div>
        ))}
      </RadioGroup>

      {selectedPrice && (
        <button
          onClick={() => setSelectedPrice(null)}
          className="mt-4 text-sm font-medium text-green-700 bg-green-50 px-3 py-1 rounded-full hover:bg-green-100 transition-all"
        >
          ✦ Xóa bộ lọc
        </button>
      )}
    </div>
  );
};

export default PriceList;
