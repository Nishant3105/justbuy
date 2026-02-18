import { useParams, useNavigate  } from "react-router-dom";
import { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar";
import ProductGrid from "../../components/ProductGrid";
import { useCategoryProducts } from "../../hooks/useCategoryProducts";
import { CATEGORIES } from "../../constants/categories";

const CategoryPage = () => {
  const { categorySlug } = useParams();
  const navigate = useNavigate();

  const category = CATEGORIES.find(
    (c) => c.slug === categorySlug
  );

  const { data, isLoading } = useCategoryProducts(
    category?.name || ""
  );

  useEffect(() => {
    if (!category) {
      navigate("/categories/grocery", { replace: true });
    }
  }, [category, navigate]);

  if (!category) return null;


  return (
    <div className="flex">
      <Sidebar
        categories={CATEGORIES}
        selectedSlug={category.slug}
      />

      <main className="flex-1 p-6">
        <ProductGrid products={data || []}
          loading={isLoading} />
      </main>
    </div>
  );
};

export default CategoryPage;
