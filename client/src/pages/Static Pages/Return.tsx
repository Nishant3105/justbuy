import { RotateCcw, PackageCheck, CreditCard } from "lucide-react";

const Returns = () => {
  return (
    <div className="bg-gray-50 min-h-screen">

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-rose-500 to-orange-500 text-white py-16 px-6 text-center">
        <h1 className="text-4xl font-bold mb-4">
          Returns & Refund Policy
        </h1>
        <p className="max-w-2xl mx-auto text-lg opacity-90">
          We want you to shop with confidence. Here’s everything you need to
          know about returns and refunds.
        </p>
      </div>

      {/* Content Section */}
      <div className="max-w-4xl mx-auto px-6 py-16 space-y-10">

        {/* Return Window */}
        <div className="bg-white p-8 rounded-2xl shadow-sm flex gap-4">
          <RotateCcw className="text-rose-500 w-8 h-8 flex-shrink-0" />
          <div>
            <h2 className="text-2xl font-semibold mb-3">
              7-Day Return Window
            </h2>
            <p className="text-gray-600 leading-relaxed">
              You may request a return within 7 days of receiving your order.
              After this period, returns may not be accepted.
            </p>
          </div>
        </div>

        {/* Eligibility */}
        <div className="bg-white p-8 rounded-2xl shadow-sm flex gap-4">
          <PackageCheck className="text-orange-500 w-8 h-8 flex-shrink-0" />
          <div>
            <h2 className="text-2xl font-semibold mb-3">
              Return Eligibility
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Items must be unused, in original packaging, and in the same
              condition that you received them. Certain products like
              perishable goods or personal care items may not be eligible.
            </p>
          </div>
        </div>

        {/* Refund Process */}
        <div className="bg-white p-8 rounded-2xl shadow-sm flex gap-4">
          <CreditCard className="text-green-500 w-8 h-8 flex-shrink-0" />
          <div>
            <h2 className="text-2xl font-semibold mb-3">
              Refund Process
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Once your return is received and inspected, we will notify you
              about the approval status. Approved refunds are processed within
              5–7 business days to your original payment method.
            </p>
          </div>
        </div>

        {/* Process Steps */}
        <div className="bg-white p-8 rounded-2xl shadow-sm">
          <h2 className="text-2xl font-semibold mb-6 text-center">
            How It Works
          </h2>

          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div>
              <div className="w-12 h-12 bg-rose-100 text-rose-600 rounded-full flex items-center justify-center mx-auto mb-3 font-bold">
                1
              </div>
              <p className="text-gray-600">
                Submit a return request from your account.
              </p>
            </div>

            <div>
              <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center mx-auto mb-3 font-bold">
                2
              </div>
              <p className="text-gray-600">
                Ship the item back after approval.
              </p>
            </div>

            <div>
              <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-3 font-bold">
                3
              </div>
              <p className="text-gray-600">
                Receive your refund within 5–7 days.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Returns;