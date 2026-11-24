import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const RouteGuard = ({ children, needsProfile = false }) => {
  const { user } = useAuth()

  if (!user) return <Navigate to="/signup" replace />
  if (needsProfile && !user.profileComplete) return <Navigate to="/profile-setup" replace />
  if (!needsProfile && user.profileComplete) return <Navigate to="/dashboard" replace />

  return children
}

export default RouteGuard