import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen w-full">
      <Navbar />
      <main className="w-full min-h-[calc(100vh-80px-80px)]">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default MainLayout
