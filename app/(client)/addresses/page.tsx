"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useUser } from "@clerk/nextjs";
import toast from "react-hot-toast";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  RadioGroup,
  RadioGroupItem,
} from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import {
  MapPin,
  PlusCircle,
  Trash2,
  CheckCircle2,
  Building2,
  Home,
  MoreHorizontal,
} from "lucide-react";

const MAX_ADDRESSES = 3;

export default function AddressesPage() {
  const { user } = useUser();
  const [addresses, setAddresses] = useState<any[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);

  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    street: "",
    district: "",
    city: "",
    type: "home",
  });

  // 🔹 Lấy danh sách địa chỉ
  const fetchAddresses = async () => {
    if (!user?.id) return;
    try {
      setPageLoading(true);
      const res = await fetch(`/api/address?userId=${user.id}`, { cache: "no-store" });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Lỗi tải dữ liệu");
      setAddresses(json.data || []);
      const defaultAddr = json.data?.find((a: any) => a.isDefault);
      if (defaultAddr) setSelectedId(defaultAddr._id);
    } catch (err) {
      console.error("Fetch address error:", err);
      toast.error("Không thể tải danh sách địa chỉ!");
    } finally {
      setPageLoading(false);
    }
  };

  useEffect(() => {
    if (user?.id) {
      fetchAddresses();
    }
  }, [user?.id]);

  // 🔸 Thêm địa chỉ mới
  const handleAdd = async () => {
    if (addresses.length >= MAX_ADDRESSES)
      return toast.error("Bạn chỉ có thể lưu tối đa 3 địa chỉ!");

    if (!form.fullName || !form.phone || !form.street || !form.city)
      return toast.error("Vui lòng điền đầy đủ thông tin!");

    if (!user?.id || !user?.emailAddresses?.[0]?.emailAddress)
      return toast.error("Không thể lấy thông tin tài khoản!");

    setLoading(true);
    try {
      const res = await fetch("/api/address", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          userId: user.id,
          userEmail: user.emailAddresses[0].emailAddress,
          customerPhone: form.phone,
          isDefault: addresses.length === 0,
        }),
      });

      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Thêm địa chỉ thất bại!");

      setAddresses((prev) => [json.data, ...prev]);
      setIsAdding(false);
      setForm({
        fullName: "",
        phone: "",
        street: "",
        district: "",
        city: "",
        type: "home",
      });
      toast.success("Đã thêm địa chỉ mới!");
    } catch (err) {
      console.error(err);
      toast.error("Không thể thêm địa chỉ!");
    } finally {
      setLoading(false);
    }
  };

  // 🔸 Xóa địa chỉ
  const handleDelete = async (id: string) => {
    if (!confirm("Bạn có chắc muốn xóa địa chỉ này?")) return;
    try {
      const res = await fetch(`/api/address?id=${id}`, { method: "DELETE" });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Xóa thất bại");

      setAddresses((prev) => prev.filter((a) => a._id !== id));
      toast.success("Đã xóa địa chỉ!");
    } catch (err) {
      console.error(err);
      toast.error("Không thể xóa địa chỉ!");
    }
  };

  // 🔸 Đặt làm mặc định
  const handleSetDefault = async (id: string) => {
    try {
      const res = await fetch("/api/address/update", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, isDefault: true }),
      });

      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Cập nhật thất bại");

      setAddresses((prev) =>
        prev.map((a) => ({ ...a, isDefault: a._id === id }))
      );
      setSelectedId(id);
      toast.success("Đã đặt làm địa chỉ mặc định!");
    } catch (err) {
      console.error(err);
      toast.error("Không thể đặt mặc định!");
    }
  };

  // 🧩 Form nhập địa chỉ
  const AddAddressForm = () => (
    <motion.div
      key="add-form"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ duration: 0.25 }}
      className="mt-6 space-y-4 border rounded-2xl p-6 bg-white shadow-sm"
    >
      <h3 className="text-lg font-semibold text-gray-800 mb-2">
        Thêm địa chỉ mới
      </h3>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label>Họ tên người nhận</Label>
          <Input
            value={form.fullName}
            onChange={(e) => setForm({ ...form, fullName: e.target.value })}
            placeholder="VD: Nguyễn Văn A"
          />
        </div>
        <div>
          <Label>Số điện thoại</Label>
          <Input
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            placeholder="VD: 0909123456"
          />
        </div>
      </div>

      <div>
        <Label>Địa chỉ cụ thể</Label>
        <Input
          value={form.street}
          onChange={(e) => setForm({ ...form, street: e.target.value })}
          placeholder="Số nhà, đường..."
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <Label>Quận / Huyện</Label>
          <Input
            value={form.district}
            onChange={(e) => setForm({ ...form, district: e.target.value })}
            placeholder="Quận 1"
          />
        </div>
        <div>
          <Label>Thành phố</Label>
          <Input
            value={form.city}
            onChange={(e) => setForm({ ...form, city: e.target.value })}
            placeholder="TP.HCM"
          />
        </div>
      </div>

      <div>
        <Label>Loại địa chỉ</Label>
        <RadioGroup
          className="flex gap-6 mt-2"
          value={form.type}
          onValueChange={(val) => setForm({ ...form, type: val })}
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="home" id="home" />
            <Label htmlFor="home" className="flex items-center gap-1">
              <Home className="w-4 h-4" /> Nhà riêng
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="office" id="office" />
            <Label htmlFor="office" className="flex items-center gap-1">
              <Building2 className="w-4 h-4" /> Văn phòng
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="other" id="other" />
            <Label htmlFor="other" className="flex items-center gap-1">
              <MoreHorizontal className="w-4 h-4" /> Khác
            </Label>
          </div>
        </RadioGroup>
      </div>

      <div className="flex justify-end gap-2 pt-4">
        <Button variant="outline" onClick={() => setIsAdding(false)} className="rounded-full">
          Hủy
        </Button>
        <Button
          onClick={handleAdd}
          disabled={loading}
          className="rounded-full bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:opacity-90"
        >
          {loading ? "Đang lưu..." : "Lưu ��ịa chỉ"}
        </Button>
      </div>
    </motion.div>
  );

  if (pageLoading) {
    return (
      <motion.div
        className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-10 px-4 sm:px-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <Card className="max-w-3xl mx-auto border border-gray-100 shadow-lg rounded-3xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl font-semibold text-gray-800">
              <MapPin className="text-green-600" /> Quản lý địa chỉ giao hàng
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Separator className="my-4" />
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-start gap-3 p-4 border rounded-2xl bg-gray-50 animate-pulse">
                  <div className="w-5 h-5 bg-gray-300 rounded-full flex-shrink-0 mt-1" />
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-gray-300 rounded w-1/3" />
                    <div className="h-3 bg-gray-300 rounded w-2/3" />
                    <div className="h-3 bg-gray-300 rounded w-1/2" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-10 px-4 sm:px-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <Card className="max-w-3xl mx-auto border border-gray-100 shadow-lg rounded-3xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-2xl font-semibold text-gray-800">
            <MapPin className="text-green-600" /> Quản lý địa chỉ giao hàng
          </CardTitle>
        </CardHeader>

        <CardContent>
          <Separator className="my-4" />

          <RadioGroup
            value={selectedId ?? ""}
            onValueChange={(val) => {
              setSelectedId(val);
              handleSetDefault(val);
            }}
            className="space-y-4"
          >
            {addresses.length === 0 ? (
              <p className="text-center text-gray-500 text-sm py-8">
                Chưa có địa chỉ nào được lưu.
              </p>
            ) : (
              addresses.map((addr) => (
                <motion.div
                  key={addr._id}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{
                    scale: 1.02,
                    boxShadow: "0 4px 14px rgba(0,0,0,0.05)",
                  }}
                  className={`flex items-start justify-between p-4 border rounded-2xl transition-all ${
                    selectedId === addr._id
                      ? "border-green-500 bg-green-50"
                      : "border-gray-200 hover:border-green-300 bg-white"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <RadioGroupItem value={addr._id} id={addr._id} />
                    <Label htmlFor={addr._id} className="cursor-pointer">
                      <p className="font-semibold">{addr.fullName}</p>
                      <p className="text-sm text-gray-600">
                        {addr.street}, {addr.district}, {addr.city}
                      </p>
                      <p className="text-sm text-gray-500 mt-1">
                        ��� {addr.phone} • 🏠{" "}
                        {addr.type === "home"
                          ? "Nhà riêng"
                          : addr.type === "office"
                          ? "Văn phòng"
                          : "Khác"}
                      </p>
                    </Label>
                  </div>
                  <div className="flex items-center gap-2">
                    {selectedId === addr._id && (
                      <CheckCircle2 className="w-5 h-5 text-green-500" />
                    )}
                    <Trash2
                      onClick={() => handleDelete(addr._id)}
                      className="w-5 h-5 text-gray-400 hover:text-red-500 cursor-pointer transition"
                    />
                  </div>
                </motion.div>
              ))
            )}
          </RadioGroup>

          <AnimatePresence mode="wait">
            {isAdding && <AddAddressForm />}
          </AnimatePresence>

          {!isAdding && addresses.length < MAX_ADDRESSES && (
            <Button
              onClick={() => setIsAdding(true)}
              variant="outline"
              className="mt-6 w-full border-green-500 text-green-600 hover:bg-green-50 rounded-full"
            >
              <PlusCircle className="w-4 h-4 mr-2" /> Thêm địa chỉ mới
            </Button>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}
