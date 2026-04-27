## Bookey | centralized platform to organize and manage your reading journey

<p align="center">
  <img src="./assets/logo.png" alt="Bookey Logo" width="120" />
</p>

<p align="center">
  A modern full-stack reading platform where users can track books, join clubs, share posts & quotes, and engage with a reading community.
</p>


## Live Demo

- Application live: https://bookey-app.vercel.app  


## Application Preview

<p align="center">
  <img src="./assets/app-preview.png" alt="Bookey UI" width="800" />
</p>


## Tech Stack

### Frontend
- React + Vite
- Tailwind CSS
- React Router
- Context API

### Backend
- Node.js
- Express.js
- MongoDB + Mongoose

### Deployment
- Vercel for Frontend
- Render for Backend


## Features

### Authentication
- Secure login & registration
- JWT based authentication
- Role based access

### Reading Tracker
- Track reading progress
- Update pages dynamically
- Mark books as completed or dropped

### Clubs System
- Create and manage clubs
- Join and Leave clubs
- View club details and members

### Posts & Quotes
- Create posts and quotes inside clubs
- Pagination
- Role based deletion system

### Role Permissions
- **User** → manage own content  
- **Moderator** → manage user posts  
- **Admin** → full control  

### UI/UX
- Clean and minimal design
- Responsive across devices
- Focused interaction flow


## Installation & Setup

### 1. Clone the repository

```bash
git clone https://github.com/awizp/bookey.git
cd bookey
cd backend
npm install
```

### 2. Create .env file

```bash
PORT=
MONGO_URI=
JWT_SECRET=
BASE_UI= 
```

### 3. Run Backend

```bash 
npm run dev 
```

## Author

- Vishnuprakash R

## License

- This project is licensed under the MIT License.