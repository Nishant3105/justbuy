import { Routes, Route, Navigate, useNavigate } from 'react-router-dom'
import MainLayout from '../layouts/Mainlayout'
import Home from '../pages/Home/Home'
import ProductDetails from '../pages/ProductDetails/ProductDetails'
import Categories from '../pages/Category/Categories'
import Cart from "../pages/Cart/Cart";
import NotFound from '../pages/NotFound/NotFound';
import ProfileForm from '../pages/Profile/ProfileForm'
import { adminRoutes } from "../admin/admin.routes";
import { useAuth } from '../context/AuthContext'
import MyOrders from '../pages/Order/MyOrders'
import FAQ from '../pages/Static Pages/Faqs';
import Terms from '../pages/Static Pages/Terms';
import Privacy from '../pages/Static Pages/Privacy';
import Shipping from '../pages/Static Pages/Shipping';
import About from '../pages/Static Pages/About';
import Contact from '../pages/Static Pages/Contact';
import Return from '../pages/Static Pages/Return';
import ScrollToTop from '../components/ScrollToTop'


const AppRoutes = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  return (
    <>
      <ScrollToTop />
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/product/:slug" element={<ProductDetails />} />
        <Route path="/categories" element={<Navigate to="/categories/grocery" replace />} />
        <Route path="/categories/:categorySlug" element={<Categories />} />
        <Route path="/cart" element={<Cart />} />
        <Route
          path="/profile"
          element={
            !loading ? (
              user ? (
                <ProfileForm
                  onCancel={() => navigate("/")}
                />
              ) : (
                <Navigate to="/login" replace />
              )
            ) : (
              <div>Loading...</div>
            )
          }
        />
        <Route path="/my-orders" element={<MyOrders />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/shipping" element={<Shipping />} />
        <Route path="/returns" element={<Return />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Route>
      {adminRoutes.map(({ path, element }) => (
        <Route key={path} path={path} element={element} />
      ))}
      <Route path="*" element={<NotFound />} />
    </Routes>
    </>
  )
}

export default AppRoutes
