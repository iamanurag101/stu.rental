import ApiResponse from '../utils/ApiResponse.js';

const errorMiddleware = (err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    ApiResponse.error(res, message, statusCode);
};

export default errorMiddleware;
