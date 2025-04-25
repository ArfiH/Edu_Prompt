import { useState, useEffect, useRef } from "react";
import { Send, RefreshCw, UserCircle2, Bot } from "lucide-react";
import ReactMarkdown from 'react-markdown';

export default function GroqChat({ help }) {
  const apiKey = import.meta.env.VITE_GROQ_API_KEY;

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [model, setModel] = useState("llama3-70b-8192");

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Check if user is asking about the video
  const isReferringToVideo = (userInput) => {
    const input = userInput.toLowerCase();
    return (
      input.includes("video") ||
      input.includes("as given above") ||
      input.includes("in this topic") ||
      input.includes("above content") ||
      input.includes("this lecture") ||
      input.includes("the lesson") ||
      input.includes("this tutorial")
    );
  };


  // Focus input on component mount
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!input.trim() || !apiKey) return;

    // Add user message
    const userMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    if (isReferringToVideo(input)) {
      try {
        // For video-related questions, we'll still use the API but with enhanced context
        const response = await fetch(
          "https://api.groq.com/openai/v1/chat/completions",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${apiKey}`,
            },
            body: JSON.stringify({
              model: model,
              messages: [
                // Provide detailed context about the current video
                {
                  role: "system",
                  content: `You are an AI assistant helping with educational videos. 
                The user is asking about a video they're watching.
                
                VIDEO TITLE: "${help.title}"
                
                VIDEO DESCRIPTION: "${help.description}"
                
                VIDEO TRANSCRIPT/CAPTIONS: "${help.captions}"
                
                Please respond to their query based on this video content. Be specific, accurate, and helpful.`,
                },
                ...messages.filter(
                  (m) => !m.content.includes("system content")
                ), // avoid duplicate system messages
                userMessage,
              ],
              temperature: 0.7,
              max_tokens: 1024,
            }),
          }
        );

        const data = await response.json();

        if (data.choices && data.choices[0]) {
          setMessages((prev) => [...prev, data.choices[0].message]);
        } else {
          throw new Error("Invalid response from API");
        }
      } catch (error) {
        // Error handling
        console.error("Error:", error);
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content:
              "Sorry, I encountered an error while analyzing the video content. Please try again.",
          },
        ]);
      } finally {
        setIsLoading(false);
      }

      return;
    }

    try {
      // Call Groq API
      const response = await fetch(
        "https://api.groq.com/openai/v1/chat/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`,
          },
          body: JSON.stringify({
            model: model,
            messages: [...messages, userMessage],
            temperature: 0.7,
            max_tokens: 1024,
          }),
        }
      );

      const data = await response.json();

      if (data.choices && data.choices[0]) {
        setMessages((prev) => [...prev, data.choices[0].message]);
      } else {
        throw new Error("Invalid response from API");
      }
    } catch (error) {
      console.error("Error:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "Sorry, I encountered an error. Please check your API key and try again.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const clearChat = () => {
    setMessages([]);
  };

  const toggleSettings = () => {
    setShowSettings(!showSettings);
  };

  return (
    <div className="flex flex-col h-[80vh] bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 p-4">
        <div className="flex justify-between items-center max-w-4xl mx-auto">
          <h1 className="text-xl font-bold text-gray-800">Groq Chat</h1>
          <button
            onClick={toggleSettings}
            className="text-gray-500 hover:text-gray-700 focus:outline-none"
          >
            Settings
          </button>
        </div>
      </header>

      {/* Settings Panel */}
      {showSettings && (
        <div className="bg-white border-b border-gray-200 p-4">
          <div className="max-w-4xl mx-auto space-y-4">
            <div>
              <label
                htmlFor="model"
                className="block text-sm font-medium text-gray-700"
              >
                Model
              </label>
              <select
                id="model"
                value={model}
                onChange={(e) => setModel(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="llama3-70b-8192">Llama 3 (70B)</option>
                <option value="llama3-8b-8192">Llama 3 (8B)</option>
                <option value="mixtral-8x7b-32768">Mixtral 8x7B</option>
                <option value="gemma-7b-it">Gemma 7B</option>
              </select>
            </div>
            <div className="flex justify-end">
              <button
                onClick={clearChat}
                className="mr-2 px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Clear Chat
              </button>
              <button
                onClick={toggleSettings}
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <div className="max-w-4xl mx-auto space-y-4">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 text-gray-500">
              <Bot size={48} className="mb-4 text-gray-400" />
              <p className="text-xl font-medium">How can I help you today?</p>
              <p className="text-sm">
                Enter your Groq API key in Settings to get started
              </p>
            </div>
          ) : (
            messages.map((message, index) => (
              <div 
                key={index} 
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`
                  flex items-start space-x-2 max-w-3xl 
                  ${message.role === 'user' ? 'flex-row-reverse space-x-reverse' : 'flex-row'}
                `}>
                  <div className={`
                    p-1 rounded-full
                    ${message.role === 'user' ? 'bg-indigo-100' : 'bg-gray-100'}
                  `}>
                    {message.role === 'user' ? (
                      <UserCircle2 className="h-8 w-8 text-indigo-600" />
                    ) : (
                      <Bot className="h-8 w-8 text-gray-600" />
                    )}
                  </div>
                  <div 
                    className={`
                      py-3 px-4 rounded-2xl 
                      ${message.role === 'user' 
                        ? 'bg-indigo-600 text-white rounded-tr-none' 
                        : 'bg-white border border-gray-200 rounded-tl-none'}
                    `}
                  >
                    {message.role === 'user' ? (
                      <div className="prose prose-sm">{message.content}</div>
                    ) : (
                      <div className="prose prose-sm max-w-none">
                        <ReactMarkdown>{message.content}</ReactMarkdown>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
          {isLoading && (
            <div className="flex justify-start">
              <div className="flex items-start space-x-2 max-w-3xl">
                <div className="p-1 rounded-full bg-gray-100">
                  <Bot className="h-8 w-8 text-gray-600" />
                </div>
                <div className="py-3 px-4 rounded-2xl bg-white border border-gray-200 rounded-tl-none">
                  <div className="flex items-center space-x-2">
                    <RefreshCw className="h-4 w-4 text-gray-500 animate-spin" />
                    <span className="text-gray-500">Thinking...</span>
                  </div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Area */}
      <div className="border-t border-gray-200 bg-white p-4">
        <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
          <div className="flex items-center space-x-2">
            <div className="relative flex-1">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disabled={isLoading || !apiKey}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder={
                  !apiKey
                    ? "Enter API key in settings to start"
                    : "Type your message..."
                }
              />
            </div>
            <button
              type="submit"
              disabled={isLoading || !input.trim() || !apiKey}
              className={`
                p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500
                ${
                  isLoading || !input.trim() || !apiKey
                    ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                    : "bg-indigo-600 text-white hover:bg-indigo-700"
                }
              `}
            >
              <Send className="h-5 w-5" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
