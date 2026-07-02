'use client';

import { useState, useRef, useEffect } from 'react';
import { Send, Phone, Video, MoreVertical, Check, CheckCheck } from 'lucide-react';
import Image from 'next/image';

type Message = {
  id: string;
  role: 'user' | 'bot';
  content: string;
  timestamp: string;
  status: 'sent' | 'delivered' | 'read';
};

export function WhatsAppSimulator() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'bot',
      content: 'Hello! I am your ESRE Vitals Bot. How did your business do today? Just tell me what you sold or bought.',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: 'read'
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: 'sent'
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    try {
      const response = await fetch('/api/bot/webhook', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input, userId: 'demo_user_123' })
      });
      
      const data = await response.json();
      
      setIsTyping(false);
      setMessages(prev => [...prev, {
          id: (Date.now() + 1).toString(),
          role: 'bot',
          content: data.reply,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          status: 'read'
      }]);
    } catch (error) {
      console.error(error);
      setIsTyping(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto h-[550px] flex flex-col bg-[#efeae2] border border-white/10 rounded-3xl overflow-hidden shadow-2xl relative font-sans">
      {/* WhatsApp Header */}
      <div className="bg-[#008069] text-white px-4 py-3 flex items-center justify-between z-10 shadow-md">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shrink-0 overflow-hidden border-2 border-[#00a884]">
            <Image
              src="/logo.png"
              alt="Crelligent"
              width={24}
              height={24}
              className="w-6 h-6 object-contain"
            />
          </div>
          <div>
            <h3 className="font-semibold text-[15px]">ESRE Vitals Bot</h3>
            <p className="text-[11px] text-white/80">Online</p>
          </div>
        </div>
        <div className="flex items-center gap-4 text-white">
          <Video className="w-5 h-5" />
          <Phone className="w-5 h-5" />
          <MoreVertical className="w-5 h-5" />
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3 relative bg-[url('https://i.pinimg.com/736x/8c/98/99/8c98994518b575bfd8c949e91d20548b.jpg')] bg-cover bg-center">
        {/* Background overlay for better readability */}
        <div className="absolute inset-0 bg-[#efeae2]/80 z-0" />

        <div className="text-center z-10 my-2">
            <span className="text-xs bg-white/50 text-gray-600 px-2 py-1 rounded-lg backdrop-blur-sm shadow-sm uppercase tracking-wider font-semibold">Today</span>
        </div>

        {messages.map(msg => (
          <div
            key={msg.id}
            className={`flex w-full z-10 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[85%] rounded-lg px-3 py-2 text-[14.5px] leading-relaxed shadow-sm relative ${
                msg.role === 'user' 
                  ? 'bg-[#d9fdd3] text-[#111b21] rounded-tr-none' 
                  : 'bg-white text-[#111b21] rounded-tl-none'
              }`}
            >
              <span>{msg.content}</span>
              <div className="flex items-center justify-end gap-1 mt-1 text-[10px] text-gray-500 float-right ml-4">
                <span>{msg.timestamp}</span>
                {msg.role === 'user' && (
                  msg.status === 'read' ? <CheckCheck className="w-3 h-3 text-[#53bdeb]" /> : <Check className="w-3 h-3" />
                )}
              </div>
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex w-full z-10 justify-start">
            <div className="bg-white rounded-lg rounded-tl-none px-4 py-3 shadow-sm flex gap-1 items-center">
              <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
              <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
              <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="bg-[#f0f2f5] p-3 flex gap-2 z-10">
        <div className="flex-1 bg-white rounded-xl px-4 py-2 flex items-center shadow-sm">
          <input
            type="text"
            className="w-full outline-none text-[#111b21] bg-transparent text-[15px]"
            placeholder="Type a message"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          />
        </div>
        <button 
          onClick={handleSend}
          className="w-10 h-10 rounded-full bg-[#00a884] flex items-center justify-center text-white shrink-0 hover:bg-[#008f6f] transition-colors shadow-sm"
        >
          <Send className="w-5 h-5 ml-1" />
        </button>
      </div>
    </div>
  );
}
