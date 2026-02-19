import { useRecentOrders } from "../../../hooks/useAnalytics";

const RecentOrders = () => {
  const { data = [] } = useRecentOrders();

  return (
    <div className="overflow-x-auto rounded-xl bg-white shadow border border-gray-100">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-50 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">
            <th className="px-6 py-4">User</th>
            <th className="px-6 py-4">Total</th>
            <th className="px-6 py-4">Status</th>
          </tr>
        </thead>

        <tbody>
          {data.map((order: any) => (
            <tr
              key={order._id}
              className="
            odd:bg-white
            even:bg-gray-50
            hover:bg-indigo-50
            transition-colors duration-150
          "
            >
              <td className="px-6 py-4 font-medium text-gray-800">
                {order.user?.firstName} {order.user?.lastName}
              </td>

              <td className="px-6 py-4 font-semibold text-gray-900">
                ₹{order.total}
              </td>

              <td className="px-6 py-4">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold
                ${order.paymentStatus === "paid"
                      ? "bg-green-100 text-green-700"
                      : order.paymentStatus === "pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : order.paymentStatus === "failed"
                          ? "bg-red-100 text-red-700"
                          : "bg-gray-100 text-gray-700"
                    }
              `}
                >
                  {order.paymentStatus}
                </span>
              </td>

            </tr>
          ))}
        </tbody>

      </table>
    </div>


  );
};

export default RecentOrders;
