const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.soilledger.com';

/**
 * Base API service for handling HTTP requests
 */
const apiService = {
  /**
   * Perform a GET request
   * @param {string} endpoint - API endpoint to call
   * @param {Object} params - Query parameters
   * @returns {Promise<any>} Response data
   */
  async get(endpoint, params = {}) {
    const url = new URL(`${API_BASE_URL}${endpoint}`);
    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
    
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          // Add auth headers if needed
        },
      });
      
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('API GET request failed:', error);
      throw error;
    }
  },
  
  /**
   * Perform a POST request
   * @param {string} endpoint - API endpoint to call
   * @param {Object} data - Data to send in the request body
   * @returns {Promise<any>} Response data
   */
  async post(endpoint, data = {}) {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Add auth headers if needed
        },
        body: JSON.stringify(data),
      });
      
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('API POST request failed:', error);
      throw error;
    }
  },
  
  // Add other methods (PUT, DELETE, etc.) as needed
};

export default apiService; 