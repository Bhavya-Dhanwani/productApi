# Product API

## 📋 Project Overview

**Product API** is a complete RESTful API for managing e-commerce products with authentication. It's designed for e-commerce websites and includes user authentication, product CRUD operations, and image management. The API uses MongoDB for data persistence and JWT for secure authentication.

**Live URL:** `https://productapi-r93w.onrender.com`

## Features

-  User authentication (Sign-up & Login)
-  JWT-based secure token authentication
-  Product management (Create, Read, Update, Delete)
-  Product filtering by category
-  Image upload support (up to 4 images per product)
-  Password hashing with bcrypt
-  Cookie-based session management
-  Error handling and validation

---

## Authentication Flow

### Overview
The API uses JWT (JSON Web Tokens) for authentication. Tokens are generated during signup/login and stored in secure HTTP-only cookies.

### Auth Process:

#### 1. **Sign-Up**
```
POST /api/auth/signup
```
- User creates a new account with `name`, `email`, and `password`
- Password is hashed using bcrypt (10 salt rounds)
- JWT token is generated and stored in an HTTP-only cookie
- Cookie expires in 7 days
- Response includes user details (without password)

#### 2. **Login**
```
POST /api/auth/login
```
- User logs in with `email` and `password`
- Password is verified against the stored hash
- JWT token is generated and stored in an HTTP-only cookie
- Response includes user details (without password)

#### 3. **Token Verification**
- All protected endpoints (product creation, update, delete) check for the `product_token` cookie
- Token is verified against the JWT secret
- If valid, user information is attached to the request
- If invalid or missing, the request proceeds without user context (for public endpoints)

---

## Product Flow

### User Journey:

1. **User Signs Up/Logs In** → JWT token generated → Token stored in cookie
2. **User Creates Product** (Authenticated) → Product saved with image URLs → Product stored in database
3. **User Fetches Products** (Public) → Can filter by category → Returns all/filtered products
4. **User Updates Product** (Authenticated) → Upload new images → Product details updated
5. **User Deletes Product** (Authenticated) → Product removed from database

---

## API Endpoints

### **Authentication Endpoints**

