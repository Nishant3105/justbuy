import { useState } from "react";
import { useAllOrders } from "../../hooks/useOrders";

const UserOrders = () => {
  const [page, setPage] = useState(1);

  const { data, isLoading, isError } = useAllOrders(page, 5);

  const orders = data?.orders || [];
  const pages = data?.pages || 1;

  if (isLoading)
    return <div className="p-6 text-center">Loading your orders...</div>;

  if (isError)
    return <div className="p-6 text-center text-red-500">Failed to load orders.</div>;

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">

      {/* Header */}
      <h1 className="text-2xl font-semibold">My Orders</h1>

      {/* Empty state */}
      {orders.length === 0 && (
        <div className="text-center py-10 text-gray-500">
          You have no orders yet.
        </div>
      )}

      {/* Orders */}
      <div className="space-y-4">
        {orders.map((order: any) => (
          <div
            key={order._id}
            className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition p-5"
          >
            {/* Top row */}
            <div className="flex justify-between items-center mb-3">
              <span className="font-medium text-gray-800">
                Order ID: {order._id}
              </span>

              <span className="text-sm text-gray-500">
                {new Date(order.createdAt).toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </span>
            </div>

            {/* Items */}
            <div className="space-y-3">
              {order.items.map((item: any, idx: number) => (
                <div
                  key={idx}
                  className="flex items-center gap-4 p-2 rounded-lg hover:bg-gray-50 transition"
                >
                  <img
                    src={item.product.mainImage}
                    alt={item.product.name}
                    className="w-16 h-16 object-cover rounded-lg border"
                  />

                  <div className="flex-1">
                    <p className="font-medium text-gray-800">
                      {item.product.name}
                    </p>

                    <p className="text-sm text-gray-500">
                      Qty: {item.quantity}
                    </p>

                    <p className="text-sm font-medium text-gray-700">
                      ₹{item.price}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom row */}
            <div className="mt-4 pt-3 border-t flex justify-between items-center">

              <span className="font-semibold text-lg text-gray-800">
                Total: ₹{order.total}
              </span>

              <span
                className={`px-3 py-1 text-xs font-medium rounded-full ${
                  order.paymentStatus === "paid"
                    ? "bg-green-100 text-green-700"
                    : order.paymentStatus === "failed"
                    ? "bg-red-100 text-red-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {order.paymentStatus.toUpperCase()}
              </span>

            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {pages > 1 && (
        <div className="flex justify-center items-center gap-4 pt-4">

          <button
            onClick={() => setPage((p) => p - 1)}
            disabled={page === 1}
            className="px-4 py-2 rounded-lg border bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>

          <span className="text-sm font-medium">
            Page {page} of {pages}
          </span>

          <button
            onClick={() => setPage((p) => p + 1)}
            disabled={page === pages}
            className="px-4 py-2 rounded-lg border bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>

        </div>
      )}

    </div>
  );
};

export default UserOrders;
