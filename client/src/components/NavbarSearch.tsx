import { useState, useRef, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDebounce } from "../hooks/useDebounce";
import { useLiveSearch } from "../hooks/useLiveSearch";

export default function NavbarSearch() {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const debounced = useDebounce(query, 300);
  const navigate = useNavigate();
  const boxRef = useRef<HTMLDivElement>(null);

  const { data, isFetching } = useLiveSearch(debounced);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  return (
    <div ref={boxRef} className="relative w-full max-w-md">
      <input
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setOpen(true);
        }}
        placeholder="Search products…"
        className=" w-full
                    h-10
                    px-4
                    border
                    border-gray-300
                    rounded-lg
                    bg-white
                    text-gray-900
                    outline-none
                    focus:ring-2
                    focus:ring-blue-500
                  "

        onKeyDown={e => {
          if (e.key === "Enter") {
            navigate(`/search?q=${query}`);
          }
        }}
      />

      {/* Dropdown */}
      {open && query.length >= 2 && (
        <div className="absolute top-full mt-2 w-full bg-white shadow-lg rounded-lg z-50">
          {isFetching && (
            <div className="p-4 text-sm text-gray-500">Searching…</div>
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
              className="flex items-center gap-3 px-4 py-2 hover:bg-gray-100 cursor-pointer"
            >
              {/* <img
                src={item.thumbnail}
                className="w-10 h-10 object-contain"
              /> */}
              <span className="text-sm text-gray-500">{item.name}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
