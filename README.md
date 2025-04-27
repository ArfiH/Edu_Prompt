
---

# 🚀 **Edu Prompt**

> Learn smarter: Watch, write, and elevate your knowledge with AI-powered notes.

---

## 📌 Problem Statement

**Personalized Learning Solution with AI**

---

## 🎯 Objective

**Edu Prompt** empowers students and lifelong learners to **take smart notes while watching educational videos**. It allows users to annotate content, generate AI summaries, quizzes, and flashcards, enhancing their retention and understanding.

Built for learners who struggle to organize information across YouTube videos, notes, and flashcards, this app creates an **all-in-one platform for intelligent study**.

---

## 🛠️ Tech Stack

### Core Technologies Used:

- **Frontend:** React.js, TipTap Editor, Lucide Icons, Tailwind CSS  
- **Backend:** Node.js, Express.js  
- **Database:** MongoDB (Mongoose ODM)  
- **APIs:** Groq API, YouTube Data API v3  
- **Hosting:** Vercel (Frontend), Render (Backend), MongoDB Atlas

---

## ✨ Key Features

- ✅ **Watch & Learn:** Stream educational YouTube videos directly  
- ✅ **AI-Powered Note Editor:** Take notes with TipTap + AI autocomplete (Shift + A or click button)  
- ✅ **Generate Flashcards, Quizzes, and Summaries** using your own notes  
- ✅ **Real-time Saving:** Notes are auto-saved to MongoDB with debounce  
- ✅ **Rich Toolbar:** Bold, italic, lists, headings, colors, undo/redo  
- ✅ **Clean UI:** Built with responsiveness and accessibility in mind

---

## 🧪 How to Run the Project

### Requirements:
- Node.js (v18+)
- MongoDB Atlas account
- Groq API Key
- YouTube Data API Key

---

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/edu-prompt
cd edu-prompt
```

---

### 2. Backend Setup

#### Navigate to the Backend Directory:
```bash
cd backend
```

#### Install Dependencies:
```bash
npm install
```

#### Create a `.env` File:
Add the following environment variables to a `.env` file in the backend folder:
```env
VITE_MONGO_URI=your_mongo_uri
VITE_GROQ_API_KEY=your_groq_api_key
VITE_YOUTUBE_API_KEY=your_youtube_api_key
VITE_JWT_SECRET=your_jwt_secret_key
VITE_SERVER_PORT=5000
```

#### Start the Backend Server:
```bash
npm run dev
```

---

### 3. Frontend Setup

#### Navigate to the Frontend Directory:
```bash
cd ../frontend
```

#### Install Dependencies:
```bash
npm install
```

#### Create a `.env` File:
Add the following environment variables to a `.env` file in the frontend folder:
```env
VITE_BACKEND_URL=http://localhost:5000
VITE_YOUTUBE_API_KEY=your_youtube_api_key
VITE_GROQ_API_KEY=your_groq_api_key
VITE_FRONTEND_URL=http://localhost:5173
```

#### Start the Frontend Server:
```bash
npm run dev
```

---

### 4. Access the Application
- Open your browser and navigate to `http://localhost:5173`.
- Ensure both the frontend and backend servers are running.

---

## 🌐 Deployment

### Backend Deployment:
- Deploy the backend to **Render** or any other hosting platform.
- Update the `VITE_BACKEND_URL` in the frontend `.env` file to point to the deployed backend URL.

### Frontend Deployment:
- Deploy the frontend to **Vercel** or any other hosting platform.
- Ensure the `.env` file is correctly configured for the production environment.

---

## 🧬 Future Scope
  
- 🛡️ Add user authentication and secure note sharing  
- 🎯 Personalized AI tutor based on user learning style  
- 📚 Import/export notes and flashcards  
- 🌐 Add multilingual AI note generation  

---

## 📎 Resources / Credits

- [Groq](https://groq.com/) for lightning-fast AI completion  
- [YouTube Data API](https://developers.google.com/youtube/v3)  
- [TipTap Editor](https://tiptap.dev)  
- [Lucide Icons](https://lucide.dev)  
- [Tailwind CSS](https://tailwindcss.com)

---