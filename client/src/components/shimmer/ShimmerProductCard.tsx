const ShimmerProductCard = () => {
  return (
    <div className="relative rounded-xl overflow-hidden shadow-md p-4 animate-pulse">
      {/* Image */}
      <div className="h-48 w-full bg-gray-200 rounded mb-4 relative overflow-hidden">
        <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/50 to-transparent" />
      </div>

      {/* Title */}
      <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>

      {/* Price */}
      <div className="h-4 bg-gray-200 rounded w-1/4"></div>
    </div>
  );
};

export default ShimmerProductCard;
