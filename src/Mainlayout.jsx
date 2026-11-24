import { Outlet } from 'react-router-dom'
import Navbar from './components/section1/navbar'
import Footer from './components/section1/footer'

const MainLayout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  )
}

export default MainLayout