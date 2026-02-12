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
            <Banner title="Welcome Home"
                subtitle="Build fast with React & Tailwind"
                backgroundImage="/images/home-banner.jpg" />
            <Offers />
            <div className="space-y-8">
                <ProductCategories
                    title="Grocery"
                    products={
                        grocery.data?.map((p) => ({
                            slug: p.slug,
                            title: p.name,
                            image: p.mainImage,
                            price: p.sellingPrice
                        })) || []
                    }
                    loading={grocery.isLoading}
                />
                <ProductCategories
                    title="Bakery"
                    products={
                        bakery.data?.map((p) => ({
                            slug: p.slug,
                            title: p.name,
                            image: p.mainImage,
                            price: p.sellingPrice
                        })) || []
                    }
                    loading={bakery.isLoading}
                />
                <ProductCategories
                    title="Beverages"
                    products={
                        beverages.data?.map((p) => ({
                            slug: p.slug,
                            title: p.name,
                            image: p.mainImage,
                            price: p.sellingPrice
                        })) || []
                    }
                    loading={beverages.isLoading}
                />
                <ProductCategories
                    title="Dairy Products"
                    products={
                        dairy.data?.map((p) => ({
                            slug: p.slug,
                            title: p.name,
                            image: p.mainImage,
                            price: p.sellingPrice
                        })) || []
                    }
                    loading={dairy.isLoading}
                />
                <ProductCategories
                    title="Snacks"
                    products={
                        snacks.data?.map((p) => ({
                            slug: p.slug,
                            title: p.name,
                            image: p.mainImage,
                            price: p.sellingPrice
                        })) || []
                    }
                    loading={snacks.isLoading}
                />
                <ProductCategories
                    title="Fruits and Vegetables"
                    products={
                        fruitsnvegetables.data?.map((p) => ({
                            slug: p.slug,
                            title: p.name,
                            image: p.mainImage,
                            price: p.sellingPrice
                        })) || []
                    }
                    loading={fruitsnvegetables.isLoading}
                />
                <ProductCategories
                    title="Meat and Seafood"
                    products={
                        meatnseafood.data?.map((p) => ({
                            slug: p.slug,
                            title: p.name,
                            image: p.mainImage,
                            price: p.sellingPrice
                        })) || []
                    }
                    loading={meatnseafood.isLoading}
                />
                <ProductCategories
                    title="Frozen Foods"
                    products={
                        frozenfoods.data?.map((p) => ({
                            slug: p.slug,
                            title: p.name,
                            image: p.mainImage,
                            price: p.sellingPrice
                        })) || []
                    }
                    loading={frozenfoods.isLoading}
                />
                <ProductCategories
                    title="Personal Care"
                    products={
                        personalcare.data?.map((p) => ({
                            slug: p.slug,
                            title: p.name,
                            image: p.mainImage,
                            price: p.sellingPrice
                        })) || []
                    }
                    loading={personalcare.isLoading}
                />
                <ProductCategories
                    title="Household Essentials"
                    products={
                        householdessentials.data?.map((p) => ({
                            slug: p.slug,
                            title: p.name,
                            image: p.mainImage,
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
