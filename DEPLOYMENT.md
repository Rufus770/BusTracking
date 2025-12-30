# Bus Tracking App - Deployment Guide

## Backend Deployment (Render)

### Step 1: Deploy to Render
1. Go to https://render.com and sign up/login
2. Click "New +" → "Web Service"
3. Connect your GitHub repository: `https://github.com/Rufus770/BusTracking`
4. Configure the service:
   - **Name**: bus-tracking-backend (or any name)
   - **Root Directory**: `backend`
   - **Environment**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: Free

### Step 2: Add Environment Variables on Render
In the "Environment" section, add:
- `MONGO_URI`: Your MongoDB connection string (use MongoDB Atlas for free cloud database)
- `JWT_SECRET`: a_random_secret_string_12345
- `PORT`: (leave empty, Render sets this automatically)

### Step 3: Get Your Backend URL
After deployment, Render will give you a URL like:
`https://bus-tracking-backend.onrender.com`

## MongoDB Atlas Setup (Free Cloud Database)

1. Go to https://www.mongodb.com/cloud/atlas
2. Sign up and create a free cluster
3. Create a database user
4. Whitelist all IP addresses (0.0.0.0/0) for testing
5. Get your connection string and add it to Render environment variables

## Frontend Update

After backend is deployed, update these files with your backend URL:

1. `frontend/src/services/authService.js` - Line 3
2. `frontend/src/services/busService.js` - Line 3
3. `frontend/src/pages/BusSelectionPage.js` - Line 35
4. `frontend/src/pages/MapViewPage.js` - Line 25

Replace `http://localhost:5005` with your Render backend URL.

## Redeploy Frontend on Netlify

After updating the URLs:
1. Commit and push changes to GitHub
2. Netlify will automatically redeploy
3. Your app should now work!

## Testing

- Frontend URL: Your Netlify URL
- Backend URL: Your Render URL
- Test driver login: username=driver, password=driver123
- Test student registration and login
