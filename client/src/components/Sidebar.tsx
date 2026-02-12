import { useNavigate } from "react-router-dom";

type Category = {
  id: number;
  name: string;
  slug: string;
};

type Props = {
  categories: Category[];
  selectedSlug: string;
};

const CategorySidebar: React.FC<Props> = ({
  categories,
  selectedSlug
}) => {
  const navigate = useNavigate();

  return (
    <aside className="w-64 bg-white border-r p-4 hidden md:block">
      <h2 className="text-lg font-semibold mb-4">Categories</h2>

      <ul className="space-y-2">
        {categories.map((cat) => (
          <li
            key={cat.slug}
            onClick={() => navigate(`/categories/${cat.slug}`)}
            className={`cursor-pointer rounded-lg px-3 py-2 transition
              ${selectedSlug === cat.slug
                ? "bg-black text-white"
                : "hover:bg-gray-100 text-gray-700"
              }`}
          >
            {cat.name}
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default CategorySidebar;
