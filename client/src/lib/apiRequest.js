import axios from "axios";

const apiRequest = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  withCredentials: true,
});

// wrote this method seperately for atomicity
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
