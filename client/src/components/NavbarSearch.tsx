import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDebounce } from "../hooks/useDebounce";
import { FaSearch } from "react-icons/fa";
import { useLiveSearch } from "../hooks/useLiveSearch";

export default function NavbarSearch() {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const debounced = useDebounce(query, 300);
  const navigate = useNavigate();
  const boxRef = useRef<HTMLDivElement>(null);

  const { data, isFetching } = useLiveSearch(debounced);

  const phrases = ["Search products…", "Search by brand…", "Search by category…"];
  const [placeholder, setPlaceholder] = useState(phrases[0]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % phrases.length);
      setPlaceholder(phrases[index]);
    }, 2000); 
    return () => clearInterval(interval);
  }, [index]);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  useEffect(() => {
  const handleClickOutside = (e: any) => {
    if (boxRef.current && !boxRef.current.contains(e.target)) {
      setOpen(false);
    }
  };

  document.addEventListener("click", handleClickOutside);

  return () => {
    document.removeEventListener("click", handleClickOutside);
  };
}, []);


  return (
    <div ref={boxRef} className="relative w-full max-w-md">
    <input
      value={query}
      onChange={(e) => {
        setQuery(e.target.value);
        setOpen(true);
      }}
      onFocus={() => setOpen(true)}
      placeholder={placeholder}
      className="w-full h-10 px-4
                 border border-gray-300
                 rounded-lg
                 bg-white text-gray-900
                 outline-none
                 focus:ring-2 focus:ring-blue-500
                 transition-all duration-300 ease-in-out
                 focus:shadow-lg"
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          navigate(`/search?q=${query}`);
          setOpen(false);
        }
      }}
    />

    <FaSearch className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />

      <div
        className={`
          absolute top-full mt-2 w-full bg-white shadow-lg rounded-lg z-50
          transform transition-all duration-200 ease-out origin-top
          ${open && query.length >= 2
                ? "opacity-100 scale-y-100 translate-y-0"
                : "opacity-0 scale-y-95 -translate-y-2 pointer-events-none"
          }
        `}
      >

        {isFetching && (
          <div className="p-4 text-sm text-gray-500 animate-pulse">
            Searching…
          </div>
        )}

        {data?.length === 0 && !isFetching && (
          <div className="p-4 text-sm text-gray-500">
            No results found
          </div>
        )}

        {data?.map((item: any) => (
          <div
            key={item._id}
            onClick={() => {
              navigate(`/product/${item.slug}`);
              setOpen(false);
            }}
            className="
          flex items-center gap-3 px-4 py-2
          hover:bg-blue-50
          cursor-pointer
          transition-colors duration-150
        "
          >
            {/* 
        <img
          src={item.thumbnail}
          className="w-10 h-10 object-contain"
        /> 
        */}

            <span className="text-sm text-gray-700">
              {item.name}
            </span>
          </div>
        ))}

      </div>

    </div>

  );
}
