import "./ChatBot.css";
import "../../index.css";
import { useState, useRef, useEffect } from "react";
import { PanelGroup, Panel, PanelResizeHandle } from "react-resizable-panels";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faArrowUp,
  faComment,
  faPlus,
  faScrewdriverWrench,
} from "@fortawesome/free-solid-svg-icons";
import { v4 as uuidv4 } from "uuid";

function ChatBot({ isDark }) {
  const [chats, setChats] = useState([]);
  const [currentChatId, setCurrentChatId] = useState(null);
  const [isPlus, setIsPlus] = useState(false);
  const [isTool, setIsTool] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [showSidebar, setShowSidebar] = useState(false);
  const [lastResponse, setLastResponse] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 768);

  const textareaRef = useRef(null);
  const messagesContainerRef = useRef(null);
  const fileInputRef = useRef(null);
  const newChatRef = useRef(null);

  const currentChat = chats.find((chat) => chat.id === currentChatId);

  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const container = messagesContainerRef.current;
    if (container) container.scrollTop = container.scrollHeight;
  }, [chats, currentChat]);

  useEffect(() => {
    if (chats.length === 0) {
      setTimeout(() => {
        newChatRef.current?.click();
      }, 0);
    }
  }, []);

  const autoResize = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = Math.min(textarea.scrollHeight, 200) + "px";
    }
  };

  const resetBox = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
  };

  const handleNewChat = () => {
    const hasEmptyChat = chats.some((chat) => chat.chats.length === 0);
    if (!hasEmptyChat) {
      const id = uuidv4();
      const newChat = { id, title: `Chat ${chats.length + 1}`, chats: [] };
      setChats((prev) => [newChat, ...prev]);
      setCurrentChatId(id);
    }
  };

  const handleClick = () => {
    fileInputRef.current.click();
  };

  const handleChange = (e) => {
    setSelectedFile(e.target.files[0]);
    console.log("Selected:", e.target.files[0]);
  };

  const handleSend = () => {
    if (!prompt.trim() || !currentChatId) return;
    const fakeResponse = "Typing this slowly... ✨";

    const updatedChats = chats.map((chat) =>
      chat.id === currentChatId
        ? { ...chat, chats: [...chat.chats, { req: prompt, res: fakeResponse }] }
        : chat
    );

    setChats(updatedChats);
    setPrompt("");
    resetBox();
    setLastResponse(fakeResponse);
  };

  const modeSuffix = !isDark ? "-light" : "";

  return (
    <div className={`chatbot-container chatbot-container${modeSuffix}`}>
      <div className={`mobile-nav mobile-nav${modeSuffix}`}>
        <FontAwesomeIcon icon={faBars} onClick={() => setShowSidebar(!showSidebar)} />
      </div>
      <PanelGroup direction="horizontal" className={`main-split main-split${modeSuffix}`}>
        {(showSidebar || isDesktop) && (
          <div className={`sidebar sidebar${modeSuffix} w-2xs`}>
            <div className="flex gap-1.5 flex-col p-2">
              <button
                className={`sidebar-button sidebar-button${modeSuffix}`}
                ref={newChatRef}
                onClick={handleNewChat}
              >
                <FontAwesomeIcon icon={faComment} size="lg" className="mr-2" />
                New Chat
              </button>
              <h2>Previous Chats</h2>
              <ul className="flex flex-col-reverse gap-1">
                {chats.map((chat) => (
                  <li
                    key={chat.id}
                    className={`chat-history-item chat-history-item${modeSuffix} ${
                      currentChatId === chat.id ? "active" : ""
                    }`}
                    onClick={() => setCurrentChatId(chat.id)}
                  >
                    {chat.title}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        <Panel defaultSize={60} className={`chat-area chat-area${modeSuffix} middle-tab middle-tab${modeSuffix} h-screen`}>
          <div className={`messages middle-tab middle-tab${modeSuffix}`} ref={messagesContainerRef}>
            {currentChat &&
              currentChat.chats.map((entry, idx) => (
                <div key={idx} className="chat-pair">
                  <div className={`message-req message-req${modeSuffix}`}>{entry.req}</div>
                  <div className={`message-res message-res${modeSuffix}`}>{entry.res}</div>
                </div>
              ))}
          </div>
          {currentChat && (
            <div className={`input-area input-area${modeSuffix}`}>
              <textarea
                className={`chat-input chat-input${modeSuffix}`}
                placeholder="Enter prompt.........."
                value={prompt}
                onChange={(e) => {
                  setPrompt(e.target.value);
                  autoResize();
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSend();
                  }
                }}
                rows={1}
                ref={textareaRef}
              />
              <div className="file-handle flex justify-between items-center">
                <div className="input-area-donw-left flex gap-1">
                  <div className="input-area-donw-left-plus">
                    {isPlus && (
                      <ul className={`popup-menu popup-menu${modeSuffix}`}>
                        <li onClick={handleClick}>Upload File</li>
                        <input
                          type="file"
                          ref={fileInputRef}
                          className="hidden"
                          onChange={handleChange}
                        />
                        {selectedFile && (
                          <p className="mt-2 text-sm" style={{ color: "var(--text-dark-primary)" }}>
                            Selected: {selectedFile.name}
                          </p>
                        )}
                      </ul>
                    )}
                    <button
                      onClick={() => {
                        setIsPlus(!isPlus);
                        setIsTool(false);
                      }}
                      className={`icon-button icon-button${modeSuffix}`}
                    >
                      <FontAwesomeIcon icon={faPlus} />
                    </button>
                  </div>
                  <div className="input-area-donw-left-tool">
                    {isTool && (
                      <ul className={`popup-menu popup-menu${modeSuffix}`}>
                        <li>tool 1</li>
                        <li>tool 2</li>
                        <li>tool 3</li>
                        <li>tool 4</li>
                      </ul>
                    )}
                    <button
                      onClick={() => {
                        setIsTool(!isTool);
                        setIsPlus(false);
                      }}
                      className={`icon-button icon-button${modeSuffix}`}
                    >
                      <FontAwesomeIcon icon={faScrewdriverWrench} />
                    </button>
                  </div>
                </div>
                <div className="input-area-donw-right">
                  <button onClick={handleSend} className={`send-button send-button${modeSuffix}`}>
                    <FontAwesomeIcon icon={faArrowUp} />
                  </button>
                </div>
              </div>
            </div>
          )}
        </Panel>

        {isDesktop && (
          <>
            <PanelResizeHandle className={`resize-handle resize-handle${modeSuffix}`} />
            <Panel defaultSize={20} minSize={0} className={`output-tab output-tab${modeSuffix}`}>
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
