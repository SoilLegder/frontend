import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image';

export default function VerificationDetails() {
  const router = useRouter();
  const { id } = router.query;
  const [verification, setVerification] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  
  // In a real app, you would fetch the verification data from an API
  useEffect(() => {
    if (!id) return;
    
    // Simulating API fetch with timeout
    const timeout = setTimeout(() => {
      // Mock data - this would come from an API in a real application
      const mockVerification = {
        id: parseInt(id),
        projectId: 1,
        projectName: 'Farm A Carbon Project',
        status: id % 2 === 0 ? 'Completed' : 'In Progress',
        verifier: 'TrustCarbon Verification Inc.',
        verifierLogo: '/verifier-logo.png',
        type: 'Annual Assessment',
        startDate: '2023-05-10',
        completionDate: id % 2 === 0 ? '2023-05-25' : null,
        methodologies: [
          'ISO 14064-2',
          'Verra VCS VM0042',
          'IPCC Guidelines for National Greenhouse Gas Inventories'
        ],
        carbonVerified: id % 2 === 0 ? '76.4 tons' : null,
        findings: [
          { id: 1, type: 'Observation', description: 'Cover crop implementation exceeds project plan requirements' },
          { id: 2, type: 'Minor Non-Conformity', description: 'Soil sampling documentation needs additional details' },
          { id: 3, type: 'Recommendation', description: 'Consider increasing sampling frequency in high-activity areas' }
        ],
        timeline: [
          { id: 1, date: '2023-05-10', event: 'Verification initiated', completed: true },
          { id: 2, date: '2023-05-12', event: 'Documentation review', completed: true },
          { id: 3, date: '2023-05-17', event: 'On-site assessment', completed: true },
          { id: 4, date: '2023-05-20', event: 'Lab sample analysis', completed: id % 2 === 0 },
          { id: 5, date: '2023-05-25', event: 'Final report issuance', completed: id % 2 === 0 }
        ],
        team: [
          { id: 1, name: 'Dr. Emily Chen', role: 'Lead Verifier', photo: '/person1.jpg' },
          { id: 2, name: 'Michael Rodriguez', role: 'Soil Carbon Specialist', photo: '/person2.jpg' },
          { id: 3, name: 'Sarah Johnson', role: 'Agricultural Practices Auditor', photo: '/person3.jpg' }
        ]
      };
      
      setVerification(mockVerification);
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

  if (!verification) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 p-6 text-center">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Verification Not Found</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">The verification you're looking for doesn't exist or has been removed.</p>
          <Link 
            href="/verification" 
            className="px-4 py-2 bg-green-700 text-white rounded-md hover:bg-green-800 transition duration-200 dark:bg-green-600 dark:hover:bg-green-700"
          >
            Back to Verifications
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
          href="/verification" 
          className="flex items-center text-green-700 dark:text-green-500 hover:text-green-800 dark:hover:text-green-400"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          Back to Verifications
        </Link>
      </div>
      
      {/* Verification Header */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden mb-8">
        <div className="p-6 flex flex-col md:flex-row justify-between items-start md:items-center">
          <div>
            <div className="flex items-center mb-3">
              <span className={`px-3 py-1 inline-flex text-sm leading-5 font-semibold rounded-full 
                ${verification.status === 'Completed' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' : 
                verification.status === 'In Progress' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' : 
                'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'}`}>
                {verification.status}
              </span>
              <span className="ml-3 text-sm text-gray-500 dark:text-gray-400">
                ID: VER-{verification.id.toString().padStart(4, '0')}
              </span>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Verification for {verification.projectName}
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              {verification.type} • Started on {verification.startDate}
            </p>
          </div>
          <div className="mt-4 md:mt-0 flex items-center">
            <div className="mr-4 text-right">
              <p className="text-sm text-gray-500 dark:text-gray-400">Verified by</p>
              <p className="font-medium text-gray-900 dark:text-white">{verification.verifier}</p>
            </div>
            <div className="w-12 h-12 relative">
              <Image 
                src={verification.verifierLogo || '/verifier-logo.png'} 
                alt={verification.verifier}
                fill
                className="object-contain"
              />
            </div>
          </div>
        </div>
        
        {/* Verification Tabs */}
        <div className="border-t border-gray-200 dark:border-gray-700">
          <nav className="flex">
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
              onClick={() => setActiveTab('findings')}
              className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                activeTab === 'findings'
                  ? 'border-green-700 dark:border-green-500 text-green-700 dark:text-green-500'
                  : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'
              }`}
            >
              Findings & Recommendations
            </button>
            <button
              onClick={() => setActiveTab('team')}
              className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                activeTab === 'team'
                  ? 'border-green-700 dark:border-green-500 text-green-700 dark:text-green-500'
                  : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'
              }`}
            >
              Verification Team
            </button>
          </nav>
        </div>
        
        {/* Tab Content */}
        <div className="p-6">
          {activeTab === 'overview' && (
            <div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Verification Details</h2>
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Status</h3>
                        <p className="text-base text-gray-900 dark:text-white">{verification.status}</p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Type</h3>
                        <p className="text-base text-gray-900 dark:text-white">{verification.type}</p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Start Date</h3>
                        <p className="text-base text-gray-900 dark:text-white">{verification.startDate}</p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Completion Date</h3>
                        <p className="text-base text-gray-900 dark:text-white">
                          {verification.completionDate || 'Pending'}
                        </p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Project</h3>
                        <p className="text-base text-gray-900 dark:text-white">
                          <Link 
                            href={`/projects/${verification.projectId}`}
                            className="text-green-700 dark:text-green-500 hover:text-green-800 dark:hover:text-green-400"
                          >
                            {verification.projectName}
                          </Link>
                        </p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Carbon Verified</h3>
                        <p className="text-base text-gray-900 dark:text-white">
                          {verification.carbonVerified || 'Pending verification'}
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mt-6 mb-3">Methodologies Used</h3>
                  <ul className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 space-y-2">
                    {verification.methodologies.map((methodology, index) => (
                      <li key={index} className="text-gray-800 dark:text-gray-200 flex items-start">
                        <svg className="h-5 w-5 text-green-600 dark:text-green-500 mr-2 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {methodology}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Verification Timeline</h2>
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                    <ol className="relative border-l border-gray-300 dark:border-gray-600 ml-3">
                      {verification.timeline.map((step, index) => (
                        <li key={step.id} className="mb-6 ml-6">
                          <span className={`absolute flex items-center justify-center w-6 h-6 rounded-full -left-3 ring-8 ring-gray-50 dark:ring-gray-700 ${
                            step.completed ? 'bg-green-600 dark:bg-green-500' : 'bg-gray-300 dark:bg-gray-600'
                          }`}>
                            {step.completed ? (
                              <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                              </svg>
                            ) : (
                              <span className="w-3 h-3"></span>
                            )}
                          </span>
                          <h3 className={`font-medium ${
                            step.completed ? 'text-gray-900 dark:text-white' : 'text-gray-500 dark:text-gray-400'
                          }`}>
                            {step.event}
                          </h3>
                          <time className="block text-sm text-gray-500 dark:text-gray-400">
                            {step.date}
                          </time>
                        </li>
                      ))}
                    </ol>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'findings' && (
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Findings & Recommendations</h2>
              <div className="space-y-6">
                {verification.findings.map((finding) => (
                  <div 
                    key={finding.id} 
                    className="bg-white dark:bg-gray-800 shadow-sm border border-gray-100 dark:border-gray-700 rounded-lg p-4"
                  >
                    <div className="flex items-start">
                      <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center mr-4 
                        ${finding.type === 'Observation' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' : 
                        finding.type === 'Minor Non-Conformity' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
                        'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'}`}>
                        {finding.type === 'Observation' && (
                          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                        )}
                        {finding.type === 'Minor Non-Conformity' && (
                          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                          </svg>
                        )}
                        {finding.type === 'Recommendation' && (
                          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                          </svg>
                        )}
                      </div>
                      <div>
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white">{finding.type}</h3>
                        <p className="mt-1 text-gray-600 dark:text-gray-300">{finding.description}</p>
                      </div>
                    </div>
                  </div>
                ))}

                {verification.status === 'Completed' && (
                  <div className="mt-8 bg-green-50 dark:bg-green-900/30 p-4 rounded-lg border border-green-100 dark:border-green-800">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <svg className="h-5 w-5 text-green-600 dark:text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <h3 className="text-sm font-medium text-green-800 dark:text-green-300">Verification Summary</h3>
                        <div className="mt-2 text-sm text-green-700 dark:text-green-400">
                          <p>
                            This verification has been successfully completed. All findings have been addressed appropriately, 
                            and the project meets the required standards for carbon credit issuance.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
          
          {activeTab === 'team' && (
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Verification Team</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {verification.team.map((member) => (
                  <div key={member.id} className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden border border-gray-100 dark:border-gray-700">
                    <div className="relative h-48 w-full">
                      <Image
                        src={member.photo || '/placeholder-person.jpg'}
                        alt={member.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white">{member.name}</h3>
                      <p className="text-gray-600 dark:text-gray-300">{member.role}</p>
                      <div className="mt-4 flex space-x-3">
                        <button className="text-sm text-gray-700 dark:text-gray-300 hover:text-green-700 dark:hover:text-green-500">
                          View Profile
                        </button>
                        <button className="text-sm text-gray-700 dark:text-gray-300 hover:text-green-700 dark:hover:text-green-500">
                          Contact
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-10 bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Team Qualifications</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Our verification team consists of certified professionals with extensive experience in agricultural carbon projects.
                  All team members maintain the following qualifications:
                </p>
                <ul className="list-disc pl-5 text-gray-600 dark:text-gray-300 space-y-1">
                  <li>ISO 14064 Lead Verifier Certification</li>
                  <li>Minimum 5 years of relevant field experience</li>
                  <li>Specialized training in soil carbon measurement methodologies</li>
                  <li>Expertise in agricultural practices and sustainable land management</li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-4 justify-end">
        <Link 
          href={`/projects/${verification.projectId}`}
          className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 transition duration-200 text-center"
        >
          View Project
        </Link>
        {verification.status === 'Completed' ? (
          <button className="px-4 py-2 bg-green-700 text-white rounded-md hover:bg-green-800 transition duration-200 dark:bg-green-600 dark:hover:bg-green-700">
            Download Report
          </button>
        ) : (
          <button className="px-4 py-2 bg-blue-700 text-white rounded-md hover:bg-blue-800 transition duration-200 dark:bg-blue-600 dark:hover:bg-blue-700">
            Check Status
          </button>
        )}
      </div>
    </div>
  );
} 