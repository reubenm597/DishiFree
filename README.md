DishiFree is a modern web application that connects food donors with receivers to reduce food waste and fight hunger in local communities. Share surplus food from events, hotels, restaurants, and homes with those in need.



Project Live Link:  https://dishifree-2.onrender.com

🌟 Features
🎯 For Donors
Easy Food Posting - Quickly list surplus food with details

Contact Management - Share pickup information securely

Listing Management - Track and manage your food donations

Real-time Updates - See when your food gets claimed




🎯 For Receivers
Browse Available Food - Discover surplus food in your area

Simple Claiming Process - One-click food claiming system

Direct Communication - Get donor contact details after claiming

Search & Filter - Find food by category and location



🛡️ Platform Features
User Authentication - Secure login/signup with JWT

Role-based Access - Separate dashboards for donors and receivers

Mobile Responsive - Works perfectly on all devices

Real-time Updates - Instant status changes

Beautiful UI - Modern, intuitive design

🚀 Quick Start
Prerequisites
Node.js (v14 or higher)

MongoDB Atlas account

Modern web browser

Installation
Clone the repository

bash
git clone https://github.com/reubenm597/DishiFree.git
cd dishifree
Backend Setup

bash
cd server
npm install

# Create .env file
cp .env.example .env
# Add your MongoDB Atlas URI and JWT secret
Frontend Setup

bash
cd ../client
npm install

# Create .env file
echo "REACT_APP_API_URL=http://localhost:5000" > .env
Run the Application

bash
# Terminal 1 - Backend
cd server
npm run dev

# Terminal 2 - Frontend
cd client
npm start
Access the Application

Frontend: http://localhost:3000

Backend API: http://localhost:5000



🛠️ Technology Stack
Frontend
React - Modern UI framework

React Router - Client-side routing

Axios - HTTP client for API calls

CSS3 - Custom styling with modern features

Backend
Node.js - Runtime environment

Express.js - Web application framework

MongoDB - NoSQL database

Mongoose - MongoDB object modeling

JWT - JSON Web Tokens for authentication

bcryptjs - Password hashing




Deployment
MongoDB Atlas - Cloud database

Render - Backend hosting

Render - Frontend hosting



📁 Project Structure



  
## 📁 Project Structure

```
dishifree/
├── client/                 # React frontend
│   ├── public/            # Static assets
│   └── src/
│       ├── components/     # Reusable components
│       │   ├── auth/       # Authentication components
│       │   ├── common/     # Shared components (Button, Modal, etc.)
│       │   ├── donor/      # Donor-specific components
│       │   └── receiver/   # Receiver-specific components
│       ├── context/        # React context providers
│       ├── pages/          # Page components
│       ├── styles/         # CSS stylesheets
│       └── package.json
└── server/                 # Express backend
    ├── config/             # Database configuration
    ├── controllers/        # Route controllers
    ├── middleware/         # Custom middleware
    ├── models/             # MongoDB models
    ├── routes/             # API routes
    └── server.js          # Entry point
```


🔐 API Endpoints
Authentication
POST /api/auth/register - User registration

POST /api/auth/login - User login

Food Listings
GET /api/food/available - Get available food listings

POST /api/food/create - Create new food listing (donors only)

PUT /api/food/claim/:id - Claim food listing (receivers only)

GET /api/food/my-listings - Get user's food listings

Users
GET /api/users/profile - Get user profile

PUT /api/users/profile - Update user profile

🎨 UI/UX Features
Modern Design - Clean, professional interface

Mobile-First - Responsive design for all devices

Intuitive Navigation - Easy-to-use dashboard system

Visual Feedback - Clear status indicators and animations

Accessibility - WCAG compliant design patterns

🌍 Environmental Impact
DishiFree helps combat food waste, which:

🍽️ Reduces landfill waste

💧 Conserves water and energy

🌱 Lowers greenhouse gas emissions

🤝 Supports local communities

🤝 Contributing
We welcome contributions! Please see our Contributing Guidelines for details.

Development Setup
Fork the repository

Create a feature branch (git checkout -b feature/amazing-feature)

Commit your changes (git commit -m 'Add amazing feature')

Push to the branch (git push origin feature/amazing-feature)

Open a Pull Request

📄 License
This project is licensed under the MIT License - see the LICENSE file for details.

🆘 Support
📧 Email: mwikyareuben597@gmail.com

🐛 Bug Reports: GitHub Issues

💡 Feature Requests: GitHub Discussions

🙏 Acknowledgments
Unsplash for beautiful food and community photography

MongoDB Atlas for providing the database infrastructure

React Community for excellent documentation and support

All our contributors who help make DishiFree better

<div align="center">
Made with ❤️ to fight food waste and feed communities

Join us in creating a world where no good food goes to waste
</div>






