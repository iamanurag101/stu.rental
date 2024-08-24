import { defer } from "react-router-dom";
import apiRequest from "./apiRequest";

export const singlePageLoader = async ({ request, params }) => {
  const res = await apiRequest("/posts/" + params.id);
  return res.data;
};

export const listPageLoader = async ({ request }) => {
  const query = request.url.split("?")[1];
  try {
    // Making the API request
    const postPromise = apiRequest.get("/posts?" + query);
    // Return the deferred response
    return defer({
      postResponse: postPromise,
    });
  } catch (error) {
    console.error("Error fetching data:", error);
    return defer({
      postResponse: Promise.reject(error), // Ensure errors are caught in Await component
    });
  }
};