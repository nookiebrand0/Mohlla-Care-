import React, { useState, useRef, useEffect } from "react";
import { motion } from "motion/react";
import { Bot, Send, Loader2, Sparkles } from "lucide-react";
import { GoogleGenAI } from "@google/genai";

// Platform injects the API key automatically under process.env.GEMINI_API_KEY
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

interface Message {
  role: "user" | "model";
  text: string;
}

export function AIHelpCenter() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "model",
      text: "नमस्ते! मैं आपका एआई (AI) सहायक हूँ। इस ऐप से जुड़ी किसी भी समस्या या सवाल के लिए आप मुझसे पूछ सकते हैं। मैं आपकी क्या मदद कर सकता हूँ?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userText = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", text: userText }]);
    setIsLoading(true);

    try {
      const chatHistory = messages.map(m => `${m.role === 'user' ? 'User' : 'Assistant'}: ${m.text}`);
      chatHistory.push(`User: ${userText}`);
      
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: chatHistory.join("\n\n"),
        config: {
          systemInstruction: "You are a helpful AI support agent for a local community application. The app allows users to report civic issues, find local services, apply for jobs, use an SOS emergency feature, and interact in a community forum. Keep your responses concise and strictly in Hindi. Start directly with the answer."
        }
      });

      const modelReply = response.text || "मुझे माफ़ करें, मैं अभी कुछ समझ नहीं पाया। कृपया फिर से पूछें।";
      setMessages((prev) => [...prev, { role: "model", text: modelReply }]);
    } catch (error) {
      console.error("AI Error:", error);
      setMessages((prev) => [...prev, { role: "model", text: "माफ़ करें, अभी कोई नेटवर्क समस्या है। कृपया थोड़ी देर बाद फिर प्रयास करें।" }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-3xl mx-auto h-[80vh] flex flex-col"
    >
      <div className="flex items-center space-x-3 mb-6 flex-shrink-0">
        <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900/50 rounded-full flex items-center justify-center">
          <Sparkles className="w-6 h-6 text-indigo-500" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            AI Help Center
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            हिंदी सहायता केंद्र
          </p>
        </div>
      </div>

      <div className="flex-1 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm rounded-2xl border border-gray-100 dark:border-white/10 overflow-hidden flex flex-col shadow-sm">
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex ${
                msg.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[75%] p-4 rounded-2xl ${
                  msg.role === "user"
                    ? "bg-indigo-500 text-white rounded-tr-sm"
                    : "bg-gray-100 dark:bg-slate-800 text-gray-800 dark:text-gray-200 rounded-tl-sm"
                }`}
              >
                {msg.role === "model" && (
                  <div className="flex items-center space-x-2 mb-2 text-indigo-600 dark:text-indigo-400">
                    <Bot className="w-4 h-4" />
                    <span className="text-xs font-medium">AI Agent</span>
                  </div>
                )}
                <p className="text-sm whitespace-pre-wrap">{msg.text}</p>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-gray-100 dark:bg-slate-800 text-gray-800 dark:text-gray-200 rounded-2xl rounded-tl-sm p-4 flex items-center space-x-2">
                <Loader2 className="w-4 h-4 animate-spin text-indigo-500" />
                <span className="text-sm">सोच रहा है...</span>
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        <div className="p-4 border-t border-gray-100 dark:border-white/10 bg-white dark:bg-slate-900">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center space-x-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="तपाइँको प्रश्न यहाँ टाइप गर्नुहोस्... (Type your question here...)"
              className="flex-1 px-4 py-3 bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-900 dark:text-white"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              className="bg-indigo-500 hover:bg-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed text-white p-3 rounded-xl transition-colors"
            >
              <Send className="w-5 h-5" />
            </button>
          </form>
        </div>
      </div>
    </motion.div>
  );
}
