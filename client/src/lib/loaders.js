// loaders.js
import { defer } from "react-router-dom";
import apiRequest from "./apiRequest";

export const singlePageLoader = async ({ request, params }) => {
  try {
    const res = await apiRequest(`posts/${params.id}`);
    return res.data;
  } catch (error) {
    console.error("Error fetching single post:", error);
    throw error; // Ensure errors are handled in the UI
  }
};

export const listPageLoader = async ({ request }) => {
  const query = request.url.split("?")[1];
  const url = query ? `posts?${query}` : "posts";
  console.log("Fetching posts from URL:", url); // Debugging log

  try {
    const postPromise = apiRequest.get(url);
    return defer({
      postResponse: postPromise,
    });
  } catch (error) {
    console.error("Error fetching posts:", error);
    return defer({
      postResponse: Promise.reject(error), // Handling errors in Await component
    });
  }
};

export const profilePageLoader = async () => {
  try {
    const postPromise = apiRequest("/users/profilePosts");
    return defer({
      postResponse: postPromise,
    });
  } catch (error) {
    console.error("Error fetching profile posts:", error);
    return defer({
      postResponse: Promise.reject(error),
    });
  }
};
