import React from 'react';
import { DashboardStats as Stats } from '../../types';
import { TrendingUp, TrendingDown, ShoppingCart, Users, DollarSign, Package } from 'lucide-react';

interface DashboardStatsProps {
  stats: Stats;
}

export const DashboardStats: React.FC<DashboardStatsProps> = ({ stats }) => {
  const statCards = [
    {
      title: 'Total Orders',
      value: stats.totalOrders.toLocaleString(),
      icon: ShoppingCart,
      color: 'blue',
      change: '+12%',
      trending: 'up'
    },
    {
      title: 'Total Revenue',
      value: `$${stats.totalRevenue.toLocaleString('en-US', { minimumFractionDigits: 2 })}`,
      icon: DollarSign,
      color: 'green',
      change: '+8%',
      trending: 'up'
    },
    {
      title: 'Pending Orders',
      value: stats.pendingOrders.toString(),
      icon: Package,
      color: 'orange',
      change: '-5%',
      trending: 'down'
    },
    {
      title: 'Total Customers',
      value: stats.totalCustomers.toLocaleString(),
      icon: Users,
      color: 'purple',
      change: '+15%',
      trending: 'up'
    }
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      blue: 'bg-blue-50 text-blue-700 border-blue-200',
      green: 'bg-green-50 text-green-700 border-green-200',
      orange: 'bg-orange-50 text-orange-700 border-orange-200',
      purple: 'bg-purple-50 text-purple-700 border-purple-200'
    };
    return colors[color as keyof typeof colors];
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {statCards.map((card, index) => {
        const Icon = card.icon;
        const TrendIcon = card.trending === 'up' ? TrendingUp : TrendingDown;
        
        return (
          <div key={index} className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-2 rounded-lg border ${getColorClasses(card.color)}`}>
                <Icon size={20} />
              </div>
              <div className={`flex items-center space-x-1 text-xs ${
                card.trending === 'up' ? 'text-green-600' : 'text-red-600'
              }`}>
                <TrendIcon size={14} />
                <span>{card.change}</span>
              </div>
            </div>
            
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-1">{card.value}</h3>
              <p className="text-sm text-gray-600">{card.title}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};