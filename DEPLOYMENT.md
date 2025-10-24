# ShopMate Deployment Guide

## Prerequisites

- GitHub account with your code pushed
- MongoDB Atlas account
- Render account

## Step 1: Setup MongoDB Atlas

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster
3. Create a database user with username and password
4. Whitelist your IP address
5. Get your connection string (looks like: `mongodb+srv://username:password@cluster.mongodb.net/shopmate`)

## Step 2: Deploy Backend on Render

1. Go to [Render.com](https://render.com)
2. Click "New +" and select "Web Service"
3. Connect your GitHub repository
4. Fill in the details:
   - **Name**: shopmate-backend
   - **Runtime**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Root Directory**: server

5. Add environment variables:
   - `MONGO_URI`: Your MongoDB connection string
   - `JWT_SECRET`: Generate a random secret (e.g., using `openssl rand -base64 32`)
   - `PORT`: 5000

6. Click "Create Web Service"
7. Wait for deployment to complete
8. Copy your backend URL (e.g., `https://shopmate-backend.onrender.com`)

## Step 3: Deploy Frontend on Render

1. Go to [Render.com](https://render.com)
2. Click "New +" and select "Static Site"
3. Connect your GitHub repository
4. Fill in the details:
   - **Name**: shopmate-frontend
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: build
   - **Root Directory**: client

5. Add environment variables:
   - `REACT_APP_API_URL`: Your backend URL from Step 2 (e.g., `https://shopmate-backend.onrender.com`)

6. Click "Create Static Site"
7. Wait for deployment to complete
8. Your frontend will be available at the provided URL

## Step 4: Test Your Deployment

1. Visit your frontend URL
2. Register a new account
3. Browse products
4. Add items to cart
5. Place an order
6. Check admin dashboard

## Troubleshooting

### Backend deployment fails
- Check build logs in Render dashboard
- Verify all dependencies are in `package.json`
- Ensure environment variables are set correctly

### Frontend can't connect to backend
- Verify `REACT_APP_API_URL` is set to your backend URL
- Check CORS settings in backend
- Ensure backend is running

### Database connection fails
- Verify MongoDB connection string
- Check if IP is whitelisted in MongoDB Atlas
- Ensure database user has correct permissions

## Monitoring

- Monitor your deployments in Render dashboard
- Check logs for errors
- Set up email notifications for deployment failures

## Scaling

As your application grows:
- Upgrade MongoDB Atlas cluster
- Upgrade Render plan for better performance
- Consider adding caching (Redis)
- Implement CDN for static assets
