import { Truck, Clock, MapPin, Mail } from "lucide-react";

const Shipping = () => {
  return (
    <div className="bg-gray-50 min-h-screen">

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-16 px-6 text-center">
        <h1 className="text-4xl font-bold mb-4">
          Shipping & Delivery
        </h1>
        <p className="max-w-2xl mx-auto text-lg opacity-90">
          Fast, reliable delivery to your doorstep. Here’s everything you
          need to know about our shipping process.
        </p>
      </div>

      {/* Content Section */}
      <div className="max-w-4xl mx-auto px-6 py-16 space-y-10">

        {/* Processing Time */}
        <div className="bg-white p-8 rounded-2xl shadow-sm flex gap-4">
          <Clock className="text-blue-600 w-8 h-8 flex-shrink-0" />
          <div>
            <h2 className="text-2xl font-semibold mb-3">
              Order Processing
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Orders are processed within 1–2 business days after confirmation.
              You will receive a confirmation email once your order is shipped.
            </p>
          </div>
        </div>

        {/* Delivery Time */}
        <div className="bg-white p-8 rounded-2xl shadow-sm flex gap-4">
          <Truck className="text-indigo-600 w-8 h-8 flex-shrink-0" />
          <div>
            <h2 className="text-2xl font-semibold mb-3">
              Delivery Timeline
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Standard delivery typically takes 3–7 business days depending
              on your location. Delivery times may vary during peak seasons.
            </p>
          </div>
        </div>

        {/* Tracking */}
        <div className="bg-white p-8 rounded-2xl shadow-sm flex gap-4">
          <Mail className="text-green-600 w-8 h-8 flex-shrink-0" />
          <div>
            <h2 className="text-2xl font-semibold mb-3">
              Order Tracking
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Once shipped, tracking details will be shared via email and
              SMS so you can monitor your package in real time.
            </p>
          </div>
        </div>

        {/* Coverage Section */}
        <div className="bg-white p-8 rounded-2xl shadow-sm flex gap-4">
          <MapPin className="text-rose-500 w-8 h-8 flex-shrink-0" />
          <div>
            <h2 className="text-2xl font-semibold mb-3">
              Delivery Coverage
            </h2>
            <p className="text-gray-600 leading-relaxed">
              We deliver across major cities and towns. Shipping charges,
              if applicable, are calculated at checkout based on your location.
            </p>
          </div>
        </div>

        {/* Delivery Steps */}
        <div className="bg-white p-8 rounded-2xl shadow-sm">
          <h2 className="text-2xl font-semibold mb-6 text-center">
            How Shipping Works
          </h2>

          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div>
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-3 font-bold">
                1
              </div>
              <p className="text-gray-600">
                Order confirmed and processed.
              </p>
            </div>

            <div>
              <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center mx-auto mb-3 font-bold">
                2
              </div>
              <p className="text-gray-600">
                Packed and handed to delivery partner.
              </p>
            </div>

            <div>
              <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-3 font-bold">
                3
              </div>
              <p className="text-gray-600">
                Delivered safely to your address.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Shipping;