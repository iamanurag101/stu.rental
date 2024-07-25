import Listing from '../models/listing.model.js';
import asyncHandler from '../utils/asyncHandler.js';
import ApiError from '../utils/ApiError.js';
import ApiResponse from '../utils/ApiResponse.js';
import { uploadOnCloudinary } from '../utils/cloudinary.js';

const getAllListings = asyncHandler(async (req, res) => {
  const listings = await Listing.find({ availabilityStatus: 'Active' });
  res.status(200).json(new ApiResponse('Listings retrieved successfully', listings));
});

const getListing = asyncHandler(async (req, res) => {
  const listing = await Listing.findById(req.params.id);
  if (!listing) {
    throw new ApiError('Listing not found', 404);
  }
  res.status(200).json(new ApiResponse('Listing retrieved successfully', listing));
});

const createListing = asyncHandler(async (req, res) => {
  const { title, description, price, location, latitude, longitude } = req.body;
  const image = req.file ? await uploadOnCloudinary(req.file.path) : null;
  const newListing = new Listing({
    user: req.user.id,
    title,
    description,
    price,
    location,
    latitude,
    longitude,
    image: image ? image.secure_url : null,
  });
  await newListing.save();
  res.status(201).json(new ApiResponse('Listing created successfully', newListing));
});

const updateListingStatus = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { availabilityStatus } = req.body;
  const listing = await Listing.findById(id);
  if (!listing) {
    throw new ApiError('Listing not found', 404);
  }
  if (listing.user.toString() !== req.user.id) {
    throw new ApiError('Unauthorized action', 403);
  }
  listing.availabilityStatus = availabilityStatus;
  await listing.save();
  res.status(200).json(new ApiResponse('Listing status updated successfully', listing));
});

export { getAllListings, getListing, createListing, updateListingStatus };
