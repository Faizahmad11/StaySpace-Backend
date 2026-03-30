# StaySpace Backend - Quick Start Guide

## ✅ What's Been Created

Your complete Node.js/Express backend is ready in the `/backend` folder with:
- User authentication (signup, login, social login)
- Property listing management (create, read, update, delete)
- Email support system
- MongoDB integration
- JWT token-based auth
- Input validation & error handling

## 🚀 Quick Start (3 Steps)

### Step 1: Configure Environment
Edit `backend/.env` file:
```env
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/stayspace
JWT_SECRET=your_secret_key_here
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password
SUPPORT_EMAIL=support@stayspace.com
FRONTEND_URL=http://localhost:3000
PORT=5000
```

### Step 2: Start MongoDB
```bash
# Make sure MongoDB is running
mongod
```

### Step 3: Start Backend Server
```bash
cd backend
npm start
```

Server will run at: **http://localhost:5000/api**

## 📋 API Endpoints

**Authentication:**
- POST `/api/signup` - Register
- POST `/api/login` - Login  
- POST `/api/social-login` - Google/Facebook

**Listings:**
- POST `/api/listing` - Create (auth required)
- GET `/api/listing` - Get all
- GET `/api/listing/user/:userId` - Get user's (auth required)
- DELETE `/api/listing/:id` - Delete (auth required)

**Email:**
- POST `/api/send-email` - Send support email

## 🧪 Test with Curl

```bash
# Signup
curl -X POST http://localhost:5000/api/signup \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "username": "testuser",
    "password": "password123",
    "phone": "9999999999",
    "role": "tenant"
  }'

# Login
curl -X POST http://localhost:5000/api/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'

# Get all listings
curl http://localhost:5000/api/listing
```

## 📁 Backend Structure

```
backend/
├── server.js              # Main app
├── package.json          # Dependencies (already installed)
├── .env                  # Configuration (edit this!)
├── config/db.js          # MongoDB connection
├── models/               # Database schemas
├── controllers/          # Business logic
├── routes/               # API endpoints
├── middleware/           # Auth, error handling
└── utils/                # Validators, file upload
```

## ⚙️ Environment Setup

### MongoDB Options:

**Option 1: Local MongoDB**
```env
MONGODB_URI=mongodb://localhost:27017/stayspace
```

**Option 2: MongoDB Atlas (Cloud)**
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/stayspace
```

### Email Setup (Gmail):

1. Enable 2FA on Gmail
2. Generate App Password: https://myaccount.google.com/apppasswords
3. Use app password in `.env` (SMTP_PASS)

## 🔗 Frontend Integration

Frontend is already configured to use:
- API Base: `http://localhost:5000/api`
- The frontend will work automatically once backend is running

Just run in root folder:
```bash
npm start    # Starts frontend on 3000
```

## 🆘 Troubleshooting

**MongoDB Connection Error:**
- Ensure MongoDB is running: `mongod`
- Check if service: `C:\Program Files\MongoDB\bin\mongod.exe`

**Port 5000 Already in Use:**
- Change PORT in `.env` to different number
- Or kill process: `lsof -i :5000`

**Email Not Sending:**
- Check Gmail credentials in `.env`
- Use app-specific password, not regular password
- Enable "Less secure apps" if not using 2FA

**CORS Errors:**
- Ensure FRONTEND_URL in `.env` matches your frontend origin
- Default: `http://localhost:3000`

## 📚 Full Documentation

See `backend/README.md` for detailed API documentation and examples.

## ✨ That's It!

Your backend is ready. Configure `.env` and run:
```bash
cd backend
npm start
```

Happy coding! 🎉

