import { useMyOrders } from "../../hooks/useOrders";

const MyOrders = () => {
  const { data: orders, isLoading, isError } = useMyOrders();

  if (isLoading) return <div>Loading your orders...</div>;
  if (isError) return <div>Failed to load orders.</div>;

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-semibold">My Orders</h1>

      {orders?.length === 0 && <p>You have no orders yet.</p>}

      <div className="space-y-4">
        {orders?.map((order: any) => (
          <div key={order?._id} className="border rounded-lg p-4 shadow-sm">
            <div className="flex justify-between items-center mb-2">
              <span className="font-medium">Order ID: {order?._id}</span>
              <span className="text-sm text-gray-500">
                {new Date(order?.createdAt).toLocaleDateString()}
              </span>
            </div>

            <div className="space-y-2">
              {order?.items?.map((item: any, idx: number) => (
                <div key={idx} className="flex items-center gap-4">
                  {item.product.mainImage && (
                    <img
                      src={item.product.mainImage}
                      alt={item.product.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                  )}
                  <div>
                    <p className="font-medium">{item.product.name}</p>
                    <p>Qty: {item.quantity}</p>
                    <p>Price: ₹{item.price / 100} (per item)</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-2 flex justify-between items-center">
              <span className="font-semibold">Total: ₹{order?.total / 100}</span>
              <span
                className={`px-2 py-1 rounded-full text-sm ${
                  order.paymentStatus === "paid"
                    ? "bg-green-100 text-green-800"
                    : order.paymentStatus === "failed"
                    ? "bg-red-100 text-red-800"
                    : "bg-yellow-100 text-yellow-800"
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

export default MyOrders;
