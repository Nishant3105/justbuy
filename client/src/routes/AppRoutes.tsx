import { Routes, Route, Navigate } from 'react-router-dom'
import MainLayout from '../layouts/Mainlayout'
import Home from '../pages/Home/Home'
import About from '../pages/About/About'
import ProductDetails from '../pages/ProductDetails/ProductDetails'
import Categories from '../pages/Category/Categories'
import Cart from "../pages/Cart/Cart";
import NotFound from '../pages/NotFound/NotFound'
import { adminRoutes } from "../admin/admin.routes";

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/product/:slug" element={<ProductDetails />} />
        <Route path="/categories" element={<Navigate to="/categories/grocery" replace />}/>
        <Route path="/categories/:categorySlug" element={<Categories />}/>
        <Route path="/cart" element={<Cart />} />
      </Route>
      {adminRoutes.map(({ path, element }) => (
        <Route key={path} path={path} element={element} />
      ))}
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default AppRoutes
