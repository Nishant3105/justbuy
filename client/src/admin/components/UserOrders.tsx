import { useParams } from "react-router-dom";
import { useUsersOrders } from "../../hooks/useOrders";

const UserOrders = () => {
  const { userId } = useParams();
  const { data: orders, isLoading, isError } = useUsersOrders(userId!);

  if (isLoading) return <div>Loading your orders...</div>;
  if (isError) return <div>Failed to load orders.</div>;

return (
  <div className="max-w-6xl mx-auto px-6 py-8">

    {/* Header */}
    <div className="flex items-center justify-between mb-8">
      <h1 className="text-3xl font-bold text-gray-900">My Orders</h1>

      <span className="text-sm text-gray-500">
        {orders?.length || 0} orders
      </span>
    </div>

    {/* Empty state */}
    {orders?.length === 0 && (
      <div className="bg-white border border-gray-200 rounded-2xl p-12 text-center shadow-sm">
        <div className="text-gray-400 text-lg mb-2">📦</div>
        <p className="text-gray-600 font-medium">No orders yet</p>
        <p className="text-gray-400 text-sm mt-1">
          Your orders will appear here once you purchase something.
        </p>
      </div>
    )}

    {/* Orders list */}
    <div className="space-y-6">
      {orders?.map((order: any) => (
        <div
          key={order?._id}
          className="bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-200"
        >

          {/* Order header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 px-6 py-4 border-b border-gray-100 bg-gray-50 rounded-t-2xl">

            <div className="flex flex-col">
              <span className="text-sm text-gray-500">Order ID</span>
              <span className="font-semibold text-gray-800">
                {order?._id}
              </span>
            </div>

            <div className="flex flex-col md:items-end">
              <span className="text-sm text-gray-500">Placed on</span>
              <span className="font-medium text-gray-700">
                {new Date(order?.createdAt).toLocaleDateString()}
              </span>
            </div>

          </div>

          {/* Items */}
          <div className="p-6 space-y-4">
            {order?.items?.map((item: any, idx: number) => (
              <div
                key={idx}
                className="flex items-center gap-4 border border-gray-100 rounded-xl p-3 hover:bg-gray-50 transition"
              >

                {/* Product image */}
                <div className="w-16 h-16 flex-shrink-0">
                  {item.product.mainImage ? (
                    <img
                      src={item.product.mainImage}
                      alt={item.product.name}
                      className="w-full h-full object-cover rounded-lg border"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-100 rounded-lg flex items-center justify-center text-gray-400 text-xs">
                      No image
                    </div>
                  )}
                </div>

                {/* Product details */}
                <div className="flex-1">
                  <p className="font-semibold text-gray-800">
                    {item.product.name}
                  </p>

                  <div className="flex items-center gap-4 mt-1 text-sm text-gray-500">
                    <span>Qty: {item.quantity}</span>
                    <span>₹{item.price}</span>
                  </div>
                </div>

                {/* Item total */}
                <div className="font-semibold text-gray-800">
                  ₹{item.quantity * item.price}
                </div>

              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between px-6 py-4 border-t border-gray-100 bg-gray-50 rounded-b-2xl">

            {/* Total */}
            <div>
              <span className="text-sm text-gray-500">Total Amount</span>
              <div className="text-lg font-bold text-gray-900">
                ₹{order?.total}
              </div>
            </div>

            {/* Status */}
            <span
              className={`px-4 py-1.5 rounded-full text-sm font-semibold ${
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

  </div>
);

};

export default UserOrders;
