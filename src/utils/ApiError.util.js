// Making a custom error class to handle the errors in a structured way 
class ApiError extends Error {
    constructor(statusCode, message) {

        // Inheriting the messgae form parent class
        super(message);

        // Addind the data in the class variables 
        this.statusCode = statusCode;
        this.message = message;
        
    }
}

export default ApiError;