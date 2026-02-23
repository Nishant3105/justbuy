import { Mail, Phone, MapPin } from "lucide-react";

const Contact = () => {
  return (
    <div className="bg-gray-50 min-h-screen">

      <div className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white py-16 px-6 text-center">
        <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
        <p className="max-w-2xl mx-auto text-lg opacity-90">
          We’re here to help! Reach out to us with any questions or concerns.
        </p>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-12">

        <div className="space-y-6">

          <div className="bg-white p-6 rounded-2xl shadow-sm flex gap-4 items-start">
            <Mail className="text-indigo-600 w-6 h-6 mt-1" />
            <div>
              <h3 className="font-semibold text-lg">Email</h3>
              <p className="text-gray-600">support@justbuy.com</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm flex gap-4 items-start">
            <Phone className="text-green-600 w-6 h-6 mt-1" />
            <div>
              <h3 className="font-semibold text-lg">Phone</h3>
              <p className="text-gray-600">+91 9876543210</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm flex gap-4 items-start">
            <MapPin className="text-rose-500 w-6 h-6 mt-1" />
            <div>
              <h3 className="font-semibold text-lg">Address</h3>
              <p className="text-gray-600">
                Gurgaon, Haryana, India
              </p>
            </div>
          </div>

        </div>

        <div className="bg-white p-8 rounded-2xl shadow-sm">
          <h2 className="text-2xl font-semibold mb-6">
            Send us a Message
          </h2>

          <form className="space-y-5">
            <div>
              <label className="block text-sm mb-2 font-medium">
                Full Name
              </label>
              <input
                type="text"
                placeholder="Your name"
                className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm mb-2 font-medium">
                Email
              </label>
              <input
                type="email"
                placeholder="Your email"
                className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm mb-2 font-medium">
                Message
              </label>
              <textarea
                rows={4}
                placeholder="Your message"
                className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition"
            >
              Send Message
            </button>
          </form>
        </div>

      </div>
    </div>
  );
};

export default Contact;