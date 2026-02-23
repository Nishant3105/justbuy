const Terms = () => {
  return (
    <div className="bg-gray-50 min-h-screen">

      <div className="bg-gradient-to-r from-gray-900 to-gray-700 text-white py-16 px-6 text-center">
        <h1 className="text-4xl font-bold mb-4">
          Terms & Conditions
        </h1>
        <p className="max-w-2xl mx-auto text-lg opacity-90">
          Please read these terms carefully before using our platform.
        </p>
        <p className="mt-4 text-sm opacity-70">
          Last Updated: January 2026
        </p>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-16 space-y-10">

        <div className="bg-white p-8 rounded-2xl shadow-sm">
          <p className="text-gray-700 leading-relaxed text-lg">
            By accessing and using our platform, you agree to comply with and
            be bound by the following Terms and Conditions. If you do not agree
            with any part of these terms, please discontinue use of the website.
          </p>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-sm">
          <h2 className="text-2xl font-semibold mb-4">
            1. Use of Website
          </h2>
          <p className="text-gray-600 leading-relaxed">
            You agree not to misuse the website, attempt unauthorized access,
            introduce malicious software, or engage in activities that disrupt
            or interfere with the platform’s services.
          </p>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-sm">
          <h2 className="text-2xl font-semibold mb-4">
            2. Pricing & Payments
          </h2>
          <p className="text-gray-600 leading-relaxed">
            All prices are listed in INR and are subject to change without
            prior notice. We reserve the right to correct pricing errors and
            update product information at any time.
          </p>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-sm">
          <h2 className="text-2xl font-semibold mb-4">
            3. Orders & Cancellations
          </h2>
          <p className="text-gray-600 leading-relaxed">
            We reserve the right to cancel or refuse any order due to stock
            unavailability, pricing errors, suspected fraud, or payment
            verification issues. Customers will be notified in such cases.
          </p>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-sm">
          <h2 className="text-2xl font-semibold mb-4">
            4. Limitation of Liability
          </h2>
          <p className="text-gray-600 leading-relaxed">
            We shall not be liable for any indirect, incidental, or
            consequential damages arising from the use of our platform,
            including but not limited to loss of data or profits.
          </p>
        </div>

        <div className="bg-gray-100 p-6 rounded-xl text-center text-gray-600 text-sm">
          Continued use of our platform constitutes acceptance of these terms.
        </div>

      </div>
    </div>
  );
};

export default Terms;