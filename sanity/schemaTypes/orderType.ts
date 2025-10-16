import { BasketIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";

export const orderType = defineType({
  name: "order",
  title: "Order",
  type: "document",
  icon: BasketIcon,
  fields: [
    defineField({
      name: "orderNumber",
      title: "Order Number",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),

    // Các thông tin Stripe / Clerk
    defineField({ name: "stripeCheckoutSessionId", title: "Stripe Checkout Session ID", type: "string" }),
    defineField({ name: "stripeCustomerId", title: "Stripe Customer ID", type: "string" }),
    defineField({ name: "stripePaymentIntentId", title: "Stripe Payment Intent ID", type: "string" }),
    defineField({ name: "clerkUserId", title: "Store User ID", type: "string" }),

    // Thông tin người dùng
    defineField({ name: "userId", title: "User ID", type: "string" }),
    defineField({ name: "customerName", title: "Customer Name", type: "string" }),
    defineField({ name: "email", title: "Customer Email", type: "string" }),

    // Sản phẩm (new system)
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
              title: "Product Bought",
              type: "reference",
              to: [{ type: "product" }],
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
            },
            prepare({ title, media, quantity, price }) {
              return {
                title: `${title} x${quantity}`,
                subtitle: price ? `${price.toLocaleString()} VND` : "No price",
                media,
              };
            },
          },
        }),
      ],
    }),

    // Legacy order (API v1)
    defineField({
      name: "items",
      title: "Legacy Items (Old Orders)",
      type: "array",
      hidden: true,
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({
              name: "product",
              title: "Product",
              type: "object",
              fields: [
                { name: "name", title: "Name", type: "string" },
                { name: "price", title: "Price", type: "number" },
                {
                  name: "images",
                  title: "Images",
                  type: "array",
                  of: [{ type: "image" }],
                },
              ],
              preview: {
                select: { title: "name", price: "price", media: "images.0" },
                prepare({ title, price, media }) {
                  return {
                    title,
                    subtitle: price ? `${price.toLocaleString()} VND` : "",
                    media,
                  };
                },
              },
            }),
            defineField({ name: "quantity", title: "Quantity", type: "number" }),
          ],
        }),
      ],
    }),

    // Tổng giá trị
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
      validation: (Rule) => Rule.min(0),
    }),
    defineField({
      name: "currency",
      title: "Currency",
      type: "string",
      initialValue: "VND",
    }),

    // Địa chỉ giao hàng
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
              { title: "Work", value: "work" },
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

    // Phương thức thanh toán, trạng thái, thời gian
    defineField({
      name: "paymentMethod",
      title: "Payment Method",
      type: "string",
      options: {
        list: [
          { title: "Bank Transfer", value: "bank" },
          { title: "Cash on Delivery", value: "cod" },
        ],
      },
    }),
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
    }),
    defineField({ name: "createdAt", title: "Created At", type: "datetime" }),
    defineField({ name: "orderDate", title: "Order Date", type: "datetime" }),
  ],

  // Preview hiển thị ở list
  preview: {
    select: {
      name: "customerName",
      amount: "totalPrice",
      currency: "currency",
      payment: "paymentMethod",
      status: "status",
    },
    prepare({ name, amount, currency, payment, status }) {
      return {
        title: name || "Unknown",
        subtitle: `${amount?.toLocaleString() || 0} ${currency || "VND"} • ${payment || "Unknown"} • ${status || "pending"}`,
        media: BasketIcon,
      };
    },
  },
});
