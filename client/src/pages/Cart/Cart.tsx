import { useCart } from "../../context/CartContext";
import { useToast } from "../../context/ToastContext";
import { FaTrash } from "react-icons/fa";

const Cart = () => {
  const { cartItems, addToCart, removeFromCart, clearCart } = useCart();
  const { showToast } = useToast();

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  console.log(cartItems)

  if (cartItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <h2 className="text-xl font-semibold">Your cart is empty 🛒</h2>
        <p className="text-gray-500 mt-2">Add some products to get started</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Your Cart</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Cart Items */}
        <div className="md:col-span-2 space-y-4">
          {cartItems.map((item) => (
            <div
              key={item.slug}
              className="flex gap-4 bg-white p-4 rounded-lg shadow"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-24 h-24 object-cover rounded"
              />

              <div className="flex-1">
                <h3 className="font-semibold">{item.title}</h3>
                <p className="text-gray-500 text-sm">
                  ₹{item.price.toFixed(2)}
                </p>

                {/* Quantity Controls */}
                <div className="flex items-center gap-3 mt-2">
                  <button
                    onClick={() => removeFromCart(item.slug,false,showToast)}
                    className="px-2 py-1 border rounded"
                  >
                    -
                  </button>

                  <span>{item.quantity}</span>

                  <button
                    onClick={() => addToCart(item,showToast)}
                    className="px-2 py-1 border rounded"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Remove */}
              <button
                onClick={() => removeFromCart(item.slug,true,showToast)}
                className="text-red-500 hover:text-red-700"
              >
                <FaTrash />
              </button>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="bg-white p-4 rounded-lg shadow h-fit">
          <h2 className="font-semibold text-lg mb-4">Order Summary</h2>

          <div className="flex justify-between mb-2">
            <span>Total</span>
            <span className="font-semibold">₹{totalPrice.toFixed(2)}</span>
          </div>

          <button className="w-full bg-black text-white py-2 rounded mt-4 hover:bg-gray-800">
            Checkout
          </button>

          <button
            onClick={clearCart}
            className="w-full text-sm text-red-500 mt-3"
          >
            Clear Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
