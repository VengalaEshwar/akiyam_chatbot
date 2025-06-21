import React, { useState } from 'react'
import ChatBot from './ChatBot'
import "./ChatBot.css"

function AiOptions() {
  const [isOpen, setIsOpen] = useState(true)

  return (
    <div className='flex h-screen'>
      {/* Sidebar */}
      <div className={`${isOpen ? 'w-60' : 'w-16'} transition-all duration-400 bg-[#1e1e1e] text-white p-2 flex flex-col`}>
        <button
          className="self-end mb-4 text-sm bg-gray-700 px-2 py-1 rounded hover:bg-gray-600 cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? '<' : '>'}
        </button>
        {isOpen && (
          <>
            <h1 className='text-2xl text-center mb-4'>Options</h1>
            <ul className='space-y-2'>
              <li className="hover:bg-[#333] p-2 rounded cursor-pointer">Chatbot</li>
              <li className="hover:bg-[#333] p-2 rounded cursor-pointer">Web Builder</li>
              <li className="hover:bg-[#333] p-2 rounded cursor-pointer">AI Builder</li>
              {/* Add more options here */}
            </ul>
          </>
        )}
        {!isOpen && (
          <ul className='space-y-2 mt-4'>
            <li className="hover:bg-[#333] p-2 rounded cursor-pointer text-center">🤖</li>
            <li className="hover:bg-[#333] p-2 rounded cursor-pointer text-center">🛠</li>
            <li className="hover:bg-[#333] p-2 rounded cursor-pointer text-center">🧠</li>
          </ul>
        )}
      </div>

      {/* Main ChatBot Area */}
      <div className="flex-1">
        <ChatBot />
      </div>
    </div>
  )
}

export default AiOptions
