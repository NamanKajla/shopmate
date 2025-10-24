# ShopMate - MERN E-commerce Application

A complete, fully functional E-commerce web application built with the MERN stack (MongoDB, Express, React.js, Node.js).

## Features

- User authentication with JWT
- Product browsing with search and filtering
- Shopping cart management
- Order placement and tracking
- Admin dashboard for product and order management
- Responsive design for desktop and mobile
- Mock payment gateway

## Tech Stack

**Frontend:**
- React.js
- React Router for navigation
- Context API for state management
- Axios for API calls
- Tailwind CSS for styling

**Backend:**
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT authentication
- bcryptjs for password hashing

**Database:**
- MongoDB Atlas

## Project Structure

\`\`\`
shopmate/
├── client/                 # React frontend
│   ├── public/
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── pages/         # Page components
│   │   ├── context/       # Context API
│   │   ├── App.js
│   │   ├── index.js
│   │   └── styles.css
│   ├── package.json
│   └── .env.example
├── server/                # Node.js backend
│   ├── config/           # Database config
│   ├── models/           # MongoDB schemas
│   ├── routes/           # API routes
│   ├── controllers/       # Route handlers
│   ├── middleware/        # Auth middleware
│   ├── server.js
│   ├── package.json
│   └── .env.example
└── README.md
\`\`\`

## Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB Atlas account
- npm or yarn

### Backend Setup

1. Navigate to the server directory:
\`\`\`bash
cd server
\`\`\`

2. Install dependencies:
\`\`\`bash
npm install
\`\`\`

3. Create a `.env` file based on `.env.example`:
\`\`\`
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/shopmate
JWT_SECRET=your_jwt_secret_key_here
PORT=5000
\`\`\`

4. Start the backend server:
\`\`\`bash
npm run dev
\`\`\`

The backend will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to the client directory:
\`\`\`bash
cd client
\`\`\`

2. Install dependencies:
\`\`\`bash
npm install
\`\`\`

3. Create a `.env` file based on `.env.example`:
\`\`\`
REACT_APP_API_URL=http://localhost:5000
\`\`\`

4. Start the frontend development server:
\`\`\`bash
npm start
\`\`\`

The frontend will run on `http://localhost:3000`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (protected)

### Products
- `GET /api/products` - Get all products (with pagination, search, filter)
- `GET /api/products/:id` - Get product by ID
- `POST /api/products` - Create product (admin only)
- `PUT /api/products/:id` - Update product (admin only)
- `DELETE /api/products/:id` - Delete product (admin only)

### Orders
- `POST /api/orders` - Create order (protected)
- `GET /api/orders/my-orders` - Get user's orders (protected)
- `GET /api/orders` - Get all orders (admin only)
- `PUT /api/orders/:id` - Update order status (admin only)

## Usage

### User Flow
1. Register or login to your account
2. Browse products with search and filtering
3. Add products to cart
4. Proceed to checkout
5. Place order
6. View order history in dashboard

### Admin Flow
1. Login with admin account
2. Access admin dashboard
3. Add, edit, or delete products
4. View and manage orders
5. Update order status

## Deployment on Render

### Backend Deployment

1. Push your code to GitHub
2. Go to [Render.com](https://render.com)
3. Create a new Web Service
4. Connect your GitHub repository
5. Set environment variables:
   - `MONGO_URI`: Your MongoDB Atlas connection string
   - `JWT_SECRET`: Your JWT secret key
6. Deploy

### Frontend Deployment

1. Build the frontend:
\`\`\`bash
cd client
npm run build
\`\`\`

2. Go to [Render.com](https://render.com)
3. Create a new Static Site
4. Connect your GitHub repository
5. Set build command: `npm run build`
6. Set publish directory: `build`
7. Deploy

## Environment Variables

### Backend (.env)
\`\`\`
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/shopmate
JWT_SECRET=your_jwt_secret_key_here
PORT=5000
\`\`\`

### Frontend (.env)
\`\`\`
REACT_APP_API_URL=http://localhost:5000
\`\`\`

For production, update `REACT_APP_API_URL` to your deployed backend URL.

## Database Schema

### User
\`\`\`javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  isAdmin: Boolean,
  createdAt: Date,
  updatedAt: Date
}
\`\`\`

### Product
\`\`\`javascript
{
  name: String,
  description: String,
  price: Number,
  category: String,
  imageURL: String,
  stock: Number,
  rating: Number,
  createdAt: Date,
  updatedAt: Date
}
\`\`\`

### Order
\`\`\`javascript
{
  user: ObjectId (ref: User),
  items: [
    {
      product: ObjectId (ref: Product),
      quantity: Number,
      price: Number
    }
  ],
  totalPrice: Number,
  status: String (Pending, Shipped, Delivered, Cancelled),
  createdAt: Date,
  updatedAt: Date
}
\`\`\`

## Features Implemented

- [x] User authentication with JWT
- [x] Product management (CRUD)
- [x] Shopping cart
- [x] Order management
- [x] Admin dashboard
- [x] Search and filtering
- [x] Pagination
- [x] Responsive design
- [x] Error handling
- [x] Input validation

## Future Enhancements

- [ ] Real payment gateway integration (Stripe/PayPal)
- [ ] Product reviews and ratings
- [ ] Wishlist functionality
- [ ] Email notifications
- [ ] Advanced analytics
- [ ] Inventory management
- [ ] Multiple payment methods
- [ ] Coupon/discount system

## Troubleshooting

### Backend won't connect to MongoDB
- Verify your MongoDB Atlas connection string
- Check if your IP is whitelisted in MongoDB Atlas
- Ensure `MONGO_URI` is correctly set in `.env`

### Frontend can't connect to backend
- Verify backend is running on `http://localhost:5000`
- Check `REACT_APP_API_URL` in frontend `.env`
- Ensure CORS is enabled in backend

### Port already in use
- Change the PORT in backend `.env`
- For frontend, use: `PORT=3001 npm start`

## License

MIT License

## Support

For issues or questions, please open an issue on GitHub.
