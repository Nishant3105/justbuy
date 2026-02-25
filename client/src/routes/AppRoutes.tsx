import { lazy, Suspense } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom'
import MainLayout from '../layouts/Mainlayout';
import Home from '../pages/Home/Home';
import ProductDetails from '../pages/ProductDetails/ProductDetails'
import Categories from '../pages/Category/Categories'
import Cart from "../pages/Cart/Cart";
import NotFound from '../pages/NotFound/NotFound';
import { adminRoutes } from "../admin/admin.routes";
import { useAuth } from '../context/AuthContext'
import MyOrders from '../pages/Order/MyOrders'
import ScrollToTop from '../components/ScrollToTop'

const ProfileForm = lazy(() => import('../pages/Profile/ProfileForm'));
const FAQ = lazy(() => import('../pages/Static Pages/Faqs'));
const Terms = lazy(() => import('../pages/Static Pages/Terms'));
const Privacy = lazy(() => import('../pages/Static Pages/Privacy'));
const Shipping = lazy(() => import('../pages/Static Pages/Shipping'));
const About = lazy(() => import('../pages/Static Pages/About'));
const Contact = lazy(() => import('../pages/Static Pages/Contact'));
const Return = lazy(() => import('../pages/Static Pages/Return'));


const LazyLoadFallback = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="text-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
      <p className="text-gray-600">Loading...</p>
    </div>
  </div>
);


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
                <Suspense fallback={<LazyLoadFallback />}>
                  <ProfileForm
                    onCancel={() => navigate("/")}
                  />
                </Suspense>
              ) : (
                <Navigate to="/login" replace />
              )
            ) : (
              <LazyLoadFallback />
            )
          }
        />
        <Route path="/my-orders" element={<MyOrders />} />
        <Route path="/faq" element={
          <Suspense fallback={<LazyLoadFallback />}>
            <FAQ />
          </Suspense>
        } />
        <Route path="/terms" element={
          <Suspense fallback={<LazyLoadFallback />}>
            <Terms />
          </Suspense>
        } />
        <Route path="/privacy" element={
          <Suspense fallback={<LazyLoadFallback />}>
            <Privacy />
          </Suspense>
        } />
        <Route path="/shipping" element={
          <Suspense fallback={<LazyLoadFallback />}>
            <Shipping />
          </Suspense>
        } />
        <Route path="/returns" element={
          <Suspense fallback={<LazyLoadFallback />}>
            <Return />
          </Suspense>
        } />
        <Route path="/about" element={
          <Suspense fallback={<LazyLoadFallback />}>
            <About />
          </Suspense>
        } />
        <Route path="/contact" element={
          <Suspense fallback={<LazyLoadFallback />}>
            <Contact />
          </Suspense>
        } />
      </Route>
      {adminRoutes.map(({ path, element }) => (
        <Route key={path} path={path} element={
          <Suspense fallback={<LazyLoadFallback />}>
            {element}
          </Suspense>
        } />
      ))}
      <Route path="*" element={<NotFound />} />
    </Routes>
    </>
  )
}

export default AppRoutes
