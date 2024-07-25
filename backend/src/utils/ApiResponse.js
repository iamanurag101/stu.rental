class ApiResponse {
    constructor(message, data) {
        this.message = message;
        this.data = data;
    }
  
    static success(res, message, data, statusCode = 200) {
        res.status(statusCode).json(new ApiResponse(message, data));
    }
  
    static error(res, message, statusCode = 400) {
        res.status(statusCode).json(new ApiResponse(message, null));
    }
  }
  
export default ApiResponse;
  