import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, RotateCw, Maximize2, Minimize2, ExternalLink, Bot, Send, AlertCircle } from 'lucide-react';

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 'welcome',
      sender: 'bot',
      text: "Hi! I'm NeuroRob AI, your virtual assistant. How can I help you build robots today?",
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen, isTyping]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const resetChat = () => {
    setMessages([
      {
        id: 'welcome',
        sender: 'bot',
        text: "Hi! I'm NeuroRob AI, your virtual assistant. How can I help you build robots today?",
        timestamp: new Date()
      }
    ]);
    setErrorMsg(null);
    setInputValue('');
    setIsTyping(false);
  };

  const toggleMaximize = () => {
    setIsMaximized(!isMaximized);
  };

  const handleSend = async (e) => {
    e.preventDefault();
    if (!inputValue.trim() || isTyping) return;

    const userText = inputValue.trim();
    setInputValue('');
    setErrorMsg(null);

    // Add user message
    const userMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: userText,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMessage]);

    // Trigger typing state
    setIsTyping(true);

    try {
      const response = await fetch("https://master-1207-aibot.hf.space/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: userText }),
      });

      if (!response.ok) {
        throw new Error(`Server returned status code ${response.status}`);
      }

      const data = await response.json();
      
      // Add bot reply
      const botMessage = {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: data.reply || "I'm sorry, I couldn't formulate a reply.",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
    } catch (err) {
      console.error("Chatbot communication error:", err);
      setErrorMsg("Failed to communicate with the chatbot backend.");
      
      // Add helper system/bot message to help developer troubleshoot
      const errorMessage = {
        id: `err-${Date.now()}`,
        sender: 'system',
        text: "Notice: The backend is live, but the chatbot failed to respond (HTTP 500 / Network Error). Please ensure that the GEMINI_KEY environment variable is set in your Hugging Face Space secrets.",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ 
              opacity: 1, 
              y: 0, 
              scale: 1,
              width: isMaximized 
                ? 'min(90vw, 850px)' 
                : 'min(calc(100vw - 2rem), 420px)',
              height: isMaximized 
                ? 'min(85vh, 750px)' 
                : 'min(75vh, 580px)'
            }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ type: 'spring', damping: 25, stiffness: 220 }}
            className="glass-panel bg-card-bg/95 border border-border-color shadow-2xl rounded-2xl flex flex-col overflow-hidden mb-4 origin-bottom-right"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 bg-secondary-bg/85 border-b border-border-color/50">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-accent to-orange-600 flex items-center justify-center text-primary-bg shadow-[0_0_15px_rgba(255,122,0,0.3)]">
                    <Bot className="w-5.5 h-5.5 text-white" />
                  </div>
                  {/* Status indicator */}
                  <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-card-bg animate-pulse" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-primary-text font-poppins tracking-wide">
                    NeuroRob AI
                  </h3>
                  <p className="text-[11px] text-secondary-text flex items-center gap-1">
                    <span>Virtual Assistant</span>
                    <span className="w-1 h-1 rounded-full bg-secondary-text" />
                    <span className="text-green-400 font-medium">Online</span>
                  </p>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex items-center gap-1">
                {/* Reset/Reload */}
                <button
                  onClick={resetChat}
                  title="Clear conversation"
                  className="p-1.5 text-secondary-text hover:text-primary-accent hover:bg-secondary-bg rounded-lg transition-colors"
                >
                  <RotateCw className="w-4 h-4" />
                </button>
                
                {/* Expand / Maximize */}
                <button
                  onClick={toggleMaximize}
                  title={isMaximized ? "Restore size" : "Maximize window"}
                  className="p-1.5 text-secondary-text hover:text-primary-accent hover:bg-secondary-bg rounded-lg transition-colors hidden sm:block"
                >
                  {isMaximized ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                </button>

                {/* External link to Space */}
                <a
                  href="https://master-1207-aibot.hf.space"
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Open Backend Space"
                  className="p-1.5 text-secondary-text hover:text-primary-accent hover:bg-secondary-bg rounded-lg transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>

                {/* Close */}
                <button
                  onClick={toggleChat}
                  title="Minimize chat"
                  className="p-1.5 text-secondary-text hover:text-red-500 hover:bg-secondary-bg rounded-lg transition-colors"
                >
                  <X className="w-4.5 h-4.5" />
                </button>
              </div>
            </div>

            {/* Chat Body */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-primary-bg/30 scrollbar-thin scrollbar-thumb-card-bg scrollbar-track-transparent">
              {messages.map((msg) => {
                if (msg.sender === 'system') {
                  return (
                    <motion.div
                      key={msg.id}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="flex items-start gap-2.5 p-3 rounded-xl bg-red-950/20 border border-red-900/30 text-red-400 text-xs"
                    >
                      <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-semibold mb-1">Backend Configuration Notice</p>
                        <p className="leading-relaxed">{msg.text}</p>
                      </div>
                    </motion.div>
                  );
                }

                const isBot = msg.sender === 'bot';
                return (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 10, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.2 }}
                    className={`flex items-start gap-2.5 ${!isBot ? 'flex-row-reverse' : ''}`}
                  >
                    {isBot ? (
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-accent to-orange-600 flex items-center justify-center text-primary-bg flex-shrink-0 shadow-md">
                        <Bot className="w-4.5 h-4.5 text-white" />
                      </div>
                    ) : (
                      <div className="w-8 h-8 rounded-lg bg-card-bg border border-border-color flex items-center justify-center text-primary-accent flex-shrink-0 shadow-md font-bold text-xs">
                        U
                      </div>
                    )}
                    
                    <div className={`flex flex-col max-w-[75%] ${!isBot ? 'items-end' : ''}`}>
                      <div 
                        className={`rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                          isBot 
                            ? 'bg-secondary-bg/80 border border-border-color text-primary-text rounded-tl-none' 
                            : 'bg-gradient-to-br from-primary-accent to-orange-600 text-white rounded-tr-none shadow-md font-medium'
                        }`}
                      >
                        <p className="whitespace-pre-wrap">{msg.text}</p>
                      </div>
                      <span className="text-[9px] text-secondary-text mt-1 px-1">
                        {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                  </motion.div>
                );
              })}

              {/* Typing indicator */}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-start gap-2.5"
                >
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-accent to-orange-600 flex items-center justify-center text-primary-bg flex-shrink-0 shadow-md">
                    <Bot className="w-4.5 h-4.5 text-white" />
                  </div>
                  <div className="bg-secondary-bg/80 border border-border-color rounded-2xl rounded-tl-none px-4 py-3 flex items-center gap-1.5">
                    <span className="w-2 h-2 bg-primary-accent rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-2 h-2 bg-primary-accent rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-2 h-2 bg-primary-accent rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </motion.div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Input Form */}
            <form 
              onSubmit={handleSend}
              className="flex items-center gap-2 p-3 bg-secondary-bg/80 border-t border-border-color/50"
            >
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Type your message..."
                disabled={isTyping}
                className="flex-1 bg-primary-bg border border-border-color rounded-xl px-4 py-2.5 text-sm text-primary-text placeholder-secondary-text focus:outline-none focus:border-primary-accent focus:ring-1 focus:ring-primary-accent/30 transition-all disabled:opacity-60"
              />
              <button
                type="submit"
                disabled={!inputValue.trim() || isTyping}
                className="p-2.5 bg-primary-accent hover:bg-hover-accent text-primary-bg rounded-xl transition-all duration-300 disabled:opacity-40 disabled:hover:bg-primary-accent shadow-md glow-orange-hover flex items-center justify-center"
              >
                <Send className="w-4.5 h-4.5 text-primary-bg" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Toggle Button */}
      <motion.button
        onClick={toggleChat}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="w-14 h-14 rounded-full bg-gradient-to-r from-primary-accent to-orange-600 flex items-center justify-center text-primary-bg shadow-[0_4px_20px_rgba(255,122,0,0.4)] hover:shadow-[0_4px_25px_rgba(255,122,0,0.6)] border border-white/10 relative group transition-shadow duration-300"
      >
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary-accent to-orange-600 opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
        
        {/* Pulsing glow boundary */}
        {!isOpen && (
          <span className="absolute -inset-1 rounded-full border border-primary-accent/40 animate-pulse pointer-events-none" />
        )}

        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X className="w-6 h-6 text-white" />
            </motion.div>
          ) : (
            <motion.div
              key="chat"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="relative"
            >
              <MessageSquare className="w-6 h-6 text-white" />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-green-400 rounded-full border border-primary-accent" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Hover Tooltip */}
        <div className="absolute right-16 bg-card-bg border border-border-color text-primary-text text-xs px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none shadow-xl flex items-center gap-1.5">
          <Bot className="w-3.5 h-3.5 text-primary-accent" />
          <span>Chat with NeuroRob AI</span>
        </div>
      </motion.button>
    </div>
  );
};

export default ChatWidget;
