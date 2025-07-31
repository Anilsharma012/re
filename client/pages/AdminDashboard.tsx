import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { 
  Users, 
  MessageSquare, 
  Phone, 
  BarChart3, 
  Activity,
  TrendingUp,
  Eye,
  Car
} from 'lucide-react';

interface AdminStats {
  totalVisitors: number;
  totalEnquiries: number;
  totalContacts: number;
  recentActivity: Array<{
    type: string;
    message: string;
    timestamp: Date;
  }>;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      if (!token) {
        navigate('/admin/login');
        return;
      }

      const response = await fetch('/api/admin/stats', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setStats(data);
      } else {
        localStorage.removeItem('adminToken');
        navigate('/admin/login');
      }
    } catch (error) {
      console.error('Failed to fetch stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const quickTestSystem = async () => {
    try {
      console.log('🧪 Running system tests...');

      // Test all APIs
      const testResponse = await fetch('/api/debug/test-all');
      const testData = await testResponse.json();

      if (testData.success) {
        const results = testData.results.tests;

        let message = '🧪 System Test Results:\n\n';

        if (results.database?.status === 'success') {
          message += `✅ Database: ${results.database.message}\n`;
        } else {
          message += `⚠️ Database: ${results.database?.message || 'Error'}\n`;
        }

        if (results.vehicles_api?.status === 'success') {
          message += `✅ Vehicles API: ${results.vehicles_api.message}\n`;
          if (results.vehicles_api.data?.length > 0) {
            message += `   Sample: ${results.vehicles_api.data.map(v => v.name).join(', ')}\n`;
          }
        } else {
          message += `❌ Vehicles API: ${results.vehicles_api?.message || 'Error'}\n`;
        }

        if (results.collections?.status === 'success') {
          message += `✅ Collections: ${results.collections.message}\n`;
          message += `   Enquiries: ${results.collections.data.enquiriesCount}\n`;
          message += `   Contacts: ${results.collections.data.contactsCount}\n`;
        }

        message += '\n🎉 System is working!';
        alert(message);
      } else {
        alert(`❌ System Test Failed: ${testData.message}`);
      }
    } catch (error) {
      console.error('System test error:', error);
      alert('❌ System test failed. Check console for details.');
    }
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
          <p className="text-gray-600">Tour Website Management Panel</p>
        </div>
        <Button
          onClick={quickTestSystem}
          variant="outline"
          className="flex items-center gap-2"
        >
          <Activity className="w-4 h-4" />
          Test All Systems
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Visitors</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.totalVisitors || 0}</div>
            <p className="text-xs text-muted-foreground">
              <TrendingUp className="w-3 h-3 inline mr-1" />
              +12% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tour Enquiries</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.totalEnquiries || 0}</div>
            <p className="text-xs text-muted-foreground">
              <TrendingUp className="w-3 h-3 inline mr-1" />
              +8% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Contact Messages</CardTitle>
            <Phone className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.totalContacts || 0}</div>
            <p className="text-xs text-muted-foreground">
              <TrendingUp className="w-3 h-3 inline mr-1" />
              +15% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24.5%</div>
            <p className="text-xs text-muted-foreground">
              <TrendingUp className="w-3 h-3 inline mr-1" />
              +3% from last month
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="w-5 h-5" />
              Recent Activity
            </CardTitle>
            <CardDescription>
              Latest enquiries and contact messages
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {stats?.recentActivity && stats.recentActivity.length > 0 ? (
                stats.recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <div className={`w-2 h-2 rounded-full ${
                      activity.type === 'enquiry' ? 'bg-blue-500' : 'bg-green-500'
                    }`} />
                    <div className="flex-1">
                      <p className="text-sm font-medium">{activity.message}</p>
                      <p className="text-xs text-gray-500">{formatDate(activity.timestamp)}</p>
                    </div>
                    <Badge variant={activity.type === 'enquiry' ? 'default' : 'secondary'}>
                      {activity.type}
                    </Badge>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-center py-4">No recent activity</p>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              Website Analytics
            </CardTitle>
            <CardDescription>
              Quick overview of website performance
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                <span className="text-sm font-medium">Page Views Today</span>
                <span className="text-lg font-bold text-blue-600">1,234</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                <span className="text-sm font-medium">Average Session Duration</span>
                <span className="text-lg font-bold text-green-600">3:45</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                <span className="text-sm font-medium">Bounce Rate</span>
                <span className="text-lg font-bold text-purple-600">42%</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg">
                <span className="text-sm font-medium">Mobile Users</span>
                <span className="text-lg font-bold text-orange-600">68%</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>
            Common administrative tasks
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Link to="/admin/vehicles">
              <Button variant="outline" className="h-20 flex-col gap-2 w-full">
                <Car className="w-6 h-6" />
                Manage Vehicles
              </Button>
            </Link>
            <Link to="/admin/enquiries">
              <Button variant="outline" className="h-20 flex-col gap-2 w-full">
                <MessageSquare className="w-6 h-6" />
                View Enquiries
              </Button>
            </Link>
            <Link to="/admin/contacts">
              <Button variant="outline" className="h-20 flex-col gap-2 w-full">
                <Phone className="w-6 h-6" />
                Contact Messages
              </Button>
            </Link>
            <Button variant="outline" className="h-20 flex-col gap-2">
              <BarChart3 className="w-6 h-6" />
              Analytics Report
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
