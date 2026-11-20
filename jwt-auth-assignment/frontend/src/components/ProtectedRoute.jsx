import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// decides where to send a wrong-role user
function getDashboardForRole(role) {
  if (role === 'admin') return '/admin-dashboard';
  if (role === 'manager') return '/manager-dashboard';
  return '/user-dashboard';
}

function ProtectedRoute({ children, allowedRoles }) {
  const { user, token, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!token || !user) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    // send them to their own dashboard instead of showing a blank 403
    return <Navigate to={getDashboardForRole(user.role)} replace />;
  }

  return children;
}

export default ProtectedRoute;
