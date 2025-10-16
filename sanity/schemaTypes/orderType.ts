import { BasketIcon, CheckmarkCircleIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";

export const orderType = defineType({
  name: "order",
  title: "Order",
  type: "document",
  icon: BasketIcon,

  fields: [
    // 🧾 Mã đơn hàng
    defineField({
      name: "orderNumber",
      title: "Order Number",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),

    // 💳 Stripe payment info
    defineField({ name: "stripeCheckoutSessionId", title: "Stripe Checkout Session ID", type: "string" }),
    defineField({ name: "stripeCustomerId", title: "Stripe Customer ID", type: "string" }),
    defineField({ name: "stripePaymentIntentId", title: "Stripe Payment Intent ID", type: "string" }),

    // 👤 Khách hàng
    defineField({
      name: "clerkUserId",
      title: "Store User ID",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "userId",
      title: "User ID",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "customerName",
      title: "Customer Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "email",
      title: "Customer Email",
      type: "string",
      validation: (Rule) => Rule.required().email(),
    }),

    // 🛒 Sản phẩm mua
    defineField({
      name: "products",
      title: "Ordered Items",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({
              name: "product",
              title: "Product",
              type: "reference",
              to: [{ type: "product" }],
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "quantity",
              title: "Quantity",
              type: "number",
              validation: (Rule) => Rule.min(1),
            }),
          ],
          preview: {
            select: {
              title: "product.name",
              media: "product.images.0",
              quantity: "quantity",
              price: "product.price",
              discount: "product.discount",
            },
            prepare({ title, media, quantity, price, discount }) {
              const discountPrice = discount
                ? price - price * (discount / 100)
                : price;
              const total = discountPrice * quantity;
              return {
                title: `${title} × ${quantity}`,
                subtitle: `${total.toLocaleString()}₫`,
                media,
              };
            },
          },
        }),
      ],
    }),

    // 💰 Tổng tiền
    defineField({
      name: "totalPrice",
      title: "Total Price",
      type: "number",
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: "amountDiscount",
      title: "Amount Discount",
      type: "number",
      initialValue: 0,
    }),
    defineField({
      name: "currency",
      title: "Currency",
      type: "string",
      initialValue: "VND",
      validation: (Rule) => Rule.required(),
    }),

    // 🚚 Địa chỉ giao hàng
    defineField({
      name: "address",
      title: "Shipping Address",
      type: "object",
      fields: [
        defineField({ name: "fullName", title: "Full Name", type: "string" }),
        defineField({ name: "phone", title: "Phone", type: "string" }),
        defineField({ name: "street", title: "Street", type: "string" }),
        defineField({ name: "district", title: "District", type: "string" }),
        defineField({ name: "city", title: "City", type: "string" }),
        defineField({
          name: "type",
          title: "Address Type",
          type: "string",
          options: {
            list: [
              { title: "Home", value: "home" },
              { title: "Office", value: "office" },
            ],
          },
        }),
        defineField({
          name: "isDefault",
          title: "Default Address",
          type: "boolean",
          initialValue: false,
        }),
      ],
    }),

    // 🏦 Phương thức thanh toán
    defineField({
      name: "paymentMethod",
      title: "Payment Method",
      type: "string",
      options: {
        list: [
          { title: "Cash on Delivery", value: "cod" },
          { title: "Bank Transfer", value: "bank" },
          { title: "Stripe", value: "stripe" },
        ],
      },
    }),

    // 🔄 Trạng thái đơn hàng
    defineField({
      name: "status",
      title: "Order Status",
      type: "string",
      options: {
        list: [
          { title: "Pending", value: "pending" },
          { title: "Processing", value: "processing" },
          { title: "Paid", value: "paid" },
          { title: "Shipped", value: "shipped" },
          { title: "Out for Delivery", value: "out_for_delivery" },
          { title: "Delivered", value: "delivered" },
          { title: "Cancelled", value: "cancelled" },
        ],
      },
      initialValue: "pending",
    }),

    // 🕓 Ngày tạo
    defineField({
      name: "createdAt",
      title: "Created At",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
    }),

    // 📅 Ngày đặt hàng
    defineField({
      name: "orderDate",
      title: "Order Date",
      type: "datetime",
      validation: (Rule) => Rule.required(),
    }),
  ],

  // 👁️ Preview
  preview: {
    select: {
      customerName: "customerName",
      total: "totalPrice",
      currency: "currency",
      status: "status",
      payment: "paymentMethod",
      email: "email",
    },
    prepare({ customerName, total, currency, status, payment, email }) {
      const paymentText =
        payment === "cod"
          ? "COD"
          : payment === "bank"
          ? "Bank Transfer"
          : "Stripe";
      const formattedTotal = `${total?.toLocaleString()} ${currency || "VND"}`;
      const statusIcon =
        status === "paid" || status === "delivered"
          ? CheckmarkCircleIcon
          : BasketIcon;

      return {
        title: `${customerName || "Unknown"} — ${formattedTotal}`,
        subtitle: `${paymentText} • ${status}`,
        media: statusIcon,
      };
    },
  },
});
