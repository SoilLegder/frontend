import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import NoSSR from '../components/maps/NoSSR';

// Use MapComponentNoDrawing instead
const MapComponentNoDrawing = dynamic(() => import('../components/maps/MapComponentNoDrawing'), {
  ssr: false,
  loading: () => (
    <div className="h-[500px] bg-gray-100 flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-700"></div>
    </div>
  ),
});

export default function Map() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real app, fetch data from API
    const mockProjects = [
      {
        id: 1,
        name: 'Farm A Carbon Project',
        location: 'California',
        coordinates: [37.7749, -122.4194],
        area: '250 acres',
        carbon: '82.3 tons',
        status: 'Active',
      },
      {
        id: 2,
        name: 'Woodland Restoration',
        location: 'Oregon',
        coordinates: [44.0582, -121.3153],
        area: '120 acres',
        carbon: '45.1 tons',
        status: 'Pending',
      },
      {
        id: 3,
        name: 'Agroforestry Initiative',
        location: 'Washington',
        coordinates: [47.6062, -122.3321],
        area: '180 acres',
        carbon: '63.7 tons',
        status: 'Completed',
      },
      {
        id: 4,
        name: 'Sustainable Grazing Project',
        location: 'Montana',
        coordinates: [46.8797, -110.3626],
        area: '350 acres',
        carbon: '95.2 tons',
        status: 'Active',
      }
    ];

    // Simulate API delay
    setTimeout(() => {
      setProjects(mockProjects);
      setLoading(false);
    }, 600);
  }, []);

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">Project Map</h1>
          <p className="text-gray-600 dark:text-gray-300">View and manage your soil carbon projects geographically</p>
        </div>
      </div>

      {/* Map Container */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 mb-6">
        <div className="h-[500px] relative">
          <NoSSR fallback={<div className="h-full flex items-center justify-center text-gray-500 dark:text-gray-400">Loading map...</div>}>
            <MapComponentNoDrawing projects={projects} loading={loading} />
          </NoSSR>
        </div>
      </div>

      {/* Project List */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
        <div className="p-6 border-b border-gray-100 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Project Locations</h2>
        </div>
        <div className="divide-y divide-gray-100 dark:divide-gray-700">
          {loading ? (
            <div className="p-6 text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-green-700 dark:border-green-500 mx-auto"></div>
              <p className="mt-2 text-gray-500 dark:text-gray-400">Loading projects...</p>
            </div>
          ) : (
            projects.map((project) => (
              <div key={project.id} className="p-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between">
                  <div>
                    <h3 className="font-medium text-lg text-gray-900 dark:text-white">{project.name}</h3>
                    <div className="flex items-center mt-1">
                      <span className={`inline-block w-2 h-2 rounded-full mr-2 ${
                        project.status === 'Active' ? 'bg-green-500' : 
                        project.status === 'Pending' ? 'bg-yellow-500' : 'bg-blue-500'
                      }`}></span>
                      <span className="text-sm text-gray-600 dark:text-gray-300">{project.status}</span>
                    </div>
                    <div className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                      <span>{project.location}</span>
                      <span className="mx-2">•</span>
                      <span>{project.area}</span>
                      <span className="mx-2">•</span>
                      <span>{project.carbon}</span>
                    </div>
                  </div>
                  <Link href={`/projects/${project.id}`} className="mt-2 md:mt-0 text-green-700 dark:text-green-500 hover:text-green-800 dark:hover:text-green-400">
                    View Details →
                  </Link>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
} 