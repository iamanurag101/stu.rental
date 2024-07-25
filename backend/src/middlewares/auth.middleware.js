import jwt from 'jsonwebtoken';
import asyncHandler from '../utils/asyncHandler.js';
import ApiError from '../utils/ApiError.js';
import User from '../models/user.model.js';

const authMiddleware = asyncHandler(async (req, res, next) => {
    const token = req.header('Authorization').replace('Bearer ', '');
    if (!token) {
        throw new ApiError('No token provided', 401);
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id);
        if (!user) {
            throw new ApiError('User not found', 404);
        }
        req.user = user;
        next();
    } 
    
    catch (error) {
        throw new ApiError('Invalid token', 401);
    }
});

export default authMiddleware;
