import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { LoginForm } from './components/Auth/LoginForm';
import { Navbar } from './components/Layout/Navbar';
import { Sidebar } from './components/Layout/Sidebar';
import { DashboardStats } from './components/Dashboard/DashboardStats';
import { OrdersTable } from './components/Orders/OrdersTable';
import { apiService } from './services/api';
import { Order, DashboardStats as Stats } from './types';
import { Loader2, Plus } from 'lucide-react';

const Dashboard: React.FC = () => {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStats = async () => {
      try {
        const dashboardStats = await apiService.getDashboardStats();
        setStats(dashboardStats);
      } catch (error) {
        console.error('Error loading dashboard stats:', error);
      } finally {
        setLoading(false);
      }
    };

    loadStats();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="animate-spin text-blue-600" size={32} />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {stats && <DashboardStats stats={stats} />}
      
      <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Recent Activity</h2>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
            <Plus size={16} />
            <span>New Order</span>
          </button>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center space-x-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
            <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
            <div>
              <p className="text-sm font-medium text-gray-900">New order #1247 received</p>
              <p className="text-xs text-gray-600">2 minutes ago</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4 p-3 bg-green-50 rounded-lg border border-green-200">
            <div className="w-2 h-2 bg-green-600 rounded-full"></div>
            <div>
              <p className="text-sm font-medium text-gray-900">Order #1245 shipped</p>
              <p className="text-xs text-gray-600">15 minutes ago</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4 p-3 bg-purple-50 rounded-lg border border-purple-200">
            <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
            <div>
              <p className="text-sm font-medium text-gray-900">Order #1243 delivered</p>
              <p className="text-xs text-gray-600">1 hour ago</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Orders: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadOrders = async () => {
      try {
        const ordersData = await apiService.getOrders();
        setOrders(ordersData);
      } catch (error) {
        console.error('Error loading orders:', error);
      } finally {
        setLoading(false);
      }
    };

    loadOrders();
  }, []);

  const handleViewOrder = (order: Order) => {
    console.log('View order:', order);
  };

  const handleEditOrder = (order: Order) => {
    console.log('Edit order:', order);
  };

  const handleDeleteOrder = (orderId: string) => {
    if (confirm('Are you sure you want to delete this order?')) {
      setOrders(orders.filter(order => order.id !== orderId));
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="animate-spin text-blue-600" size={32} />
      </div>
    );
  }

  return (
    <OrdersTable
      orders={orders}
      onViewOrder={handleViewOrder}
      onEditOrder={handleEditOrder}
      onDeleteOrder={handleDeleteOrder}
    />
  );
};

const MainApp: React.FC = () => {
  const { user, token } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');

  // Initialize user from localStorage on app start
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser && token) {
      // User is already logged in
    }
  }, [token]);

  if (!user || !token) {
    return <LoginForm />;
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'orders':
        return <Orders />;
      case 'customers':
        return (
          <div className="bg-white rounded-xl p-8 border border-gray-200 shadow-sm text-center">
            <h2 className="text-xl font-semibold mb-4">Customer Management</h2>
            <p className="text-gray-600">Customer management features coming soon...</p>
          </div>
        );
      case 'products':
        return (
          <div className="bg-white rounded-xl p-8 border border-gray-200 shadow-sm text-center">
            <h2 className="text-xl font-semibold mb-4">Product Management</h2>
            <p className="text-gray-600">Product management features coming soon...</p>
          </div>
        );
      case 'analytics':
        return (
          <div className="bg-white rounded-xl p-8 border border-gray-200 shadow-sm text-center">
            <h2 className="text-xl font-semibold mb-4">Analytics</h2>
            <p className="text-gray-600">Analytics dashboard coming soon...</p>
          </div>
        );
      case 'reports':
        return (
          <div className="bg-white rounded-xl p-8 border border-gray-200 shadow-sm text-center">
            <h2 className="text-xl font-semibold mb-4">Reports</h2>
            <p className="text-gray-600">Reporting features coming soon...</p>
          </div>
        );
      case 'settings':
        return (
          <div className="bg-white rounded-xl p-8 border border-gray-200 shadow-sm text-center">
            <h2 className="text-xl font-semibold mb-4">Settings</h2>
            <p className="text-gray-600">Settings panel coming soon...</p>
          </div>
        );
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar />
        
        <main className="flex-1 overflow-y-auto p-6">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <MainApp />
    </AuthProvider>
  );
}

export default App;