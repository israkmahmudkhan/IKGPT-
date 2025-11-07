import React, { useState, useEffect, useRef, FormEvent } from 'react';
import type { Chat } from '@google/genai';
import { createChatSession } from '../services/geminiService';
import { SparklesBotIcon, SunIcon, SendIcon } from './common/Icons';

interface Message {
  role: 'user' | 'model';
  text: string;
}

const WelcomeScreen: React.FC<{ onPromptClick: (prompt: string) => void }> = ({ onPromptClick }) => {
  const suggestions = [
    'Who created you?',
    'What can you help me with?',
    'Tell me a joke',
  ];

  return (
    <div className="flex flex-col items-center justify-center text-center h-full animate-fade-in">
      <SparklesBotIcon className="w-20 h-20 text-gray-500" />
      <h1 className="text-4xl font-bold mt-4">Welcome to IKGPT</h1>
      <p className="text-gray-400 mt-2 max-w-sm">
        Ask me anything! I'm here to help with information, creative tasks, and problem-solving.
      </p>
      <div className="w-full max-w-sm mt-8">
        {suggestions.map((prompt) => (
          <button
            key={prompt}
            onClick={() => onPromptClick(prompt)}
            className="w-full text-left p-4 bg-[#1E1E1E] rounded-xl my-2 hover:bg-[#2D2D2D] transition-colors duration-200"
          >
            {prompt}
          </button>
        ))}
      </div>
    </div>
  );
};

const ChatBubble: React.FC<{ message: Message }> = ({ message }) => {
  const isUser = message.role === 'user';
  return (
    <div className={`flex my-2 ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-md lg:max-w-lg p-3 rounded-2xl ${
          isUser
            ? 'bg-[#1E1E1E] text-gray-200 rounded-br-none'
            : 'bg-[#2D2D2D] text-gray-200 rounded-bl-none'
        }`}
      >
        <p className="whitespace-pre-wrap">{message.text}</p>
      </div>
    </div>
  );
};

const GLM: React.FC = () => {
  const [chat, setChat] = useState<Chat | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setChat(createChatSession());
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handlePrompt = async (promptText: string) => {
    if (!promptText.trim() || !chat || isLoading) return;

    const userMessage: Message = { role: 'user', text: promptText };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const result = await chat.sendMessageStream({ message: promptText });
      let modelResponseText = '';
      setMessages(prev => [...prev, { role: 'model', text: '' }]);
      
      for await (const chunk of result) {
        modelResponseText += chunk.text;
        setMessages(prev => {
          const newMessages = [...prev];
          newMessages[newMessages.length - 1].text = modelResponseText;
          return newMessages;
        });
      }
    } catch (error) {
      console.error("Error sending message:", error);
      setMessages(prev => [...prev, { role: 'model', text: 'Sorry, I encountered an error. Please try again.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    handlePrompt(input);
  };

  return (
    // Fix: Adjust component to fit within the main app layout by removing local header and changing height.
    <div className="bg-[#121212] text-gray-200 flex flex-col h-full font-sans max-w-2xl mx-auto w-full">
      <main className="flex-1 flex flex-col overflow-y-auto px-4">
        {messages.length === 0 ? (
          <WelcomeScreen onPromptClick={handlePrompt} />
        ) : (
          <div className="w-full">
            {messages.map((msg, index) => <ChatBubble key={index} message={msg} />)}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-[#2D2D2D] p-3 rounded-2xl rounded-bl-none my-2">
                  <div className="flex items-center space-x-2">
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"></span>
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-pulse delay-200"></span>
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-pulse delay-400"></span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        )}
      </main>

      <footer className="p-4 flex-shrink-0">
        <form onSubmit={handleSubmit} className="flex items-center p-1.5 bg-[#1E1E1E] rounded-xl">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask me anything..."
            className="flex-grow bg-transparent text-white placeholder-gray-500 focus:outline-none px-3"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="bg-[#3A3A3A] p-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#4A4A4A] transition-colors"
            aria-label="Send message"
          >
            <SendIcon className="w-6 h-6" />
          </button>
        </form>
      </footer>
    </div>
  );
};

export default GLM;
