import React, { useState } from 'react';
import ChatBot from './ChatBot';
import './ChatBot.css';
import ToggleButton from '../../components/ToggleButton/ToggleButton';

function AiOptions({isDark,setIsDark}) {
  const [isOpen, setIsOpen] = useState(true);
  // const [isDark, setIsDark] = useState(true);

  return (
    <div
      className="flex h-[90vh]"
      style={{ backgroundColor: `var(--background-${isDark ? "dark" : "light"}-primary)` }}
    >
      {/* Sidebar */}
      <div
        className={`${
          isOpen ? "w-60" : "w-16"
        } transition-all duration-400 p-2 flex flex-col`}
        style={{
          backgroundColor: `var(--background-${isDark ? "dark" : "light"}-secondary)`,
          color: `var(--text-${isDark ? "dark" : "light"}-main)`,
        }}
      >
        <button
          className="self-end mb-4 text-sm px-2 py-1 rounded cursor-pointer "
          style={{
            backgroundColor: `var(--interactive-${isDark ? "dark" : "light"}-primary)`,
            color: `var(--text-${isDark ? "dark" : "light"}-main)`,
          }}
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? "<" : ">"}
        </button>

        {isOpen && (
          <>
            <h1
              className="text-2xl text-center mb-4"
              style={{
                color : isDark?"white" : "black"
                // color: `var(--interactive-${isDark ? "dark" : "light"}-primary)`,
              }}
            >
              Options
            </h1>

            <ul className="space-y-2">

              {["Chatbot", "Web Builder", "AI Builder"].map((item) => (
                <li
                  key={item}
                  className="p-2 rounded cursor-pointer"
                  style={{
                    backgroundColor: `var(--interactive-${isDark ? "dark" : "light"}-hover)`,
                  }}
                >
                  {item}
                </li>
              ))}
            </ul>
          </>
        )}

        {!isOpen && (
          <ul className="space-y-2 mt-4">
            {/* <ToggleButton isDark={isDark} setIsDark={setIsDark} /> */}
            {["🤖", "🛠", "🧠"].map((icon, index) => (
              <li
                key={index}
                className="p-2 rounded cursor-pointer text-center"
                style={{
                  backgroundColor: `var(--interactive-${isDark ? "dark" : "light"}-hover)`,
                }}
              >
                {icon}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Main ChatBot Area */}
      <div className="flex-1">
        <ChatBot isDark={isDark} />
      </div>
    </div>
  );
}

export default AiOptions;
