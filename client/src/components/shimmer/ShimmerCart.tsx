import { FaTrash } from "react-icons/fa";

const ShimmerCart = () => {
  return (
    <div className="max-w-6xl mx-auto p-4 space-y-6 animate-pulse">
      <div className="h-8 w-1/4 bg-gray-200 rounded mb-6"></div> 

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-4">
          {Array.from({ length: 3 }).map((_, idx) => (
            <div
              key={idx}
              className="flex gap-4 bg-white p-4 rounded-lg shadow"
            >
              <div className="w-24 h-24 bg-gray-200 rounded" />

              <div className="flex-1 space-y-2">
                <div className="h-4 w-3/4 bg-gray-200 rounded"></div>
                <div className="h-3 w-1/4 bg-gray-200 rounded"></div>

                <div className="flex items-center gap-3 mt-2">
                  <div className="h-6 w-6 bg-gray-200 rounded"></div>
                  <div className="h-4 w-4 bg-gray-200 rounded"></div>
                  <div className="h-6 w-6 bg-gray-200 rounded"></div>
                </div>
              </div>

              <div className="h-6 w-6 bg-gray-200 rounded self-start mt-2">
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white p-4 rounded-lg shadow h-fit space-y-4">
          <div className="h-6 w-1/2 bg-gray-200 rounded"></div>

          <div className="flex justify-between">
            <div className="h-4 w-1/4 bg-gray-200 rounded"></div>
            <div className="h-4 w-1/6 bg-gray-200 rounded"></div>
          </div>

          <div className="h-10 w-full bg-gray-200 rounded mt-4"></div>
          <div className="h-6 w-full bg-gray-200 rounded mt-2"></div>
        </div>
      </div>
    </div>
  );
};

export default ShimmerCart;
