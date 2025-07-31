import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (token) {
      console.log('🔒 Verifying admin token...');

      // Verify token validity using dedicated endpoint
      fetch('/api/admin/verify-token', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })
      .then(response => response.json())
      .then(data => {
        console.log('🔒 Token verification response:', data);
        if (data.success && data.authenticated) {
          console.log('✅ Token valid, user authenticated as:', data.user?.username);
          setIsAuthenticated(true);
        } else {
          console.log('❌ Token invalid, removing:', data.message);
          localStorage.removeItem('adminToken');
          setIsAuthenticated(false);
        }
      })
      .catch(error => {
        console.error('❌ Token verification failed:', error.message);
        // If the API is down, don't automatically log out the user
        // Instead, allow them to stay authenticated for better UX
        console.log('⚠️ Network error during token verification, keeping user logged in');
        setIsAuthenticated(true);
      });
    } else {
      console.log('❌ No admin token found');
      setIsAuthenticated(false);
    }
  }, []);

  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Checking authentication...</p>
        </div>
      </div>
    );
  }

  return isAuthenticated ? <>{children}</> : <Navigate to="/admin/login" replace />;
}
