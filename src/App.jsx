import { useState } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import ChatBot from './pages/ChatBot/ChatBot'
import AiOptions from './pages/ChatBot/AiOptions'
import Home from './pages/Home/Home'
import Header from './pages/Header/Header'
import Contact from './pages/Contact/Contact'
import Explore from './pages/Explore/Explore'

function App() {
 const [isDark, setIsDark] = useState(true);
  return (
   <div className="app h-screen">
    <Header isDark={isDark} setIsDark={setIsDark}/>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/chatbot" element={<AiOptions isDark={isDark} setIsDark={setIsDark}/>}/>
      <Route path="/contact" element={<Contact/>}/>
      <Route path="/explore" element={<Explore/>}/>
    </Routes>
   </div>
  )
}

export default App
