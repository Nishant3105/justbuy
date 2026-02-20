import { useCartContext } from "../../context/CartContext";
import { useToast } from "../../context/ToastContext";
import { useAuth } from "../../context/AuthContext";
import { FaTrash } from "react-icons/fa";
import axios from "../../utils/axios";
import ShimmerCart from "../../components/shimmer/ShimmerCart";
import { useState } from "react";
import AuthModal from "../../components/models/Auth";
import PaymentSuccess from "../../components/PaymentSuccess";

interface PaymentSuccessProps {
  orderId: string;
  items: { name: string; quantity: number; price: number }[];
  total: number;
  shippingAddress: string;
}

const Cart = () => {
  const {
    cartItems,
    addToCart,
    removeFromCart,
    clearCart,
    isLoading,
  } = useCartContext();

  const { showToast } = useToast();
  const { user } = useAuth();

  const [showAuthModal, setShowAuthModal] = useState(false);
  const [verifiedOrder, setVerifiedOrder] =
    useState<PaymentSuccessProps | null>(null);

  if (isLoading) return <ShimmerCart />;

  if (cartItems.length === 0 && !verifiedOrder) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <h2 className="text-xl font-semibold">Your cart is empty 🛒</h2>
        <p className="text-gray-500 mt-2">
          Add some products to get started
        </p>
      </div>
    );
  }

  const totalPrice = cartItems.reduce(
    (sum: number, item) => sum + item.price * item.quantity,
    0
  );

  const handlePayment = async () => {
    if (!user) {
      setShowAuthModal(true);
      return;
    }

    try {
      const orderPayload = {
        items: cartItems.map(item => ({
          product: item.productId,
          quantity: item.quantity,
          price: item.price,
        })),
        total: totalPrice,
      };

      const { data: order } = await axios.post(
        "/api/payment/create-order",
        orderPayload,
        { withCredentials: true }
      );

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,

        amount: order.amount,
        currency: order.currency,

        name: "JustBuy",
        description: "Order Payment",

        order_id: order.razorpayOrderId,

        handler: async function (response: any) {
          try {
            await axios.post(
              "/api/payment/verify-payment",
              {
                orderId: order.orderId,
                razorpay_payment_id:
                  response.razorpay_payment_id,
                razorpay_order_id:
                  response.razorpay_order_id,
                razorpay_signature:
                  response.razorpay_signature,
              },
              { withCredentials: true }
            );

            setVerifiedOrder({
              orderId: order.orderId,
              items: cartItems.map(item => ({
                name: item.name,
                quantity: item.quantity,
                price: item.price,
              })),
              total: totalPrice,
              shippingAddress:
                "123 Main St, City, Country",
            });

            clearCart(); 

          } catch {
            showToast(
              "Payment verification failed",
              "error"
            );
          }
        },

        prefill: {
          name: user.firstName + " " + user.lastName,
          email: user.email,
        },

        theme: {
          color: "#000000",
        },
      };

      const razor = new (window as any).Razorpay(
        options
      );
      razor.open();

    } catch {
      showToast(
        "Payment initiation failed",
        "error"
      );
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-4">

      {!verifiedOrder && (
        <>
          <h1 className="text-2xl font-bold mb-6">
            Your Cart
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            {/* Cart Items */}
            <div className="md:col-span-2 space-y-4">
              {cartItems.map(item => (
                <div
                  key={item.productId}
                  className="flex gap-4 bg-white p-4 rounded-lg shadow"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-24 h-24 object-cover rounded"
                  />

                  <div className="flex-1">
                    <h3 className="font-semibold">
                      {item.name}
                    </h3>

                    <p className="text-gray-500 text-sm">
                      ₹{item.price.toFixed(2)}
                    </p>

                    <div className="flex items-center gap-3 mt-2">
                      <button
                        onClick={() =>
                          removeFromCart(
                            item.productId,
                            false,
                            showToast
                          )
                        }
                        className="px-2 py-1 border rounded"
                      >
                        -
                      </button>

                      <span>
                        {item.quantity}
                      </span>

                      <button
                        onClick={() =>
                          addToCart(
                            {
                              productId: item.productId,
                              name: item.name,
                              slug: item.slug,
                              image: item.image,
                              price: item.price,
                              quantity:1,
                            },
                            showToast
                          )
                        }
                        className="px-2 py-1 border rounded"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <button
                    onClick={() =>
                      removeFromCart(
                        item.productId,
                        true,
                        showToast
                      )
                    }
                    className="text-red-500 hover:text-red-700"
                  >
                    <FaTrash />
                  </button>

                </div>
              ))}
            </div>

            <div className="bg-white p-4 rounded-lg shadow h-fit">
              <h2 className="font-semibold text-lg mb-4">
                Order Summary
              </h2>

              <div className="flex justify-between mb-2">
                <span>Total</span>
                <span className="font-semibold">
                  ₹{totalPrice.toFixed(2)}
                </span>
              </div>

              <button
                onClick={handlePayment}
                className="w-full bg-black text-white py-2 rounded mt-4 hover:bg-gray-800"
              >
                Pay Now
              </button>

              <button
                onClick={() =>
                  clearCart(showToast)
                }
                className="w-full text-sm text-red-500 mt-3"
              >
                Clear Cart
              </button>

            </div>

          </div>
        </>
      )}

      <AuthModal
        isOpen={showAuthModal}
        onClose={() =>
          setShowAuthModal(false)
        }
      />

      {verifiedOrder && (
        <PaymentSuccess
          orderId={verifiedOrder.orderId}
          items={verifiedOrder.items}
          total={verifiedOrder.total}
          shippingAddress={
            verifiedOrder.shippingAddress
          }
        />
      )}

    </div>
  );
};

export default Cart;