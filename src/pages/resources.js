import { useState } from 'react';
import Link from 'next/link';

export default function Resources() {
  const [searchTerm, setSearchTerm] = useState('');
  
  // Sample resources data
  const resources = [
    { 
      id: 1, 
      title: 'Soil Carbon Measurement Guide', 
      type: 'Guide',
      description: 'A comprehensive guide on how to measure soil carbon levels accurately.',
      link: '#',
      date: 'January 15, 2023'
    },
    { 
      id: 2, 
      title: 'Best Practices for Carbon Sequestration', 
      type: 'Research',
      description: 'Research paper outlining the most effective practices for carbon sequestration in different soil types.',
      link: '#',
      date: 'March 22, 2023'
    },
    { 
      id: 3, 
      title: 'Carbon Market Overview', 
      type: 'Report',
      description: 'A detailed report on the current state of carbon markets and pricing trends.',
      link: '#',
      date: 'June 10, 2023'
    },
    { 
      id: 4, 
      title: 'Verification Standards Explained', 
      type: 'Guide',
      description: 'An in-depth explanation of different verification standards and their requirements.',
      link: '#',
      date: 'August 5, 2023'
    },
    { 
      id: 5, 
      title: 'Policy Updates for Carbon Credits', 
      type: 'Policy',
      description: 'Recent policy changes affecting carbon credit programs at state and federal levels.',
      link: '#',
      date: 'October 30, 2023'
    },
  ];

  // Filter resources based on search
  const filteredResources = resources.filter(resource => 
    resource.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    resource.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">Resources</h1>
        <p className="text-gray-600 dark:text-gray-300">Helpful materials for soil carbon projects</p>
      </div>

      {/* Search */}
      <div className="mb-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 p-4">
        <label htmlFor="search" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Search Resources
        </label>
        <input
          type="text"
          id="search"
          className="form-input-dark"
          placeholder="Search by title or description..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Resources List */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
        <div className="p-6 border-b border-gray-100 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Available Resources</h2>
        </div>
        
        <div className="divide-y divide-gray-100 dark:divide-gray-700">
          {filteredResources.length > 0 ? (
            filteredResources.map((resource) => (
              <div key={resource.id} className="p-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between">
                  <div>
                    <div className="flex items-center mb-2">
                      <h3 className="font-medium text-lg text-gray-900 dark:text-white">{resource.title}</h3>
                      <span className="ml-3 px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300">
                        {resource.type}
                      </span>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 mb-2">{resource.description}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Added: {resource.date}</p>
                  </div>
                  <div className="mt-4 md:mt-0">
                    <a 
                      href={resource.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 dark:bg-green-600 dark:hover:bg-green-700"
                    >
                      View Resource
                    </a>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="p-6 text-center text-gray-500 dark:text-gray-400">
              No resources found matching your search criteria.
            </div>
          )}
        </div>
      </div>

      {/* Additional Information */}
      <div className="mt-8 bg-green-50 dark:bg-green-900/30 p-6 rounded-lg shadow-sm border border-green-100 dark:border-green-800">
        <h2 className="text-lg font-semibold text-green-800 dark:text-green-300 mb-2">Need more help?</h2>
        <p className="text-green-700 dark:text-green-400 mb-4">
          Our team can provide customized resources and guidance for your specific soil carbon project needs.
        </p>
        <Link 
          href="/contact" 
          className="inline-flex items-center text-green-700 dark:text-green-400 font-medium hover:text-green-800 dark:hover:text-green-300"
        >
          Contact us for assistance →
        </Link>
      </div>
    </div>
  );
} 