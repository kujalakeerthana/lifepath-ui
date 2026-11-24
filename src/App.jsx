import { Routes, Route, Navigate } from 'react-router-dom'
import MainLayout from './Mainlayout'
import Section1 from './components/section1/section1'
import Section2 from './components/section2/section2'
import Section3 from './components/section3/section3'
import Section4 from './components/section4/section4'
import About from './pages/landingpage/about/about'
import Explore from './pages/landingpage/explore/explore'
import HowItWorks from './pages/landingpage/how it works/howitwork'
import GetStarted from './pages/signin&get started/getstarted'
import Signin from './pages/signin&get started/signin'
import RouteGuard from './context/routeguard'
import Input from './pages/onborading/initialdata'
import Dashboard from './pages/dashboard/dashboardcontent/home'
import DashboardLayout from './pages/dashboard/dashboardcontent/layout'
import Recommendations from "./pages/dashboard/maincontent/recommendation";
import ExploreOpportunities from "./pages/dashboard/exploreopp/exploreopp";

const PagePlaceholder = ({ title }) => (
  <section className="rounded-2xl bg-white p-8 shadow-sm">
    <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
    <p className="mt-2 text-gray-600">This section is coming soon.</p>
  </section>
)

const App = () => {
  return (
    <Routes>

      <Route element={<MainLayout />}>
        <Route
          path="/"
          element={<><Section1 /><Section2 /><Section3 /><Section4 /></>}
        />
        <Route path="/about" element={<About />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/how-it-works" element={<HowItWorks />} />
      </Route>
      <Route path="/GetStarted" element={<Navigate to="/get-started" replace />} />
      <Route path="/get-started" element={<GetStarted />} />
      <Route path="/signin" element={<Signin />} />
      <Route path="/login" element={<Signin />} />
      <Route path="/signup" element={<GetStarted />} />
      <Route path="/profile-setup" element={<RouteGuard><Input /></RouteGuard>} />
      <Route
        path="/dashboard"
        element={<RouteGuard needsProfile><DashboardLayout /></RouteGuard>}
      >
        <Route index element={<Dashboard />} />
        <Route path="saved" element={<PagePlaceholder title="Saved Opportunities" />} />
        <Route path="profile" element={<PagePlaceholder title="My Profile" />} />
        <Route path="settings" element={<PagePlaceholder title="Settings" />} />
        <Route path="recommendations" element={<Recommendations />} />
        <Route path="explore-opportunities" element={<ExploreOpportunities />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App