import { Target, Eye, Heart } from "lucide-react";

const About = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      
      <div className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white py-20 px-6 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          About JustBuy
        </h1>
        <p className="max-w-2xl mx-auto text-lg md:text-xl opacity-90">
          We make online shopping seamless, affordable, and fast.
        </p>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-16 space-y-12 text-center">

        <p className="text-gray-700 text-lg md:text-xl leading-relaxed">
          JustBuy is a modern eCommerce platform designed to provide seamless
          shopping experiences. We focus on quality, affordability, and fast delivery.
        </p>

        <div className="grid md:grid-cols-3 gap-8 text-left">
          
          <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition flex flex-col items-start gap-4">
            <Target className="w-8 h-8 text-indigo-600" />
            <h2 className="text-xl font-semibold">Our Mission</h2>
            <p className="text-gray-600">
              To empower customers with easy access to products they love while ensuring affordability.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition flex flex-col items-start gap-4">
            <Eye className="w-8 h-8 text-blue-500" />
            <h2 className="text-xl font-semibold">Our Vision</h2>
            <p className="text-gray-600">
              To become the most trusted and convenient eCommerce platform in India.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition flex flex-col items-start gap-4">
            <Heart className="w-8 h-8 text-red-500" />
            <h2 className="text-xl font-semibold">Our Values</h2>
            <p className="text-gray-600">
              Customer-first, reliability, transparency, and sustainability.
            </p>
          </div>

        </div>

      </div>
    </div>
  );
};

export default About;