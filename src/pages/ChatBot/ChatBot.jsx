// ChatBot.jsx
import './ChatBot.css';
import { useState, useRef, useEffect } from 'react';
import { PanelGroup, Panel, PanelResizeHandle } from 'react-resizable-panels';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faArrowUp, faComment } from '@fortawesome/free-solid-svg-icons';
import { v4 as uuidv4 } from 'uuid';

function ChatBot() {
  const [chats, setChats] = useState([]);
  const [currentChatId, setCurrentChatId] = useState(null);
  const [prompt, setPrompt] = useState('');
  const [showSidebar, setShowSidebar] = useState(false);
  const textareaRef = useRef(null);
  const [lastResponse, setLastResponse] = useState("");
  const messagesContainerRef = useRef(null);
  const autoResize = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = Math.min(textarea.scrollHeight, 200) + 'px';
    }
  };
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 768);

  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  const currentChat = chats.find(chat => chat.id === currentChatId);
  useEffect(() => {
    const container = messagesContainerRef.current;
    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  }, [currentChat]);

  const resetBox = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
    }
  };

  const handleNewChat = () => {
    const hasEmptyChat = chats.find(chat => chat.chats.length === 0);
    if (!hasEmptyChat) {
      const id = uuidv4();
      const newChat = { id, title: `Chat ${chats.length + 1}`, chats: [] };
      setChats(prev => [newChat, ...prev]);
      setCurrentChatId(id);
    }
  };

  const handleSend = () => {
    if (!prompt.trim() || !currentChatId) return;

    const fakeResponse = "Typing this slowly... ✨";
    setLastResponse(fakeResponse);
    const updatedChats = chats.map(chat => {
      if (chat.id === currentChatId) {
        return {
          ...chat,
          chats: [...chat.chats, { req: prompt, res: fakeResponse }]
        };
      }
      return chat;
    });

    setChats(updatedChats);
    setPrompt('');
    resetBox();
  };
  const newChatRef = useRef(null);
  useEffect(() => {
    if (chats.length === 0) {
      setTimeout(() => {
        if (newChatRef.current) {
          newChatRef.current.click();
        }
      }, 0);
    }
  }, []);
  return (
    <div className="chatbot-container">
      <div className="mobile-nav">
        <FontAwesomeIcon icon={faBars} onClick={() => setShowSidebar(!showSidebar)} />
      </div>
      <PanelGroup direction="horizontal" className="main-split">
        {(showSidebar || window.innerWidth >= 768) && (
          <div className="sidebar w-2xs ">
            <div className="flex gap-1.5 flex-col p-2">
              <button className="hover:bg-[#333] p-2 rounded-xl cursor-pointer"
                ref={newChatRef}
                onClick={handleNewChat}>
                <FontAwesomeIcon icon={faComment} size="lg" className="mr-2" />
                New Chat
              </button>
              <h2>Previous Chats</h2>
              <ul className='flex flex-col-reverse gap-1'>
                {chats.map((chat) => (
                  <li key={chat.id}
                    className={`hover:bg-[#333] p-2 rounded-xl cursor-pointer ${currentChatId === chat.id ? 'bg-[#444]' : ''}`}
                    onClick={() => setCurrentChatId(chat.id)}>
                    {chat.title}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        <Panel defaultSize={60} className="chat-area middle-tab h-screen" >
          <div className="messages middle-tab" ref={messagesContainerRef} >
            {currentChat && currentChat.chats.map((entry, idx) => (
              <div key={idx} className="chat-pair">
                <div className="message-req">
                  {entry.req}
                </div>
                <motion.div
                  className="message-res"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6 }}
                >
                  {entry.res}
                </motion.div>
              </div>
            ))}
          </div>
          {currentChat && (
            <div className="input-area">
              <textarea
                className="chat-input"
                placeholder="Enter prompt.........."
                value={prompt}
                onChange={(e) => {
                  setPrompt(e.target.value);
                  autoResize();
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSend();
                  }
                }}
                rows={1}
                ref={textareaRef}
              />
              <div className="file-handle">
                <button onClick={handleSend} className="rounded-2xl bg-[#ececec] px-5 py-3 cursor-pointer hover:bg-[#bab6b6] text-[1.3rem] text-black 
             ">
                  <FontAwesomeIcon icon={faArrowUp} />
                </button>
              </div>
            </div>
          )}
        </Panel>

        {isDesktop && (
          <>
            <PanelResizeHandle className="resize-handle" />
            <Panel defaultSize={20} minSize={0} className="output-tab">
              <h2>Output</h2>
              {lastResponse}
            </Panel>
          </>
        )}



      </PanelGroup>
    </div>
  );
}

export default ChatBot;
