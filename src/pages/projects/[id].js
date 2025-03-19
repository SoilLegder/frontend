import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image';

export default function ProjectDetails() {
  const router = useRouter();
  const { id } = router.query;
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  
  // In a real app, you would fetch the project data from an API
  useEffect(() => {
    if (!id) return;
    
    // Simulating API fetch with timeout
    const timeout = setTimeout(() => {
      // Mock data - this would come from an API in a real application
      const mockProject = {
        id: parseInt(id),
        name: `Farm ${id} Carbon Project`,
        description: 'A comprehensive soil carbon sequestration project focusing on sustainable agricultural practices.',
        status: 'Active',
        progress: 75,
        location: 'California',
        area: '250 acres',
        carbon: '82.3 tons',
        startDate: '2023-03-15',
        endDate: '2028-03-15',
        owner: 'John Smith',
        coverImage: '/farm-field.jpg',
        practices: [
          { id: 1, name: 'No-till farming', status: 'Implemented' },
          { id: 2, name: 'Cover crops', status: 'Implemented' },
          { id: 3, name: 'Crop rotation', status: 'Planned' }
        ],
        measurements: [
          { id: 1, date: '2023-04-01', carbon: '20.5 tons', notes: 'Initial measurement' },
          { id: 2, date: '2023-07-15', carbon: '38.7 tons', notes: 'Second quarter measurement' },
          { id: 3, date: '2023-10-10', carbon: '62.1 tons', notes: 'Third quarter measurement' },
          { id: 4, date: '2024-01-05', carbon: '82.3 tons', notes: 'Year-end measurement' }
        ],
        verifications: [
          { id: 1, date: '2023-05-10', status: 'Completed', verifier: 'TrustCarbon Inc.', report: '#' },
          { id: 2, date: '2023-11-15', status: 'Completed', verifier: 'TrustCarbon Inc.', report: '#' }
        ]
      };
      
      setProject(mockProject);
      setLoading(false);
    }, 800);
    
    return () => clearTimeout(timeout);
  }, [id]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="flex justify-center items-center h-64">
          <div className="w-16 h-16 border-t-4 border-b-4 border-green-700 dark:border-green-500 rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 p-6 text-center">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Project Not Found</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">The project you're looking for doesn't exist or has been removed.</p>
          <Link 
            href="/projects" 
            className="px-4 py-2 bg-green-700 text-white rounded-md hover:bg-green-800 transition duration-200 dark:bg-green-600 dark:hover:bg-green-700"
          >
            Back to Projects
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {/* Back navigation */}
      <div className="mb-4">
        <Link 
          href="/projects" 
          className="flex items-center text-green-700 dark:text-green-500 hover:text-green-800 dark:hover:text-green-400"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          Back to Projects
        </Link>
      </div>
      
      {/* Project Header */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden mb-8">
        <div className="relative h-64">
          <Image
            src={project.coverImage || '/farm-field.jpg'}
            alt={project.name}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
            <div className="p-6">
              <div className="mb-2 flex items-center">
                <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full 
                  ${project.status === 'Active' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' : 
                  project.status === 'Pending' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' : 
                  'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'}`}>
                  {project.status}
                </span>
                <span className="ml-2 text-sm text-white">
                  Started: {project.startDate}
                </span>
              </div>
              <h1 className="text-3xl font-bold text-white">{project.name}</h1>
            </div>
          </div>
        </div>
        
        {/* Project Tabs */}
        <div className="border-b border-gray-200 dark:border-gray-700">
          <nav className="flex -mb-px">
            <button
              onClick={() => setActiveTab('overview')}
              className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                activeTab === 'overview'
                  ? 'border-green-700 dark:border-green-500 text-green-700 dark:text-green-500'
                  : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab('measurements')}
              className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                activeTab === 'measurements'
                  ? 'border-green-700 dark:border-green-500 text-green-700 dark:text-green-500'
                  : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'
              }`}
            >
              Measurements
            </button>
            <button
              onClick={() => setActiveTab('verifications')}
              className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                activeTab === 'verifications'
                  ? 'border-green-700 dark:border-green-500 text-green-700 dark:text-green-500'
                  : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'
              }`}
            >
              Verifications
            </button>
          </nav>
        </div>
        
        {/* Tab content */}
        <div className="p-6">
          {activeTab === 'overview' && (
            <div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Project Details</h2>
                  <div className="space-y-4">
                    <p className="text-gray-700 dark:text-gray-300">{project.description}</p>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Location</h3>
                        <p className="text-base text-gray-900 dark:text-white">{project.location}</p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Area</h3>
                        <p className="text-base text-gray-900 dark:text-white">{project.area}</p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Carbon Sequestered</h3>
                        <p className="text-base text-gray-900 dark:text-white">{project.carbon}</p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Project Owner</h3>
                        <p className="text-base text-gray-900 dark:text-white">{project.owner}</p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Start Date</h3>
                        <p className="text-base text-gray-900 dark:text-white">{project.startDate}</p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">End Date</h3>
                        <p className="text-base text-gray-900 dark:text-white">{project.endDate}</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Sustainable Practices</h2>
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                    <ul className="divide-y divide-gray-200 dark:divide-gray-600">
                      {project.practices.map((practice) => (
                        <li key={practice.id} className="py-3 flex justify-between">
                          <span className="text-gray-800 dark:text-gray-200">{practice.name}</span>
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            practice.status === 'Implemented' 
                              ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
                              : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                          }`}>{practice.status}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="mt-6">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Project Progress</h3>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4">
                      <div
                        className="bg-green-600 h-4 rounded-full"
                        style={{ width: `${project.progress}%` }}
                      ></div>
                    </div>
                    <div className="text-right mt-1">
                      <span className="text-sm text-gray-500 dark:text-gray-400">{project.progress}% Complete</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'measurements' && (
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Carbon Measurements</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-gray-50 dark:bg-gray-700">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Date</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Carbon Sequestered</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Notes</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                    {project.measurements.map((measurement) => (
                      <tr key={measurement.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">{measurement.date}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">{measurement.carbon}</td>
                        <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-300">{measurement.notes}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              <div className="mt-8">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Carbon Sequestration Progress</h3>
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
                  {/* A chart would go here in a real application */}
                  <div className="h-64 flex items-center justify-center bg-gray-100 dark:bg-gray-700 rounded">
                    <p className="text-gray-500 dark:text-gray-400">Carbon sequestration chart would be displayed here</p>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'verifications' && (
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Verification History</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-gray-50 dark:bg-gray-700">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Date</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Status</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Verifier</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Report</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                    {project.verifications.map((verification) => (
                      <tr key={verification.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">{verification.date}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full 
                            ${verification.status === 'Completed' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' : 
                            verification.status === 'Pending' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' : 
                            'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'}`}>
                            {verification.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">{verification.verifier}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <a href={verification.report} className="text-green-700 dark:text-green-500 hover:text-green-800 dark:hover:text-green-400">View Report</a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              <div className="mt-8 flex flex-col md:flex-row md:items-center md:justify-between bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">Next Verification</h3>
                  <p className="text-gray-500 dark:text-gray-300">Scheduled for: May 15, 2024</p>
                </div>
                <div className="mt-4 md:mt-0">
                  <button className="px-4 py-2 bg-green-700 text-white rounded-md hover:bg-green-800 transition duration-200 dark:bg-green-600 dark:hover:bg-green-700">
                    Request Verification
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-4 justify-end">
        <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 transition duration-200">
          Download Report
        </button>
        <button className="px-4 py-2 bg-green-700 text-white rounded-md hover:bg-green-800 transition duration-200 dark:bg-green-600 dark:hover:bg-green-700">
          Edit Project
        </button>
      </div>
    </div>
  );
} 