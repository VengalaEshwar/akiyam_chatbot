import { useState } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import ChatBot from './pages/ChatBot/ChatBot'
import Temp from './pages/ChatBot/Temp'
import Home from './pages/Home/Home'
import Header from './pages/Header/Header'
import Contact from './pages/Contact/Contact'
import Explore from './pages/Explore/Explore'

function App() {
  const [count, setCount] = useState(0)

  return (
   <div className="app h-screen">
    <Header/>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/chatbot" element={<ChatBot/>}/>
      <Route path="/contact" element={<Contact/>}/>
      <Route path="/explore" element={<Explore/>}/>
      <Route path="/temp" element={<Temp/>}/>
    </Routes>
   </div>
  )
}

export default App
