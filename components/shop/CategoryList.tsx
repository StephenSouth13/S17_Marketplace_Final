import { Category } from "@/sanity.types";
import React from "react";
import Title from "../Title";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";
import { CheckCircle2 } from "lucide-react"; // Icon xác nhận khi chọn

interface Props {
  categories: Category[];
  selectedCategory?: string | null;
  setSelectedCategory: React.Dispatch<React.SetStateAction<string | null>>;
}

const CategoryList = ({
  categories,
  selectedCategory,
  setSelectedCategory,
}: Props) => {
  return (
    <div className="w-full bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
      {/* Tiêu đề */}
      <Title className="text-lg font-bold text-gray-800 mb-3">
        Danh mục Sản phẩm
      </Title>

      <RadioGroup value={selectedCategory || ""} className="space-y-1">
        {categories?.map((category) => {
          const isActive = selectedCategory === category?.slug?.current;
          return (
            <div
              key={category?._id}
              onClick={() =>
                setSelectedCategory(category?.slug?.current as string)
              }
              className={`flex items-center justify-between px-3 py-2 rounded-md transition-all duration-200 cursor-pointer 
                ${
                  isActive
                    ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                    : "hover:bg-gray-50"
                }`}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem
                  value={category?.slug?.current as string}
                  id={category?.slug?.current}
                  className="rounded-sm"
                />
                <Label
                  htmlFor={category?.slug?.current}
                  className={`cursor-pointer text-sm ${
                    isActive ? "font-semibold text-emerald-700" : "text-gray-700"
                  }`}
                >
                  {category?.title}
                </Label>
              </div>
              {isActive && (
                <CheckCircle2
                  size={18}
                  className="text-emerald-500 transition-all"
                />
              )}
            </div>
          );
        })}
      </RadioGroup>

      {/* Nút đặt lại */}
      {selectedCategory && (
        <button
          onClick={() => setSelectedCategory(null)}
          className="mt-4 text-sm font-medium text-emerald-600 underline underline-offset-4 hover:text-emerald-700 transition-all"
        >
          Đặt lại lựa chọn
        </button>
      )}
    </div>
  );
};

export default CategoryList;
