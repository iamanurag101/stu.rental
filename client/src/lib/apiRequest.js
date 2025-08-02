import axios from "axios";

const apiRequest = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  withCredentials: true,
});

// Automatically attach token to every request if available
apiRequest.interceptors.request.use((config) => {
  const token = JSON.parse(localStorage.getItem('user'))?.token;
  console.log('Request Token:', token);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// Handle responses and errors
apiRequest.interceptors.request.use((config) => {
  try {
    const storedUser = localStorage.getItem('user');
    const token = storedUser ? JSON.parse(storedUser)?.token : null;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  } catch (err) {
    console.error("Failed to parse token from localStorage", err);
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// Method to update a post
export const updatePost = async (postId, postData) => {
  try {
    const response = await apiRequest.put(`/posts/${postId}`, postData);
    return response.data;
  } catch (error) {
    console.error("Error updating post:", error);
    throw error;
  }
};

// Method to delete a post
export const deletePost = async (postId) => {
  try {
    const response = await apiRequest.delete(`/posts/${postId}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting post:", error);
    throw error;
  }
};

export default apiRequest;