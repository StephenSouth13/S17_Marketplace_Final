// Nhập định kiểu và các thành phần cần thiết
import { Category } from "@/sanity.types"; // Nhập định kiểu Danh mục (Category type)
import React from "react"; // Nhập thư viện React
import Title from "../Title"; // Nhập component Tiêu đề (Title)
import { RadioGroup, RadioGroupItem } from "../ui/radio-group"; // Nhập component Nhóm Radio và Mục Radio
import { Label } from "../ui/label"; // Nhập component Nhãn (Label)

// Định nghĩa giao diện/kiểu cho các props của component
interface Props {
  categories: Category[]; // Danh sách các danh mục
  selectedCategory?: string | null; // Danh mục đang được chọn (dùng slug)
  // Hàm để cập nhật danh mục được chọn
  setSelectedCategory: React.Dispatch<React.SetStateAction<string | null>>;
}

// Component Danh sách Danh mục
const CategoryList = ({
  categories,
  selectedCategory,
  setSelectedCategory,
}: Props) => {
  return (
    <div className="w-full bg-white p-5">
      <Title className="text-base font-black">Danh mục Sản phẩm</Title>
      <RadioGroup value={selectedCategory || ""} className="mt-2 space-y-1">
        {/* Lặp qua danh sách các danh mục để hiển thị */}
        {categories?.map((category) => (
          <div
            // Xử lý sự kiện khi người dùng nhấp vào bất kỳ đâu trong mục
            onClick={() => {
              // Cập nhật danh mục được chọn bằng slug hiện tại
              setSelectedCategory(category?.slug?.current as string);
            }}
            key={category?._id}
            className="flex items-center space-x-2 hover:cursor-pointer"
          >
            <RadioGroupItem
              // Giá trị của mục radio là slug của danh mục
              value={category?.slug?.current as string}
              id={category?.slug?.current}
              className="rounded-sm"
            />
            <Label
              htmlFor={category?.slug?.current}
              // Định kiểu động: in đậm và màu xanh nếu được chọn
              className={`${selectedCategory === category?.slug?.current ? "font-semibold text-shop_dark_green" : "font-normal"}`}
            >
              {category?.title} {/* Tên của danh mục */}
            </Label>
          </div>
        ))}
      </RadioGroup>
      {/* Hiển thị nút "Đặt lại lựa chọn" nếu có danh mục nào đang được chọn */}
      {selectedCategory && (
        <button
          // Xử lý sự kiện khi nhấp: đặt lại danh mục được chọn thành null
          onClick={() => setSelectedCategory(null)}
          className="text-sm font-medium mt-2 underline underline-offset-2 decoration-[1px] hover:text-shop_dark_green hoverEffect text-left"
        >
          Đặt lại lựa chọn
        </button>
      )}
    </div>
  );
};

// Xuất component
export default CategoryList;