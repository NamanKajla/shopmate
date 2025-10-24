# ShopMate Setup Guide

## Local Development Setup

### 1. Clone the Repository

\`\`\`bash
git clone <your-repo-url>
cd shopmate
\`\`\`

### 2. Backend Setup

\`\`\`bash
cd server

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Edit .env with your MongoDB URI and JWT secret
# MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/shopmate
# JWT_SECRET=your_secret_key

# Start the server
npm run dev
\`\`\`

The backend will run on `http://localhost:5000`

### 3. Frontend Setup

\`\`\`bash
cd ../client

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# The .env should contain:
# REACT_APP_API_URL=http://localhost:5000

# Start the frontend
npm start
\`\`\`

The frontend will run on `http://localhost:3000`

## Creating Test Data

### 1. Register a User

1. Go to `http://localhost:3000/register`
2. Create an account with:
   - Name: Test User
   - Email: test@example.com
   - Password: password123

### 2. Create an Admin User (via MongoDB)

Connect to your MongoDB and run:

\`\`\`javascript
db.users.updateOne(
  { email: "test@example.com" },
  { $set: { isAdmin: true } }
)
\`\`\`

### 3. Add Sample Products

1. Login with your admin account
2. Go to Admin Dashboard
3. Add products with:
   - Name: Product Name
   - Description: Product description
   - Price: 99.99
   - Category: Electronics
   - Stock: 50
   - Rating: 4.5

## API Testing

### Using cURL

\`\`\`bash
# Register
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@example.com","password":"password123"}'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'

# Get Products
curl http://localhost:5000/api/products

# Get Product by ID
curl http://localhost:5000/api/products/PRODUCT_ID
\`\`\`

### Using Postman

1. Import the API endpoints
2. Set up environment variables for token
3. Test each endpoint

## Common Issues

### Port Already in Use

\`\`\`bash
# Kill process on port 5000 (backend)
lsof -ti:5000 | xargs kill -9

# Kill process on port 3000 (frontend)
lsof -ti:3000 | xargs kill -9
\`\`\`

### MongoDB Connection Error

- Verify connection string
- Check IP whitelist in MongoDB Atlas
- Ensure database user has correct permissions

### CORS Error

- Verify backend CORS is enabled
- Check frontend API URL matches backend

## Development Tips

1. Use React DevTools for debugging
2. Use MongoDB Compass for database management
3. Use Postman for API testing
4. Check browser console for frontend errors
5. Check server logs for backend errors

## Next Steps

1. Customize styling
2. Add more product categories
3. Implement real payment gateway
4. Add product reviews
5. Deploy to production
