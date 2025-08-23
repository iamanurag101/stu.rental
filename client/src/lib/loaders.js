// loaders.js
import { defer } from "react-router-dom";
import apiRequest from "./apiRequest";

export const singlePageLoader = async ({ request, params }) => {
  try {
    const res = await apiRequest(`/posts/${params.id}`);
    return res.data;
  } catch (error) {
    console.error("Error fetching single post:", error);
    throw error; // Ensure errors are handled in the UI
  }
};

export const listPageLoader = async ({ request }) => {
  const query = request.url.split("?")[1];
  const url = `/posts?${query || ""}`;
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

export const profilePageLoader = async ({ request }) => {
  const url = new URL(request.url);
  const myPostsPage = url.searchParams.get("myPostsPage") || "1";
  const savedPostsPage = url.searchParams.get("savedPostsPage") || "1";

  const postPromise = apiRequest.get(`/users/profilePosts?myPostsPage=${myPostsPage}&savedPostsPage=${savedPostsPage}`);
  
  return defer({
    postResponse: postPromise,
  });
};
