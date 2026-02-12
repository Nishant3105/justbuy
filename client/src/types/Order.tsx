export interface Order {
  id: string;
  orderNumber: string;
  userId: string;
  date: string;
  itemsCount: number;
  paymentStatus: "paid" | "pending" | "failed";
  orderStatus: "placed" | "shipped" | "delivered" | "cancelled";
  totalAmount: number;
}
