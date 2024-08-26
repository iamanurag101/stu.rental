import axios from "axios";

const apiRequest = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  withCredentials: true,
});

// Automatically attach token to every request if available
apiRequest.interceptors.request.use((config) => {
  const token = JSON.parse(localStorage.getItem('user'))?.token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// Handle responses and errors
apiRequest.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response && error.response.status === 401) {
      // Handle unauthorized errors
      console.error("Unauthorized access. Redirecting to login...");
      // Example: Redirect to login page or show a message
      // window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

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