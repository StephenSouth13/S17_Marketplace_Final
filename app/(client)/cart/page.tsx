"use client";

import Container from "@/components/Container";
import EmptyCart from "@/components/EmptyCart";
import NoAccess from "@/components/NoAccess";
import PriceFormatter from "@/components/PriceFormatter";
import ProductSideMenu from "@/components/ProductSideMenu";
import QuantityButtons from "@/components/QuantityButtons";
import Title from "@/components/Title";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Address } from "@/sanity.types";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import useStore from "@/store";
import { useAuth, useUser } from "@clerk/nextjs";
import { ShoppingBag, Trash, Loader2, CreditCard, Wallet, MapPin, CheckCircle2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

const CartPage = () => {
  const { deleteCartProduct, getTotalPrice, getItemCount, getSubTotalPrice, resetCart } = useStore();
  const groupedItems = useStore((state) => state.getGroupedItems());
  const { isSignedIn } = useAuth();
  const { user } = useUser();

  const [addresses, setAddresses] = useState<Address[] | null>(null);
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<string>("bank"); // "bank" | "cod"
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        // Giả sử chỉ fetch các địa chỉ của user hiện tại nếu có trường userId trong address
        const query = `*[_type=="address" && userId == "${user?.id}" ] | order(publishedAt desc)`;
        const data = await client.fetch(query);
        setAddresses(data);
        const defaultAddress = data.find((addr: Address) => addr.default);
        setSelectedAddress(defaultAddress || data[0] || null);
      } catch (error) {
        console.log("Lỗi tải địa chỉ:", error);
      }
    };
    if (user?.id) {
      fetchAddresses();
    }
  }, [user?.id]);

  const handleCheckout = async () => {
    // SỬA LỖI 1: Thay thế item.product.type bằng item.product._type
    // Giả định sản phẩm vật lý là có _type là "product"
    const hasPhysicalProduct = groupedItems.some(
      (item) => (item.product as any).type === "physical" || item.product?._type === "product"
    );

    if (hasPhysicalProduct && !selectedAddress) {
      toast.error("Vui lòng chọn địa chỉ giao hàng trước khi thanh toán!");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      if (paymentMethod === "bank") {
        toast.success("Vui lòng quét mã QR để hoàn tất thanh toán!");
      } else {
        toast.success("Đặt hàng thành công! Thanh toán khi nhận hàng.");
      }
      resetCart();
    }, 2000);
  };

  const handleResetCart = () => {
    const confirmed = window.confirm("Bạn có chắc muốn xóa toàn bộ giỏ hàng?");
    if (confirmed) {
      resetCart();
      toast.success("Đã làm trống giỏ hàng!");
    }
  };

  if (!isSignedIn) return <NoAccess />;
  if (!groupedItems?.length) return <EmptyCart />;

  return (
    <Container className="bg-gray-50 min-h-screen py-10">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex items-center gap-3 mb-8"
      >
        <ShoppingBag className="text-green-600 w-6 h-6" />
        <Title>Thanh toán đơn hàng</Title>
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* LEFT - CART ITEMS */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100">
          {groupedItems.map(({ product }) => {
            const itemCount = getItemCount(product?._id);
            return (
              <motion.div
                key={product?._id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="flex items-center justify-between border-b last:border-none p-4 hover:bg-gray-50"
              >
                <div className="flex items-start gap-3 flex-1">
                  <Link
                    href={`/product/${product?.slug?.current}`}
                    className="border rounded-xl overflow-hidden group"
                  >
                    {product?.images?.[0] && (
                      <Image
                        src={urlFor(product.images[0]!).url() || "/placeholder.png"}
                        alt={product?.name ?? "Product image"}
                        width={160}
                        height={160}
                        className="w-32 md:w-40 h-32 md:h-40 object-cover group-hover:scale-105 hoverEffect"
                      />
                    )}
                  </Link>

                  <div className="flex flex-col justify-between">
                    <h3 className="font-semibold text-base line-clamp-1">{product?.name}</h3>
                    <p className="text-sm text-gray-600">
                      {/* SỬA LỖI 2: Sử dụng product?._type thay vì product?.category */}
                      Loại: <span className="font-semibold">{(product as any)?.category || product?._type}</span>
                    </p>

                    <p className="text-sm text-gray-600">
                      Trạng thái: <span className="font-semibold">{product?.status}</span>
                    </p>
                    <div className="flex items-center gap-3 mt-2">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <ProductSideMenu product={product} />
                          </TooltipTrigger>
                          <TooltipContent>Thêm vào yêu thích</TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Trash
                              onClick={() => {
                                deleteCartProduct(product?._id);
                                toast.success("Đã xóa sản phẩm khỏi giỏ hàng!");
                              }}
                              className="w-4 h-4 text-gray-500 hover:text-red-500 transition"
                            />
                          </TooltipTrigger>
                          <TooltipContent>Xóa sản phẩm</TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col items-end gap-3">
                  <PriceFormatter amount={(product?.price as number) * itemCount} className="font-bold text-lg" />
                  <QuantityButtons product={product} />
                </div>
              </motion.div>
            );
          })}

          <div className="p-5 flex justify-between items-center">
            <Button onClick={handleResetCart} variant="destructive" className="rounded-full font-semibold">
              Làm trống giỏ hàng
            </Button>
          </div>
        </div>

        {/* RIGHT - SUMMARY */}
        <div className="space-y-6">
          <Card className="border border-gray-100 shadow-sm">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-gray-900">Tóm tắt đơn hàng</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span>Tạm tính</span>
                <PriceFormatter amount={getSubTotalPrice()} />
              </div>
              <div className="flex justify-between">
                <span>Giảm giá</span>
                <PriceFormatter amount={getSubTotalPrice() - getTotalPrice()} />
              </div>
              <Separator />
              <div className="flex justify-between font-semibold text-lg">
                <span>Tổng cộng</span>
                <PriceFormatter amount={getTotalPrice()} className="text-green-600" />
              </div>

              {/* Payment method */}
              <div className="mt-6">
                <Label className="font-semibold">Hình thức thanh toán</Label>
                <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="mt-3 space-y-2">
                  <Label className="flex items-center gap-2 p-2 border rounded-lg cursor-pointer hover:bg-gray-50">
                    <RadioGroupItem value="bank" id="bank" />
                    <CreditCard className="w-4 h-4 text-green-600" />
                    <span>Chuyển khoản (QR / STK)</span>
                  </Label>
                  <Label className="flex items-center gap-2 p-2 border rounded-lg cursor-pointer hover:bg-gray-50">
                    <RadioGroupItem value="cod" id="cod" />
                    <Wallet className="w-4 h-4 text-yellow-600" />
                    <span>Thanh toán khi nhận hàng (COD)</span>
                  </Label>
                </RadioGroup>
              </div>

              {paymentMethod === "bank" && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="p-4 mt-4 border rounded-lg bg-green-50 text-center"
                >
                  <p className="text-sm text-gray-600 mb-2">Quét mã QR để thanh toán:</p>
                  <Image src="/qr-s17.png" alt="QR thanh toán" width={180} height={180} className="mx-auto mb-2" />
                  <p className="text-xs text-gray-500">
                    STK: <span className="font-semibold text-green-700">123456789 - Ngân hàng Vietcombank</span>
                  </p>
                </motion.div>
              )}

              <motion.div whileHover={{ scale: 1.02 }}>
                <Button
                  onClick={handleCheckout}
                  disabled={loading}
                  className="w-full py-6 rounded-full bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold shadow-md hover:shadow-lg transition-all"
                >
                  {loading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <>
                      <CheckCircle2 className="w-5 h-5 mr-2" /> Xác nhận thanh toán
                    </>
                  )}
                </Button>
              </motion.div>
            </CardContent>
          </Card>

          {/* Address Section */}
          {addresses && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="text-green-600 w-5 h-5" /> Địa chỉ giao hàng
                </CardTitle>
              </CardHeader>
              <CardContent>
                <RadioGroup
                  defaultValue={addresses.find((addr) => addr.default)?._id?.toString()} // Sử dụng optional chaining an toàn hơn
                  onValueChange={(val) => {
                    const addr = addresses.find((a) => a._id?.toString() === val); // Sử dụng optional chaining an toàn hơn
                    setSelectedAddress(addr || null);
                  }}
                >
                  {addresses.map((address) => (
                    <div
                      key={address._id}
                      className={`flex items-center space-x-2 mb-3 cursor-pointer ${
                        selectedAddress?._id === address._id ? "text-green-600" : "text-gray-700"
                      }`}
                    >
                      <RadioGroupItem value={address._id?.toString() || ''} id={address._id?.toString()} /> {/* Sửa: Đảm bảo value là string */}
                      <Label htmlFor={address._id?.toString()} className="flex-1"> {/* Sửa: htmlFor khớp với id */}
                        <span className="font-semibold">{address.name}</span>
                        <br />
                        <span className="text-sm text-gray-500">
                          {address.address}, {address.city}, {address.state} {address.zip}
                        </span>
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
                <Button
                  variant="outline"
                  className="w-full mt-4 rounded-full border-green-500 text-green-600 hover:bg-green-50"
                >
                  + Thêm địa chỉ mới
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </Container>
  );
};

export default CartPage;