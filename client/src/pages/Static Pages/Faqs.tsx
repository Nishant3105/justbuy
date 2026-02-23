import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqData = [
  {
    question: "How do I place an order?",
    answer:
      "Browse products, add them to your cart, and proceed to checkout. Complete payment securely to confirm your order.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept UPI, debit/credit cards, net banking, and popular wallets.",
  },
  {
    question: "Can I cancel my order?",
    answer:
      "Orders can be canceled before they are shipped. Once shipped, cancellation is not possible.",
  },
  {
    question: "How long does delivery take?",
    answer:
      "Delivery typically takes 3–7 business days depending on your location.",
  },
];

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-bold text-center mb-12">
        Frequently Asked Questions
      </h1>

      <div className="space-y-4">
        {faqData.map((item, index) => {
          const isOpen = activeIndex === index;

          return (
            <div
              key={index}
              className="border border-gray-200 rounded-xl shadow-sm bg-white transition-all duration-300"
            >
              <button
                onClick={() => toggle(index)}
                className="w-full flex justify-between items-center p-5 text-left"
              >
                <span className="font-semibold text-lg">
                  {item.question}
                </span>

                <ChevronDown
                  className={`transition-transform duration-300 ${
                    isOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              <div
                className={`overflow-hidden transition-all duration-300 ${
                  isOpen ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <p className="px-5 pb-5 text-gray-600 leading-relaxed">
                  {item.answer}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FAQ;