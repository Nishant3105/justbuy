import type { Order } from "../../types/Order";
import type { User } from "../../types/User";

interface UserOrdersProps {
  user: User;
  onBack: () => void;
}

const mockOrders: Order[] = [
  {
    id: "1",
    orderNumber: "#ORD1001",
    userId: "1",
    date: "2024-02-12",
    itemsCount: 3,
    paymentStatus: "paid",
    orderStatus: "delivered",
    totalAmount: 1299,
  },
  {
    id: "2",
    orderNumber: "#ORD1002",
    userId: "1",
    date: "2024-02-20",
    itemsCount: 1,
    paymentStatus: "pending",
    orderStatus: "placed",
    totalAmount: 499,
  },
];

const UserOrders = ({ user, onBack }: UserOrdersProps) => {
  const orders = mockOrders.filter(
    (order) => order.userId === user.id
  );

  return (
    <div>
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">
            Orders – {user.firstName} {user.lastName}
          </h1>
          <p className="text-sm text-gray-500">{user.email}</p>
        </div>

        <button
          onClick={onBack}
          className="rounded-lg border px-4 py-2"
        >
          ← Back to Users
        </button>
      </div>
      
      <div className="overflow-x-auto rounded-xl bg-white shadow">
        <table className="w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-3">Order ID</th>
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3">Items</th>
              <th className="px-4 py-3">Payment</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3 text-right">Total</th>
            </tr>
          </thead>

          <tbody>
            {orders.length === 0 ? (
              <tr>
                <td
                  colSpan={6}
                  className="px-4 py-6 text-center text-gray-500"
                >
                  No orders found for this user
                </td>
              </tr>
            ) : (
              orders.map((order) => (
                <tr key={order.id} className="border-t">
                  <td className="px-4 py-3 font-medium">
                    {order.orderNumber}
                  </td>

                  <td className="px-4 py-3">{order.date}</td>

                  <td className="px-4 py-3">{order.itemsCount}</td>

                  <td className="px-4 py-3">
                    <span
                      className={`rounded-full px-2 py-1 text-xs ${
                        order.paymentStatus === "paid"
                          ? "bg-green-100 text-green-700"
                          : order.paymentStatus === "pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {order.paymentStatus}
                    </span>
                  </td>

                  <td className="px-4 py-3 capitalize">
                    {order.orderStatus}
                  </td>

                  <td className="px-4 py-3 text-right font-semibold">
                    ₹{order.totalAmount}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserOrders;
