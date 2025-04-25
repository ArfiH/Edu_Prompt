# 🚀 **Thinkboard**

> Learn smarter: Watch, write, and elevate your knowledge with AI-powered notes.

---

## 📌 Problem Statement

**Personalized Learning solution with AI**

---

## 🎯 Objective

**Thinkboard** empowers students and lifelong learners to **take smart notes while watching educational videos**. It allows users to annotate content, generate AI summaries, quizzes, and flashcards, enhancing their retention and understanding.

Built for learners who struggle to organize information across YouTube videos, notes, and flashcards, this app creates an **all-in-one platform for intelligent study**.

---

### 💡 Your Approach:  
- Chose this problem to make **AI-enhanced learning accessible and frictionless**
- Integrated **Groq's AI models** for blazing-fast autocompletion and quiz generation
- Focused on **real-time interactivity** and **user-friendly UX**
- Faced challenges in syncing YouTube content with user input and AI tasks
- Pivoted to modular microservice-like architecture with separate routes for AI, notes, and video modules

---

## 🛠️ Tech Stack

### Core Technologies Used:

- **Frontend:** React.js, TipTap Editor, Lucide Icons, Tailwind CSS  
- **Backend:** Node.js, Express.js  
- **Database:** MongoDB (Mongoose ODM)  
- **APIs:** Groq LLaMA3 API, YouTube Data API v3  
- **Hosting:** Render / Vercel (Frontend), Render / Railway (Backend), MongoDB Atlas

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

### .env Setup:
Create `.env` files in both frontend and backend folders.

#### Backend `.env`:
```env
MONGO_URI=your_mongo_uri
GROQ_API_KEY=your_groq_api_key
YOUTUBE_API_KEY=your_youtube_api_key
PORT=5000
```

---

### Local Setup:
```bash
# Clone the repo
git clone https://github.com/your-username/thinkboard
cd thinkboard

# Install frontend
cd client
npm install

# Install backend
cd ../server
npm install

# Start backend
npm run dev

# Start frontend
cd ../client
npm run dev
```

Make sure both frontend and backend are running on respective ports.

---

## 🧬 Future Scope

- 📈 Integrate OpenAI Gemini or Claude for broader LLM support  
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

> Special thanks to all contributors and open-source libraries that made this possible.
