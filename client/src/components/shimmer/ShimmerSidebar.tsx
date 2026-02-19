const ShimmerSidebar = ({ count = 10 }) => {
  return (
    <aside className="w-64 bg-white border-r p-4 hidden md:block animate-pulse">
      <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>

      <ul className="space-y-2">
        {Array.from({ length: count }).map((_, i) => (
          <li
            key={i}
            className="h-8 bg-gray-200 rounded w-full"
          />
        ))}
      </ul>
    </aside>
  );
};

export default ShimmerSidebar;
