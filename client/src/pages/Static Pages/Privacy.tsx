const Privacy = () => {
  return (
    <div className="bg-gray-50 min-h-screen">

      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-16 px-6 text-center">
        <h1 className="text-4xl font-bold mb-4">Privacy Policy</h1>
        <p className="max-w-2xl mx-auto text-lg opacity-90">
          Your privacy matters to us. Learn how we collect, use, and protect
          your information.
        </p>
        <p className="mt-4 text-sm opacity-80">
          Last Updated: January 2026
        </p>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-16 space-y-10">

        <div className="bg-white p-8 rounded-2xl shadow-sm">
          <p className="text-gray-700 leading-relaxed text-lg">
            We are committed to safeguarding your personal data. This Privacy
            Policy explains how we collect, use, disclose, and protect your
            information when you use our platform.
          </p>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-sm">
          <h2 className="text-2xl font-semibold mb-4">
            1. Information We Collect
          </h2>
          <ul className="list-disc pl-6 space-y-2 text-gray-600 leading-relaxed">
            <li>Name and contact details (email, phone number)</li>
            <li>Shipping and billing addresses</li>
            <li>Payment details (processed securely via third parties)</li>
            <li>Order history and preferences</li>
          </ul>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-sm">
          <h2 className="text-2xl font-semibold mb-4">
            2. How We Use Your Data
          </h2>
          <ul className="list-disc pl-6 space-y-2 text-gray-600 leading-relaxed">
            <li>To process and deliver your orders</li>
            <li>To improve our products and services</li>
            <li>To communicate updates and offers (with your consent)</li>
            <li>To prevent fraud and enhance security</li>
          </ul>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-sm">
          <h2 className="text-2xl font-semibold mb-4">
            3. Data Protection
          </h2>
          <p className="text-gray-600 leading-relaxed">
            We implement industry-standard security measures including
            encryption, secure servers, and restricted access to protect
            your personal information from unauthorized access, alteration,
            or disclosure.
          </p>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-sm">
          <h2 className="text-2xl font-semibold mb-4">
            4. Your Rights
          </h2>
          <p className="text-gray-600 leading-relaxed">
            You have the right to access, update, or request deletion of your
            personal data. You may also opt out of marketing communications at
            any time.
          </p>
        </div>

      </div>
    </div>
  );
};

export default Privacy;