#### 1. Sign-Up
```http
POST /api/auth/signup
```
**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securePassword123"
}
```

**Response (201):**
```json
{
  "success": true,
  "message": "User created successfully",
  "data": {
    "_id": "user_id",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

---

#### 2. Login
```http
POST /api/auth/login
```
**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "securePassword123"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Login successfully",
  "data": {
    "_id": "user_id",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

---

### **Product Endpoints**

#### 1. Create Product (Protected)
```http
POST /api/products
```
**Note:** Token is automatically sent via cookie.

**Request Body:**
```
name: "Laptop"
description: "High-performance laptop"
price: 1200
category: "Electronics"
images: [file1, file2, file3, file4] (up to 4 files)
```

**Response (201):**
```json
{
  "success": true,
  "message": "Product created successfully",
  "data": {
    "_id": "product_id",
    "name": "Laptop",
    "description": "High-performance laptop",
    "price": 1200,
    "category": "Electronics",
    "images": [
      {
        "url": "https://imagekit.io/...",
        "id": "image_id_1"
      }
    ]
  }
}
```

---

#### 2. Get All Products (Public)
```http
GET /api/products
GET /api/products?category=Electronics
```

**Response (200):**
```json
{
  "success": true,
  "message": "All products fetched successfully",
  "data": [
    {
      "_id": "product_id_1",
      "name": "Laptop",
      "description": "High-performance laptop",
      "price": 1200,
      "category": "Electronics",
      "images": [...]
    },
    {
      "_id": "product_id_2",
      "name": "Mouse",
      "description": "Wireless mouse",
      "price": 25,
      "category": "Electronics",
      "images": [...]
    }
  ]
}
```

---

#### 3. Get Product By ID (Public)
```http
GET /api/products/:id
```

**Response (200):**
```json
{
  "success": true,
  "message": "Product fetched successfully",
  "data": {
    "_id": "product_id",
    "name": "Laptop",
    "description": "High-performance laptop",
    "price": 1200,
    "category": "Electronics",
    "images": [...]
  }
}
```

---

#### 4. Update Product (Protected)
```http
PUT /api/products/:id
```
**Note:** Token is automatically sent via cookie.

**Request Body:**
```
name: "Gaming Laptop"
description: "High-performance gaming laptop"
price: 1500
category: "Electronics"
images: [file1, file2] (optional, up to 4 files)
```

**Response (201):**
```json
{
  "success": true,
  "message": "Product created successfully",
  "data": {
    "_id": "product_id",
    "name": "Gaming Laptop",
    "description": "High-performance gaming laptop",
    "price": 1500,
    "category": "Electronics",
    "images": [...]
  }
}
```

---

#### 5. Delete Product (Protected)
```http
DELETE /api/products/:id
```

**Response (204):**
```json
{
  "success": true,
  "message": "Deleted the product successfully"
}
```

---

## Data Structure

### **User Model**
```javascript
{
  _id: ObjectId,
  name: String (required),
  email: String (required, unique),
  password: String (hashed)
}
```

### **Product Model**
```javascript
{
  _id: ObjectId,
  name: String (required),
  description: String,
  price: Number (required),
  category: String (default: "general"),
  images: [
    {
      url: String,
      id: String
    }
  ]
}
```

---

## How to Accept Data

### Form Data (For File Uploads)
When uploading images (create/update products), use `multipart/form-data`:
```
name: "Laptop"
description: "Product description"
price: 1200
category: "Electronics"
images: [file1, file2, file3, file4]
```

### JSON Data (For Authentication)
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

---

## Response Format

All API responses follow a consistent format:

**Success Response:**
```json
{
  "success": true,
  "message": "Operation completed",
  "data": { /* response data */ }
}
```

**Error Response:**
```json
{
  "success": false,
  "message": "Error description"
}
```

**Status Codes:**
- `200` - OK (Successful GET/POST requests)
- `201` - Created (Successful POST/PUT requests)
- `204` - No Content (Successful DELETE requests)
- `400` - Bad Request (Invalid input)
- `401` - Unauthorized (Missing/invalid token)
- `404` - Not Found (Resource not found)
- `500` - Server Error

---

## Data Flow Architecture

### **Authentication Flow (Sign-up/Login) - Step by Step**

```
CLIENT REQUEST
    ↓
POST /api/auth/signup or /api/auth/login
    ↓
ROUTE (auth.router.js)
    ├─ Routes request to controller
    ↓
MIDDLEWARE (asyncwrapper)
    ├─ Wraps controller in try-catch for error handling
    ↓
CONTROLLER (auth.controller.js)
    ├─ Extracts { name, email, password } from req.body
    ├─ Calls signupService() or loginService()
    ↓
SERVICE (auth.service.js)
    ├─ Validates user data
    ├─ Checks if user already exists (for signup)
    ├─ Creates new user or verifies password (for login)
    ↓
MODEL (user.model.js)
    ├─ Pre-save hook: Hashes password with bcrypt
    ├─ Saves user to MongoDB
    ├─ Generates JWT token (7 days expiry)
    ↓
DATABASE (MongoDB)
    └─ Stores user record
    ↓
RESPONSE BACK TO CONTROLLER
    ├─ User object + JWT token returned
    ↓
CONTROLLER
    ├─ Sets JWT token in HTTP-only cookie (product_token)
    ├─ Cookie expires in 7 days
    ├─ Calls ApiResponse with user data
    ↓
CLIENT BROWSER
    ├─ Receives user data
    ├─ Cookie automatically stored by browser
    └─ Ready for next authenticated requests
```

---

### **Create Product Flow - Complete Data Journey**

```
CLIENT (Browser/Postman)
    └─ Sends: POST /api/products with form data + cookie
    ↓
SERVER RECEIVES REQUEST
    ├─ URL: /api/products
    ├─ Body: { name, description, price, category }
    ├─ Files: [image1, image2, ...]
    └─ Cookie: product_token=<jwt_token>
    ↓
ROUTE MATCHING (products.router.js)
    └─ Matches: POST /api/products
    ↓
MIDDLEWARE STACK EXECUTES IN ORDER:

    1️⃣  AUTH MIDDLEWARE (auth.middleware.js)
        ├─ Reads: req.cookies.product_token
        ├─ Verifies JWT signature against JWT_SECRET
        ├─ Decodes token → { id, name, email }
        ├─ Sets: req.user = decoded token data
        └─ Calls next()
    
    2️⃣  UPLOAD MIDDLEWARE (multer.config.js)
        ├─ Processes multipart/form-data
        ├─ Reads files from request
        ├─ Validates: Max 4 files allowed
        ├─ Temporarily stores files
        ├─ Sets: req.files = [processed_files]
        └─ Calls next()
    
    3️⃣  ASYNC WRAPPER MIDDLEWARE
        └─ Wraps controller in try-catch error handler
    ↓
CONTROLLER (products.controller.js → createProduct)
    ├─ Checks: if (!req.user) → throw unauthorized error
    ├─ Extracts form data:
    │  ├─ name = req.body.name
    │  ├─ description = req.body.description
    │  ├─ price = req.body.price
    │  └─ category = req.body.category
    ├─ Gets files: req.files
    ├─ Calls: createService(req.files, name, description, price, category)
    └─ Waits for service response
    ↓
SERVICE (product.service.js → createService)
    ├─ Loops through each file in req.files:
    │  ├─ Upload file to ImageKit CDN
    │  ├─ ImageKit returns: { url, id }
    │  └─ Adds to images array
    │
    ├─ After all files uploaded, creates product object:
    │  {
    │    name: "Laptop",
    │    description: "High-performance laptop",
    │    price: 1200,
    │    category: "Electronics",
    │    images: [
    │      { url: "https://imagekit.io/...", id: "imagekit_id_1" },
    │      { url: "https://imagekit.io/...", id: "imagekit_id_2" }
    │    ]
    │  }
    │
    ├─ Calls: productModel.create(productObject)
    └─ Waits for database response
    ↓
MODEL (product.model.js)
    ├─ Receives product object
    ├─ Validates against schema:
    │  ├─ name required? ✓
    │  ├─ price required? ✓
    │  └─ All fields valid? ✓
    ├─ Calls MongoDB: insert one
    └─ Returns saved product with MongoDB _id
    ↓
DATABASE (MongoDB)
    ├─ Receives product document
    ├─ Generates unique ObjectId: _id
    ├─ Stores in 'products' collection:
    │  {
    │    _id: "507f1f77bcf86cd799439011",
    │    name: "Laptop",
    │    description: "High-performance laptop",
    │    price: 1200,
    │    category: "Electronics",
    │    images: [{ url, id }, { url, id }]
    │  }
    └─ Returns saved document
    ↓
SERVICE RECEIVES RESPONSE
    ├─ Gets back: complete product with _id
    └─ Returns to controller
    ↓
CONTROLLER RECEIVES RESPONSE
    ├─ Gets: { _id, name, price, images, ... }
    ├─ Calls: ApiResponse(res, 201, "Product created successfully", product)
    └─ Passes to response utility
    ↓
API RESPONSE UTILITY (ApiResponse.util.js)
    ├─ Formats response:
    │  {
    │    "success": true,
    │    "message": "Product created successfully",
    │    "data": {
    │      "_id": "507f1f77bcf86cd799439011",
    │      "name": "Laptop",
    │      "price": 1200,
    │      "images": [...]
    │    }
    │  }
    ├─ Sets HTTP status: 201 Created
    └─ Sends JSON response
    ↓
CLIENT BROWSER/POSTMAN
    ├─ Receives HTTP 201
    ├─ Parses JSON response
    ├─ Shows success message
    └─ Product successfully created and stored!
```

---

### **Get Products Flow**

```
CLIENT
    └─ GET /api/products?category=Electronics
    ↓
ROUTE → products.router.js
    ├─ Matches GET /api/products
    ↓
MIDDLEWARE:
    ├─ authMiddleware: Runs but doesn't block (optional for public endpoint)
    ├─ asyncwrapper: Wraps controller
    ↓
CONTROLLER (getProducts)
    ├─ Reads query params: req.query.category = "Electronics"
    ├─ Calls: getAllProducts("Electronics")
    ↓
SERVICE (getAllProducts)
    ├─ If category provided:
    │  └─ MongoDB query: { category: "Electronics" }
    ├─ If no category:
    │  └─ MongoDB query: {} (all products)
    ↓
DATABASE (MongoDB)
    ├─ Searches 'products' collection
    ├─ Returns all matching documents
    ↓
SERVICE RECEIVES ARRAY
    ├─ Gets: [{ _id, name, price, category, ... }, ...]
    └─ Returns array to controller
    ↓
CONTROLLER
    ├─ Calls: ApiResponse(res, 200, "All products fetched successfully", products)
    ↓
RESPONSE UTILITY
    ├─ Formats and sends HTTP 200
    ↓
CLIENT
    └─ Receives all/filtered products in array
```

---

### **Update Product Flow**

```
CLIENT
    └─ PUT /api/products/:id with new data + cookie
    ↓
MIDDLEWARE CHAIN:
    ├─ Auth: Verify req.user exists
    ├─ Upload: Process new images
    ├─ Async wrapper: Error handling
    ↓
CONTROLLER (UpdateProducts)
    ├─ Checks: req.user exists? ✓
    ├─ Extracts: product ID from req.params.id
    ├─ Extracts: new data from req.body
    ├─ Calls: updateService(req.files, ..., id)
    ↓
SERVICE
    ├─ Finds existing product by ID
    ├─ If new images provided:
    │  ├─ Uploads new images to ImageKit
    │  └─ Gets new URLs and IDs
    ├─ Updates fields:
    │  ├─ name, description, price, category
    │  └─ images (if new ones provided)
    ├─ Saves to MongoDB
    ↓
DATABASE
    ├─ Updates product document
    └─ Returns updated document
    ↓
CONTROLLER
    ├─ Calls: ApiResponse with updated product
    ↓
CLIENT
    └─ Receives updated product
```

---

### **Delete Product Flow**

```
CLIENT
    └─ DELETE /api/products/:id + cookie
    ↓
MIDDLEWARE:
    ├─ Auth: Verify req.user exists
    ├─ Async wrapper: Error handling
    ↓
CONTROLLER (deleteProduct)
    ├─ Checks: req.user exists? ✓
    ├─ Extracts: product ID from req.params.id
    ├─ Calls: delteService(id)
    ↓
SERVICE
    ├─ Finds product by ID
    ├─ Deletes from MongoDB
    ↓
DATABASE
    ├─ Removes product document
    ↓
CONTROLLER
    ├─ Calls: ApiResponse(res, 204, "Deleted successfully")
    ↓
CLIENT
    └─ Receives HTTP 204 (No Content)
```

---

### **Middleware Processing Order (for Protected Endpoints)**

When you make a **POST /api/products** request:

```
1. CLIENT sends request to server
   └─ Includes: body data, files, cookie

2. EXPRESS RECEIVES REQUEST
   └─ Matches route in products.router.js

3. MIDDLEWARE #1 - authMiddleware
   ├─ Reads: req.cookies.product_token
   ├─ JWT Verification:
   │  ├─ Verifies signature
   │  ├─ Checks expiration
   │  └─ Decodes payload
   ├─ Sets: req.user = decoded payload
   └─ Calls: next() → Continues to next middleware

4. MIDDLEWARE #2 - upload.array("images", 4)
   ├─ Processes multipart form-data
   ├─ Reads uploaded files
   ├─ Validates: Max 4 files
   ├─ Stores in temporary location
   ├─ Sets: req.files = [...files]
   └─ Calls: next() → Continues to next middleware

5. MIDDLEWARE #3 - asyncwrapper
   ├─ Wraps controller execution
   ├─ Provides try-catch error handling
   └─ Calls: controller function

6. CONTROLLER executes
   ├─ All middlewares completed
   ├─ Has access to: req.user, req.files, req.body
   ├─ Calls service
   └─ Returns response

7. ERROR MIDDLEWARE (if error occurs)
   ├─ Catches error
   ├─ Formats error response
   └─ Sends to client

8. RESPONSE sent to client
   └─ Client receives data/error
```

---

### **Error Handling Flow**

```
Any error thrown in controller/service
    ↓
Caught by asyncwrapper middleware (try-catch)
    ↓
Error passed to error middleware
    ↓
Error middleware:
    ├─ Checks error type
    ├─ Extracts: statusCode, message
    ├─ Formats:
    │  {
    │    "success": false,
    │    "message": "Error description"
    │  }
    └─ Sends response with error status
    ↓
CLIENT receives error response with proper status code
```

---

### **Complete Project Structure & Data Flow**

```
REQUEST LIFECYCLE:
════════════════════════════════════════════════════════════════

1. CLIENT REQUEST
   └─ Browser/Postman sends HTTP request

2. SERVER (server.js)
   └─ Node.js process receives request

3. APP SETUP (src/app.js)
   ├─ Express app initialized
   ├─ Middleware configured
   └─ Routes connected

4. ROUTE MATCHING (src/router/main.router.js)
   ├─ /api/auth → auth.router.js
   └─ /api/products → products.router.js

5. SPECIFIC ROUTER (auth.router.js or products.router.js)
   ├─ Matches endpoint
   ├─ Applies specific middleware
   └─ Routes to controller

6. MIDDLEWARE EXECUTION (src/middlewares/)
   ├─ authMiddleware: JWT verification
   ├─ multer: File upload handling
   └─ errorMiddleware: Error catching

7. CONTROLLER (src/controllers/)
   ├─ Receives: req (with user, files, body)
   ├─ Validates data
   └─ Calls service layer

8. SERVICE (src/services/)
   ├─ Business logic execution
   ├─ Data transformation
   ├─ External API calls (ImageKit)
   └─ Prepares for database

9. MODEL (src/models/)
   ├─ Schema validation
   ├─ Data formatting
   └─ MongoDB interaction

10. DATABASE (MongoDB)
    ├─ Stores/retrieves data
    └─ Returns result to model

11. RESPONSE CHAIN (back up)
    ├─ Model → Service → Controller
    ├─ ApiResponse utility formats response
    └─ HTTP response sent

12. CLIENT RECEIVES RESPONSE
    ├─ Status code + JSON body
    ├─ Browser processes response
    └─ User sees result
```

---

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- MongoDB URI
- ImageKit account for image hosting

### Installation Steps

1. **Clone the repository**
```bash
git clone <repository_url>
cd 03productAPI
```

2. **Install dependencies**
```bash
npm i
```

3. **Setup environment variables**
Create a `.env` file in the root directory:
```env
PORT=5000

MONGODB_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret_key

IMAGEKIT_PUBLIC_KEY=your_imagekit_public_key
IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
URL_ENDPOINT=your_imagekit_url_endpoint
```

4. **Start the development server**
```bash
npm run dev
```

The server will start on `http://localhost:5000` or directly use the live link

---

## Testing the API

### Option 1: Using Postman with Live URL

1. **Download Postman** from https://www.postman.com/downloads/

2. **Base URL:** `https://productapi-r93w.onrender.com`

3. **Test Authentication Endpoints:**
   - Create a new POST request
   - URL: `https://productapi-r93w.onrender.com/api/auth/signup`
   - Body (JSON): 
     ```json
     {
       "name": "Test User",
       "email": "test@example.com",
       "password": "testpass123"
     }
     ```
   - Send request

4. **Test Product Endpoints:**
   - Create a new POST request for product creation
   - URL: `https://productapi-r93w.onrender.com/api/products`
   - Body (form-data):
     - name: `Test Product`
     - description: `This is a test product`
     - price: `99.99`
     - category: `Electronics`
     - images: [select files]
   - Send request

5. **Test GET endpoints:**
   - Create a new GET request
   - URL: `https://productapi-r93w.onrender.com/api/products`
   - Send request

### Option 2: Using cURL

```bash
# Sign-up
curl -X POST https://productapi-r93w.onrender.com/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "password": "testpass123"
  }'

# Login
curl -X POST https://productapi-r93w.onrender.com/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "testpass123"
  }'

# Get all products
curl -X GET https://productapi-r93w.onrender.com/api/products

# Get products by category
curl -X GET "https://productapi-r93w.onrender.com/api/products?category=Electronics"
```

### Option 3: Using Local Development

1. After running `npm run dev`, the server runs on `http://localhost:5000`

2. Use the same endpoints as live URL but replace base URL with `http://localhost:5000`

3. Example:
```bash
curl -X POST http://localhost:5000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "password": "testpass123"
  }'
```

---

## Important Notes

- **Tokens:** Stored in HTTP-only cookies (`product_token`). Token is automatically sent with every request via cookies. No Authorization headers needed.
- **Cookie-based Auth:** The API extracts token from `req.cookies.product_token`. Browser automatically includes cookies in requests.
- **Image Upload:** Uses ImageKit for CDN storage. Supports up to 4 images per product.
- **Authentication:** Protected endpoints require valid JWT token (automatically sent via cookie).
- **CORS:** Configured for cross-origin requests from web frontends.
- **Database:** MongoDB must be running and URI must be configured.

---

## Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB with Mongoose
- **Authentication:** JWT & bcryptjs
- **Image Hosting:** ImageKit
- **File Upload:** Multer
- **Development:** Nodemon

---

## License

ISC License - See package.json for details

---

## Author

**Bhavya**

---

## Use Cases

- **E-commerce Platforms:** Full product management with user authentication
- **Inventory Management:** Create, update, and delete products
- **Product Catalog:** Publicly accessible product listings with filtering
- **Multi-user Systems:** Each user can manage their own products

---

## Quick Links

- **Live API:** https://productapi-r93w.onrender.com
- **Health Check:** https://productapi-r93w.onrender.com/ping
- **MongoDB:** MongoDB Atlas or Local MongoDB instance
- **ImageKit:** https://imagekit.io

