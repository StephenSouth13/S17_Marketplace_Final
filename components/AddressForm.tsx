"use client";

import { motion } from "framer-motion";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RadioGroupItem, RadioGroup } from "@/components/ui/radio-group";
import React, { memo } from "react";

interface AddressFormProps {
  form: {
    fullName: string;
    phone: string;
    street: string;
    district: string;
    city: string;
    type: string;
  };
  onFormChange: (field: string, value: string) => void;
  onCancel: () => void;
  onSubmit: () => void;
  loading: boolean;
}

const AddressForm = memo(({ form, onFormChange, onCancel, onSubmit, loading }: AddressFormProps) => {
  return (
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
            onChange={(e) => onFormChange("fullName", e.target.value)}
            placeholder="VD: Nguyễn Văn A"
          />
        </div>
        <div>
          <Label>Số điện thoại</Label>
          <Input
            value={form.phone}
            onChange={(e) => onFormChange("phone", e.target.value)}
            placeholder="VD: 0909123456"
          />
        </div>
      </div>

      <div>
        <Label>Địa chỉ cụ thể</Label>
        <Input
          value={form.street}
          onChange={(e) => onFormChange("street", e.target.value)}
          placeholder="Số nhà, đường..."
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <Label>Quận / Huyện</Label>
          <Input
            value={form.district}
            onChange={(e) => onFormChange("district", e.target.value)}
            placeholder="Quận 1"
          />
        </div>
        <div>
          <Label>Thành phố</Label>
          <Input
            value={form.city}
            onChange={(e) => onFormChange("city", e.target.value)}
            placeholder="TP.HCM"
          />
        </div>
      </div>

      <div>
        <Label>Loại địa chỉ</Label>
        <RadioGroup
          className="flex gap-6 mt-2"
          value={form.type}
          onValueChange={(val) => onFormChange("type", val)}
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="home" id="home" />
            <Label htmlFor="home" className="cursor-pointer font-normal">
              🏠 Nhà riêng
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="office" id="office" />
            <Label htmlFor="office" className="cursor-pointer font-normal">
              💼 Văn phòng
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="other" id="other" />
            <Label htmlFor="other" className="cursor-pointer font-normal">
              📦 Khác
            </Label>
          </div>
        </RadioGroup>
      </div>

      <div className="flex justify-end gap-2 pt-4">
        <Button variant="outline" onClick={onCancel} className="rounded-full">
          Hủy
        </Button>
        <Button
          onClick={onSubmit}
          disabled={loading}
          className="rounded-full bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:opacity-90"
        >
          {loading ? "Đang lưu..." : "Lưu địa chỉ"}
        </Button>
      </div>
    </motion.div>
  );
});

AddressForm.displayName = "AddressForm";

export default AddressForm;
