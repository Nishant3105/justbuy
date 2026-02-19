import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Confetti from "react-confetti";

interface PaymentSuccessProps {
  orderId: string;
  items: { name: string; quantity: number; price: number }[];
  total: number;
  shippingAddress: string;
}

const PaymentSuccess = ({ orderId, items, total, shippingAddress }: PaymentSuccessProps) => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/");
    }, 10000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6">
      <Confetti numberOfPieces={200} />
      
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-2xl text-center space-y-6">
        <h1 className="text-3xl font-bold text-green-600">Payment Successful 🎉</h1>
        <p className="text-gray-600">Your order has been confirmed!</p>

        <div className="bg-gray-100 p-4 rounded-lg space-y-2 text-left">
          <p><span className="font-medium">Order ID:</span> {orderId}</p>
          <p><span className="font-medium">Shipping Address:</span> {shippingAddress}</p>
          <p><span className="font-medium">Items:</span></p>
          <ul className="list-disc list-inside ml-4">
            {items.map((item, idx) => (
              <li key={idx}>
                {item.name} x {item.quantity} - ₹{item.price}
              </li>
            ))}
          </ul>
          <p className="font-semibold mt-2">Total Paid: ₹{total}</p>
        </div>

        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-4">
          <button
            onClick={() => navigate("/orders")}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Track Your Order
          </button>
          <button
            onClick={() => navigate("/")}
            className="px-6 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition"
          >
            Continue Shopping
          </button>
        </div>

        <p className="text-sm text-gray-500 mt-4">
          You will also receive an email confirmation shortly.
        </p>
      </div>
    </div>
  );
};

export default PaymentSuccess;
