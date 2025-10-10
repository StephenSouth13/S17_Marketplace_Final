// "use client" - Vẫn phải gọi hồn client để còn "quẩy" hiệu ứng!

import { ShoppingCart } from "lucide-react"; // Biểu tượng giỏ hàng, giờ đỡ buồn hơn rồi.
import Link from "next/link";
import { motion } from "framer-motion"; // Khí chất "nhây" nằm ở đây!
import { emptyCart, emptyCart1 } from "@/images";
import Image from "next/image";

// Component tối giản - Tập trung vào hiệu ứng và hành động!
export default function EmptyCart() {
  return (
    // Nền nhẹ nhàng, tránh làm giỏ hàng bị kích động mạnh
    <div className="flex items-center justify-center p-4 py-20 bg-gray-50">
      <motion.div
        // Hiệu ứng "Giỏ hàng hít thở": phập phồng nhẹ nhàng, đợi đồ
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 100, delay: 0.1 }}
        className="bg-white rounded-xl shadow-2xl p-6 max-w-sm w-full text-center space-y-6"
      >
        <motion.div
          // HIỆU ỨNG THẦN THÁNH: GIỎ HÀNG NHÚN NHẢY KHÍCH LỆ
          animate={{
            y: [0, -5, 0], // Nhún lên, nhún xuống, kiểu "mua đồ đi, mua đi mà!"
          }}
          transition={{
            repeat: Infinity,
            duration: 2,
            ease: "easeInOut",
          }}
          className="relative w-32 h-32 mx-auto"
        >
          <Image
            src={emptyCart1}
            alt="Giỏ hàng trống"
            layout="fill"
            objectFit="contain"
          />
          <motion.div
            // Icon giỏ hàng "RUNG ĐỘNG" dữ dội, muốn nhảy ra ngoài
            animate={{ rotate: [-5, 5, -5] }}
            transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
            className="absolute top-0 right-0 p-1.5 rounded-full bg-red-500 shadow-lg"
          >
            <ShoppingCart size={20} className="text-white" />
          </motion.div>
        </motion.div>

        {/* TIÊU ĐỀ HÀI HƯỚC VÀ NGẮN GỌN */}
        <h2 className="text-2xl font-extrabold text-gray-800">
          Oops! Giỏ hàng đang... **nhịn đói**!
        </h2>
        <p className="text-gray-500 text-sm">
          **Nó đang chờ bạn đó!** Nhấn nút dưới đây và "chữa lành" cho cái giỏ tội nghiệp này ngay thôi!
        </p>

        {/* NÚT KÊU GỌI HÀNH ĐỘNG CỰC MẠNH */}
        <Link
          href="/"
          className="block w-full py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300 transform hover:scale-105"
        >
          {/* Lời kêu gọi không thể chối từ */}
          **CHO GIỎ HÀNG ĂN ĐI NÀO!**
        </Link>
      </motion.div>
    </div>
  );
}