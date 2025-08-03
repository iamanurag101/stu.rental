import axios from "axios";

const apiRequest = axios.create({
  baseURL: "/api",
  withCredentials: true,
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