import express from 'express';
import { getAllListings, getListing, createListing, updateListingStatus } from '../controllers/listing.controller.js';
import authMiddleware from '../middlewares/auth.middleware.js';
import multerMiddleware from '../middlewares/multer.middleware.js';

const router = express.Router();

router.get('/', getAllListings);
router.get('/:id', getListing);
router.post('/', authMiddleware, multerMiddleware.single('image'), createListing);
router.put('/:id/status', authMiddleware, updateListingStatus);

export default router;
