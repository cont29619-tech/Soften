import { Outlet, useNavigate } from 'react-router-dom'
import Navbar from './Navbar.jsx'
import Footer from './Footer.jsx'
import DisclaimerBanner from './DisclaimerBanner.jsx'

export default function Layout() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen flex flex-col bg-bg">
      <DisclaimerBanner />
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
