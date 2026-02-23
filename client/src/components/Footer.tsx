import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-12">
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-4 gap-8">

        <div>
          <h2 className="text-xl font-bold text-white mb-4">
            JustBuy
          </h2>
          <p className="text-sm text-gray-400">
            Your trusted online shopping destination for quality
            products at affordable prices.
          </p>
        </div>

        <div>
          <h3 className="text-white font-semibold mb-4">
            Company
          </h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/about" className="hover:text-white">
                About Us
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-white">
                Contact Us
              </Link>
            </li>
            <li>
              <Link to="/faq" className="hover:text-white">
                FAQ
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-white font-semibold mb-4">
            Policies
          </h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/terms" className="hover:text-white">
                Terms & Conditions
              </Link>
            </li>
            <li>
              <Link to="/privacy" className="hover:text-white">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link to="/returns" className="hover:text-white">
                Returns & Refunds
              </Link>
            </li>
            <li>
              <Link to="/shipping" className="hover:text-white">
                Shipping & Delivery
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-white font-semibold mb-4">
            Get in Touch
          </h3>
          <p className="text-sm">Email: support@justbuy.com</p>
          <p className="text-sm">Phone: +91 9876543210</p>
          <p className="text-sm">Gurgaon, India</p>
        </div>

      </div>

      <div className="border-t border-gray-700 text-center py-4 text-sm text-gray-400">
        © {new Date().getFullYear()} JustBuy. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
