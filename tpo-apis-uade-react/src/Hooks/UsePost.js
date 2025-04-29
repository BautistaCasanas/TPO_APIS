import { useState } from 'react';

/**
 * Custom hook for making POST requests
 * @param {string} endpoint - The API endpoint to make the request to
 * @param {object} initialData - Initial data to send in the request
 * @returns {Object} Object containing the post function, loading state, and error state
 */
const usePost = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const executePost = async (endpoint, data) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`http://localhost:3000/${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Error en la solicitud');
      }

      const result = await response.json();
      return result;
    } catch (err) {
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    executePost,
    loading,
    error,
  };
};

export default usePost;

