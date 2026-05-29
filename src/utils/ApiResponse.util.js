// Making a function to send responses in a structured way
function ApiResponse(res, status, message, data = null) {
    
    // Returning the response
    return res.status(status).json({
        success: true,
        message,
        data
    });
    
}

export default ApiResponse;