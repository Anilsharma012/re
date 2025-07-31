import { useState } from 'react';
import { Link, useLocation, useNavigate, Outlet } from 'react-router-dom';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { 
  LayoutDashboard, 
  Car, 
  MessageSquare, 
  Phone, 
  Users, 
  LogOut,
  Menu,
  X
} from 'lucide-react';

export function AdminLayout({ children }: { children?: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/admin/login');
  };

  const navigation = [
    { name: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'Vehicle Management', href: '/admin/vehicles', icon: Car },
    { name: 'Enquiries', href: '/admin/enquiries', icon: MessageSquare },
    { name: 'Contacts', href: '/admin/contacts', icon: Phone },
    { name: 'Users', href: '/admin/users', icon: Users },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="absolute inset-0 bg-gray-600 opacity-75" onClick={() => setSidebarOpen(false)} />
        </div>
      )}

      {/* Sidebar */}
      <div className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="flex items-center justify-between h-16 px-6 border-b">
          <h1 className="text-xl font-bold text-gray-900">Admin Panel</h1>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <nav className="mt-6 px-3">
          <div className="space-y-1">
            {navigation.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`
                    group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors
                    ${isActive
                      ? 'bg-blue-100 text-blue-700 border-r-2 border-blue-700'
                      : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                    }
                  `}
                  onClick={() => setSidebarOpen(false)}
                >
                  <item.icon className={`
                    mr-3 h-5 w-5 flex-shrink-0
                    ${isActive ? 'text-blue-500' : 'text-gray-400 group-hover:text-gray-500'}
                  `} />
                  {item.name}
                </Link>
              );
            })}
          </div>
        </nav>

        <div className="absolute bottom-0 w-full p-4">
          <Button 
            onClick={handleLogout} 
            variant="outline" 
            className="w-full flex items-center gap-2"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </Button>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 lg:ml-0">
        {/* Top bar */}
        <div className="bg-white shadow-sm border-b lg:hidden">
          <div className="flex items-center justify-between h-16 px-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
            >
              <Menu className="h-6 w-6" />
            </button>
            <h1 className="text-lg font-semibold text-gray-900">Admin Dashboard</h1>
            <div className="w-6" /> {/* Spacer */}
          </div>
        </div>

        {/* Page content */}
        <main className="flex-1">
          {children || <Outlet />}
        </main>
      </div>
    </div>
  );
}
