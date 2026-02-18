import { Link } from "react-router-dom";
import Banner from '../../components/Banner'
import Offers from './Offers'
import ProductCategories from './ProductCategories'
import { useCategoryProducts } from "../../hooks/useCategoryProducts";

const Home = () => {
    const grocery = useCategoryProducts("Grocery");
    const bakery = useCategoryProducts("Bakery");
    const dairy = useCategoryProducts("Dairy");
    const beverages = useCategoryProducts("Beverages");
    const snacks = useCategoryProducts("Snacks");
    const fruitsnvegetables = useCategoryProducts("Fruits & Vegetables");
    const meatnseafood = useCategoryProducts("Meat & Seafood");
    const frozenfoods = useCategoryProducts("Frozen Foods");
    const personalcare = useCategoryProducts("Personal Care");
    const householdessentials = useCategoryProducts("Household Essentials");
    return (
        <>
            <Banner title="Everything You Need, Delivered Fast"
                subtitle="Discover top-quality products with exclusive deals and lightning-fast delivery."
                backgroundImage="Banner.png" />
            <Offers />
            <div className="space-y-8">
                <ProductCategories
                    title="Grocery"
                    categorySlug="grocery"
                    products={
                        grocery.data?.map((p) => ({
                            _id: p._id,
                            slug: p.slug,
                            title: p.name,
                            image: p.mainImage ?? "",
                            price: p.sellingPrice
                        })) || []
                    }
                    loading={grocery.isLoading}
                />
                <ProductCategories
                    title="Bakery"
                    categorySlug="bakery"
                    products={
                        bakery.data?.map((p) => ({
                            _id: p._id,
                            slug: p.slug,
                            title: p.name,
                            image: p.mainImage ?? "",
                            price: p.sellingPrice
                        })) || []
                    }
                    loading={bakery.isLoading}
                />
                <ProductCategories
                    title="Beverages"
                    categorySlug="beverages"
                    products={
                        beverages.data?.map((p) => ({
                            _id: p._id,
                            slug: p.slug,
                            title: p.name,
                            image: p.mainImage ?? "",
                            price: p.sellingPrice
                        })) || []
                    }
                    loading={beverages.isLoading}
                />
                <ProductCategories
                    title="Dairy Products"
                    categorySlug="dairy"
                    products={
                        dairy.data?.map((p) => ({
                            _id: p._id,
                            slug: p.slug,
                            title: p.name,
                            image: p.mainImage ?? "",
                            price: p.sellingPrice
                        })) || []
                    }
                    loading={dairy.isLoading}
                />
                <ProductCategories
                    title="Snacks"
                    categorySlug="snacks"
                    products={
                        snacks.data?.map((p) => ({
                            _id: p._id,
                            slug: p.slug,
                            title: p.name,
                            image: p.mainImage ?? "",
                            price: p.sellingPrice
                        })) || []
                    }
                    loading={snacks.isLoading}
                />
                <ProductCategories
                    title="Fruits and Vegetables"
                    categorySlug="fruits-and-vegetables"
                    products={
                        fruitsnvegetables.data?.map((p) => ({
                            _id: p._id,
                            slug: p.slug,
                            title: p.name,
                            image: p.mainImage ?? "",
                            price: p.sellingPrice
                        })) || []
                    }
                    loading={fruitsnvegetables.isLoading}
                />
                <ProductCategories
                    title="Meat and Seafood"
                    categorySlug="meat-and-seafood"
                    products={
                        meatnseafood.data?.map((p) => ({
                            _id: p._id,
                            slug: p.slug,
                            title: p.name,
                            image: p.mainImage ?? "",
                            price: p.sellingPrice
                        })) || []
                    }
                    loading={meatnseafood.isLoading}
                />
                <ProductCategories
                    title="Frozen Foods"
                    categorySlug="frozen-foods"
                    products={
                        frozenfoods.data?.map((p) => ({
                            _id: p._id,
                            slug: p.slug,
                            title: p.name,
                            image: p.mainImage ?? "",
                            price: p.sellingPrice
                        })) || []
                    }
                    loading={frozenfoods.isLoading}
                />
                <ProductCategories
                    title="Personal Care"
                    categorySlug="personal-care"
                    products={
                        personalcare.data?.map((p) => ({
                            _id: p._id,
                            slug: p.slug,
                            title: p.name,
                            image: p.mainImage ?? "",
                            price: p.sellingPrice
                        })) || []
                    }
                    loading={personalcare.isLoading}
                />
                <ProductCategories
                    title="Household Essentials"
                    categorySlug="household-essentials"
                    products={
                        householdessentials.data?.map((p) => ({
                            _id: p._id,
                            slug: p.slug,
                            title: p.name,
                            image: p.mainImage ?? "",
                            price: p.sellingPrice
                        })) || []
                    }
                    loading={householdessentials.isLoading}
                />
            </div>
        </>
    )
}

export default Home
