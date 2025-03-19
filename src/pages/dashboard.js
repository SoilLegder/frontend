import { useState } from 'react';
import Link from 'next/link';

export default function Dashboard() {
  // Mock data - this would come from an API in a real application
  const recentProjects = [
    { id: 1, name: 'Farm A Carbon Project', status: 'Active', progress: 75 },
    { id: 2, name: 'Woodland Restoration', status: 'Pending', progress: 30 },
    { id: 3, name: 'Agroforestry Initiative', status: 'Completed', progress: 100 },
  ];

  const metrics = [
    { label: 'Total Carbon', value: '125.4', unit: 'tons', change: '+12.3%' },
    { label: 'Verified Credits', value: '78.2', unit: 'tons', change: '+5.7%' },
    { label: 'Land Area', value: '357', unit: 'acres', change: '0%' },
    { label: 'Projects', value: '4', unit: '', change: '+1' },
  ];

  // Add the missing activities array
  const activities = [
    { id: 1, type: 'verification', description: 'Verification completed for Farm A Carbon Project', time: '2 hours ago' },
    { id: 2, type: 'project', description: 'New measurement added to Woodland Restoration', time: '5 hours ago' },
    { id: 3, type: 'marketplace', description: 'Carbon credit transaction completed', time: '1 day ago' },
    { id: 4, type: 'project', description: 'Agroforestry Initiative marked as completed', time: '2 days ago' },
    { id: 5, type: 'verification', description: 'New verification request submitted', time: '3 days ago' },
  ];

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-6">Dashboard</h1>
      
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 mr-4">
              {/* Icon */}
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Projects</p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-white">24</p>
            </div>
          </div>
        </div>
        
        {/* Other cards with same pattern */}
      </div>
      
      {/* Charts section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
          <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Carbon Sequestration Timeline</h2>
          <div className="h-80">
            {/* Chart component would go here */}
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
          <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Project Distribution</h2>
          <div className="h-80">
            {/* Chart component would go here */}
          </div>
        </div>
      </div>
      
      {/* Recent Activity */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
        <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-700">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Activity</h2>
        </div>
        <div className="divide-y divide-gray-100 dark:divide-gray-700">
          {activities.map((activity) => (
            <div key={activity.id} className="px-6 py-4">
              <div className="flex items-start">
                <div className={`mt-1 mr-4 w-2 h-2 rounded-full ${
                  activity.type === 'verification' ? 'bg-blue-500' : 
                  activity.type === 'project' ? 'bg-green-500' : 'bg-yellow-500'
                }`}></div>
                <div>
                  <p className="text-gray-900 dark:text-white">{activity.description}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{activity.time}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 