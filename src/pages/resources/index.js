import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Resources() {
  const [searchTerm, setSearchTerm] = useState('');
  
  const resources = [
    {
      id: 1,
      title: 'Getting Started with SoiLedger',
      category: 'Guide',
      description: 'Learn the basics of using the SoiLedger platform to manage your soil carbon projects.',
      date: 'October 15, 2023',
      image: '/images/placeholder.png'
    },
    {
      id: 2,
      title: 'Soil Carbon Measurement Best Practices',
      category: 'Best Practices',
      description: 'Discover the most effective methods for measuring soil carbon levels across different soil types and landscapes.',
      date: 'September 28, 2023',
      image: '/images/placeholder.png'
    },
    {
      id: 3,
      title: 'Blockchain Technology in Carbon Markets',
      category: 'Research',
      description: 'Explore how blockchain technology is revolutionizing transparency and trust in carbon credit markets.',
      date: 'August 12, 2023',
      image: '/images/placeholder.png'
    },
    {
      id: 4,
      title: 'Regenerative Agriculture and Carbon Sequestration',
      category: 'Educational',
      description: 'Learn about regenerative farming practices that maximize carbon sequestration while improving soil health.',
      date: 'July 5, 2023',
      image: '/images/placeholder.png'
    },
    {
      id: 5,
      title: 'Carbon Credit Verification Process',
      category: 'Guide',
      description: 'A step-by-step walkthrough of the verification process for soil carbon credits on the SoiLedger platform.',
      date: 'June 20, 2023',
      image: '/images/placeholder.png'
    },
    {
      id: 6,
      title: 'Navigating Carbon Markets: A Farmer\'s Guide',
      category: 'Guide',
      description: 'Essential information for farmers looking to enter the carbon market with their sequestration projects.',
      date: 'May 15, 2023',
      image: '/images/placeholder.png'
    }
  ];

  // Filter resources based on search term
  const filteredResources = resources.filter(resource => 
    resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    resource.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    resource.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Resources</h1>
          <p className="text-gray-600">Explore guides, research, and educational resources</p>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">Search Resources</label>
            <input
              type="text"
              id="search"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500"
              placeholder="Search by title, description, or category..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Quick Links */}
      <div className="bg-green-50 p-6 rounded-lg shadow-sm border border-green-100 mb-8">
        <h2 className="text-xl font-semibold text-green-900 mb-4">Quick Links</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <Link href="/resources/faq" className="bg-white p-4 rounded-md shadow-sm border border-green-100 hover:shadow-md transition duration-200">
            <h3 className="text-lg font-medium text-gray-900 mb-1">FAQ</h3>
            <p className="text-sm text-gray-600">Frequently asked questions about the platform</p>
          </Link>
          <Link href="/resources/guides" className="bg-white p-4 rounded-md shadow-sm border border-green-100 hover:shadow-md transition duration-200">
            <h3 className="text-lg font-medium text-gray-900 mb-1">User Guides</h3>
            <p className="text-sm text-gray-600">Step-by-step guides for using SoiLedger</p>
          </Link>
          <Link href="/resources/support" className="bg-white p-4 rounded-md shadow-sm border border-green-100 hover:shadow-md transition duration-200">
            <h3 className="text-lg font-medium text-gray-900 mb-1">Support</h3>
            <p className="text-sm text-gray-600">Get help from our support team</p>
          </Link>
        </div>
      </div>

      {/* Resources List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredResources.length > 0 ? (
          filteredResources.map(resource => (
            <div key={resource.id} className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition duration-200">
              <div className="h-48 relative bg-gray-200">
                <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
                  <span className="text-gray-400">Resource Image</span>
                </div>
              </div>
              <div className="p-6">
                <div className="inline-block px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 mb-2">
                  {resource.category}
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">{resource.title}</h3>
                <p className="text-sm text-gray-600 mb-4">{resource.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-500">{resource.date}</span>
                  <Link href={`/resources/${resource.id}`} className="text-sm font-medium text-green-700 hover:text-green-800">
                    Read More →
                  </Link>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <p className="text-gray-600">No resources matching your search criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
} 