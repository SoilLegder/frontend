import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

export default function NewProject() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    location: '',
    area: '',
    startDate: '',
    projectType: '',
    practices: [],
    additionalNotes: ''
  });

  const projectTypes = [
    { id: 'agriculture', name: 'Agriculture' },
    { id: 'forestry', name: 'Forestry' },
    { id: 'grassland', name: 'Grassland' },
    { id: 'wetland', name: 'Wetland' },
    { id: 'urban', name: 'Urban Greening' }
  ];

  const carbonPractices = [
    { id: 'no-till', name: 'No-till Farming' },
    { id: 'cover-crops', name: 'Cover Crops' },
    { id: 'crop-rotation', name: 'Crop Rotation' },
    { id: 'compost', name: 'Compost Application' },
    { id: 'agroforestry', name: 'Agroforestry' },
    { id: 'rotational-grazing', name: 'Rotational Grazing' },
    { id: 'biochar', name: 'Biochar Application' }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handlePracticeChange = (e) => {
    const { value, checked } = e.target;
    
    if (checked) {
      setFormData(prevData => ({
        ...prevData,
        practices: [...prevData.practices, value]
      }));
    } else {
      setFormData(prevData => ({
        ...prevData,
        practices: prevData.practices.filter(practice => practice !== value)
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // In a real app, you would send this data to your API
      console.log('Submitting project data:', formData);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Redirect to projects page after successful submission
      router.push('/projects');
    } catch (error) {
      console.error('Error submitting project:', error);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">Create New Project</h1>
        <p className="text-gray-600 dark:text-gray-300">Fill in the details to register a new soil carbon project</p>
      </div>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
        <form onSubmit={handleSubmit} className="p-6">
          <div className="space-y-6">
            {/* Project Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Project Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:text-white"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
            
            {/* Description */}
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Project Description *
              </label>
              <textarea
                id="description"
                name="description"
                rows={3}
                required
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:text-white"
                value={formData.description}
                onChange={handleChange}
              ></textarea>
            </div>
            
            {/* Location and Area */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="location" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Location *
                </label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  required
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:text-white"
                  placeholder="e.g., California, USA"
                  value={formData.location}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="area" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Area (acres) *
                </label>
                <input
                  type="number"
                  id="area"
                  name="area"
                  required
                  min="0"
                  step="0.1"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:text-white"
                  value={formData.area}
                  onChange={handleChange}
                />
              </div>
            </div>
            
            {/* Start Date and Project Type */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Start Date *
                </label>
                <input
                  type="date"
                  id="startDate"
                  name="startDate"
                  required
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:text-white"
                  value={formData.startDate}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="projectType" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Project Type *
                </label>
                <select
                  id="projectType"
                  name="projectType"
                  required
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:text-white"
                  value={formData.projectType}
                  onChange={handleChange}
                >
                  <option value="">Select a project type</option>
                  {projectTypes.map(type => (
                    <option key={type.id} value={type.id}>{type.name}</option>
                  ))}
                </select>
              </div>
            </div>
            
            {/* Carbon Practices */}
            <div>
              <span className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Carbon Sequestration Practices *
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {carbonPractices.map(practice => (
                  <div key={practice.id} className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id={practice.id}
                        name="practices"
                        type="checkbox"
                        value={practice.id}
                        checked={formData.practices.includes(practice.id)}
                        onChange={handlePracticeChange}
                        className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor={practice.id} className="font-medium text-gray-700 dark:text-gray-300">
                        {practice.name}
                      </label>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Additional Notes */}
            <div>
              <label htmlFor="additionalNotes" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Additional Notes
              </label>
              <textarea
                id="additionalNotes"
                name="additionalNotes"
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:text-white"
                value={formData.additionalNotes}
                onChange={handleChange}
              ></textarea>
            </div>
            
            <div className="flex justify-end space-x-4 pt-4">
              <Link 
                href="/projects" 
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 transition duration-200"
              >
                Cancel
              </Link>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-4 py-2 bg-green-700 text-white rounded-md hover:bg-green-800 dark:bg-green-600 dark:hover:bg-green-700 transition duration-200 disabled:opacity-70"
              >
                {isSubmitting ? 'Creating...' : 'Create Project'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
} 