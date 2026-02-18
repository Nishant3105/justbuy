import { Routes, Route, Navigate } from 'react-router-dom'
import MainLayout from '../layouts/Mainlayout'
import Home from '../pages/Home/Home'
import About from '../pages/About/About'
import ProductDetails from '../pages/ProductDetails/ProductDetails'
import Categories from '../pages/Category/Categories'
import Cart from "../pages/Cart/Cart";
import NotFound from '../pages/NotFound/NotFound';
import ProfileForm from '../pages/Profile/ProfileForm'
import { adminRoutes } from "../admin/admin.routes";
import { useAuth } from '../context/AuthContext'
import MyOrders from '../pages/Order/MyOrders'


const AppRoutes = () => {
  const { user, loading  } = useAuth();
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
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
                  onCancel={() => console.log("Cancelled")}
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
      </Route>
      {adminRoutes.map(({ path, element }) => (
        <Route key={path} path={path} element={element} />
      ))}
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default AppRoutes
