// D:\Website\Cty CP S17\final\S17_Marketplace_Final_\app\(client)\orders\page.tsx
import Container from "@/components/Container";
import OrdersComponent from "@/components/OrdersComponent";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ScrollArea,
  ScrollBar,
} from "@/components/ui/scroll-area";
import {
  Table,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getMyOrders } from "@/sanity/queries";
import { auth } from "@clerk/nextjs/server";
import { FileX, Package, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

const OrdersPage = async () => {
  const { userId } = await auth();
  if (!userId) {
    return redirect("/");
  }

  const orders = await getMyOrders(userId);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f5f9ff] to-white">
      {/* ===== Banner Header ===== */}
      <div className="bg-gradient-to-r from-[#0A68FF] to-[#007BFF] py-8 text-white shadow-md">
        <Container className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
              Đơn hàng của tôi
            </h1>
            <p className="text-sm md:text-base text-white/90 mt-1">
              Theo dõi trạng thái và chi tiết đơn hàng của bạn tại đây
            </p>
          </div>
          <ShoppingBag className="w-16 h-16 opacity-90 hidden md:block" />
        </Container>
      </div>

      {/* ===== Main Content ===== */}
      <Container className="py-10">
        {orders?.length ? (
          <Card className="w-full border border-blue-100 shadow-sm hover:shadow-md transition-all duration-300">
            <CardHeader className="border-b bg-[#f8fbff]">
              <div className="flex items-center gap-2">
                <Package className="w-5 h-5 text-[#0A68FF]" />
                <CardTitle className="text-lg md:text-xl font-semibold text-[#0A68FF]">
                  Danh sách đơn hàng
                </CardTitle>
              </div>
            </CardHeader>

            <CardContent>
              <ScrollArea>
                <Table className="min-w-[800px] text-sm">
                  <TableHeader>
                    <TableRow className="bg-[#f2f7ff] hover:bg-[#e8f1ff] text-[#1e3a8a] font-medium">
                      <TableHead className="w-[120px]">Mã đơn</TableHead>
                      <TableHead className="hidden md:table-cell">
                        Ngày đặt
                      </TableHead>
                      <TableHead>Khách hàng</TableHead>
                      <TableHead className="hidden sm:table-cell">
                        Email
                      </TableHead>
                      <TableHead>Tổng tiền</TableHead>
                      <TableHead>Trạng thái</TableHead>
                      <TableHead className="hidden sm:table-cell">
                        Mã hóa đơn
                      </TableHead>
                      <TableHead className="text-center">Hành động</TableHead>
                    </TableRow>
                  </TableHeader>
                  <OrdersComponent orders={orders} />
                </Table>
                <ScrollBar orientation="horizontal" />
              </ScrollArea>
            </CardContent>
          </Card>
        ) : (
          <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
            <FileX className="h-24 w-24 text-blue-300 mb-4" />
            <h2 className="text-2xl font-semibold text-gray-800">
              Bạn chưa có đơn hàng nào
            </h2>
            <p className="mt-2 text-sm text-gray-500 max-w-md">
              Hãy khám phá các sản phẩm chất lượng và bắt đầu mua sắm ngay hôm nay!
            </p>
            <Button
              asChild
              className="mt-6 bg-[#0A68FF] hover:bg-[#005ce6] text-white font-semibold transition-colors"
            >
              <Link href="/">Tiếp tục mua sắm</Link>
            </Button>
          </div>
        )}
      </Container>
    </div>
  );
};

export default OrdersPage;
