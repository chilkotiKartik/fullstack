import {
  ArrowLeft,
  Phone,
  Video,
  MoreVertical,
  Smile,
  Paperclip,
  Send,
  Mic,
  Camera,
} from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { Button } from "./ui/button";

interface ChatData {
  id: number;
  name: string;
  lastMessage: string;
  time: string;
  unread: number;
  avatar?: string;
}

interface Message {
  id: number;
  text: string;
  time: string;
  isSent: boolean;
  status?: "sending" | "sent" | "delivered" | "read";
}

interface ChatScreenProps {
  chat: ChatData;
  onBack: () => void;
}

export function ChatScreen({ chat, onBack }: ChatScreenProps) {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hey! How are you doing today?",
      time: "2:30 PM",
      isSent: false,
    },
    {
      id: 2,
      text: "I'm doing great, thanks for asking! How about you?",
      time: "2:31 PM",
      isSent: true,
      status: "read",
    },
    {
      id: 3,
      text: "Pretty good! Working on some exciting projects",
      time: "2:32 PM",
      isSent: false,
    },
    {
      id: 4,
      text: "That sounds awesome! I'd love to hear more about it",
      time: "2:33 PM",
      isSent: true,
      status: "read",
    },
    {
      id: 5,
      text: "Sure! Let's catch up soon. Are you free this weekend?",
      time: "2:34 PM",
      isSent: false,
    },
    {
      id: 6,
      text: "Yes, I should be free on Saturday. Want to grab coffee?",
      time: "2:35 PM",
      isSent: true,
      status: "delivered",
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (message.trim()) {
      const newMessage: Message = {
        id: messages.length + 1,
        text: message,
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        isSent: true,
        status: "sending",
      };

      setMessages([...messages, newMessage]);
      setMessage("");

      // Simulate message status updates
      setTimeout(() => {
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === newMessage.id ? { ...msg, status: "sent" } : msg,
          ),
        );
      }, 500);

      setTimeout(() => {
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === newMessage.id ? { ...msg, status: "delivered" } : msg,
          ),
        );
      }, 1000);

      // Simulate typing indicator and auto-response
      setTimeout(() => {
        setIsTyping(true);
      }, 1500);

      setTimeout(() => {
        setIsTyping(false);
        const responses = [
          "That sounds perfect!",
          "Great idea! I'll see you then",
          "Looking forward to it!",
          "Awesome, let's do it!",
        ];
        const randomResponse =
          responses[Math.floor(Math.random() * responses.length)];

        setMessages((prev) => [
          ...prev,
          {
            id: prev.length + 1,
            text: randomResponse,
            time: new Date().toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            }),
            isSent: false,
          },
        ]);
      }, 3000);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="mobile-container flex flex-col h-screen lg:flex-1">
      {/* Header */}
      <div className="bg-app-dark px-4 py-3 flex items-center gap-3 border-b border-app-darker">
        <Button
          variant="ghost"
          size="sm"
          onClick={onBack}
          className="p-2 hover:bg-app-darker lg:hidden"
        >
          <ArrowLeft className="w-5 h-5 text-white" />
        </Button>

        <div className="w-10 h-10 rounded-full bg-app-teal/20 flex items-center justify-center">
          <span className="text-app-teal font-medium text-sm">
            {chat.name.charAt(0)}
          </span>
        </div>

        <div className="flex-1">
          <h2 className="text-white font-medium">{chat.name}</h2>
          <p className="text-app-gray text-xs">
            {isTyping ? "typing..." : "online"}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            className="p-2 hover:bg-app-darker interactive-button"
          >
            <Video className="w-5 h-5 text-white" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="p-2 hover:bg-app-darker interactive-button"
          >
            <Phone className="w-5 h-5 text-white" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="p-2 hover:bg-app-darker interactive-button"
          >
            <MoreVertical className="w-5 h-5 text-white" />
          </Button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.isSent ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[80%] px-4 py-2 rounded-2xl relative ${
                msg.isSent ? "bg-app-teal text-white" : "bg-app-dark text-white"
              }`}
            >
              <p className="text-sm">{msg.text}</p>
              <div className="flex items-center gap-1 mt-1">
                <span className="text-xs opacity-70">{msg.time}</span>
                {msg.isSent && (
                  <div className="flex items-center">
                    {msg.status === "sending" && (
                      <div className="w-2 h-2 bg-white/50 rounded-full animate-pulse"></div>
                    )}
                    {msg.status === "sent" && (
                      <div className="w-3 h-3 text-white/70">✓</div>
                    )}
                    {msg.status === "delivered" && (
                      <div className="w-3 h-3 text-white/70">✓✓</div>
                    )}
                    {msg.status === "read" && (
                      <div className="w-3 h-3 text-app-cyan">✓✓</div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-app-dark px-4 py-2 rounded-2xl">
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-app-gray rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-app-gray rounded-full animate-bounce [animation-delay:0.1s]"></div>
                <div className="w-2 h-2 bg-app-gray rounded-full animate-bounce [animation-delay:0.2s]"></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="bg-app-dark px-4 py-3 border-t border-app-darker">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" className="p-2 hover:bg-app-darker">
            <Smile className="w-5 h-5 text-app-gray" />
          </Button>

          <div className="flex-1 relative">
            <input
              ref={inputRef}
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type a message"
              className="w-full bg-app-darker text-white px-4 py-2 rounded-full outline-none ring-2 ring-transparent focus:ring-app-teal placeholder-app-gray"
            />
            <Button
              variant="ghost"
              size="sm"
              className="absolute right-1 top-1/2 transform -translate-y-1/2 p-1.5 hover:bg-app-dark"
            >
              <Paperclip className="w-4 h-4 text-app-gray" />
            </Button>
          </div>

          <Button variant="ghost" size="sm" className="p-2 hover:bg-app-darker">
            <Camera className="w-5 h-5 text-app-gray" />
          </Button>

          {message.trim() ? (
            <Button
              onClick={handleSendMessage}
              size="sm"
              className="bg-app-teal hover:bg-app-teal/90 p-2 rounded-full"
            >
              <Send className="w-4 h-4 text-white" />
            </Button>
          ) : (
            <Button
              variant="ghost"
              size="sm"
              className="p-2 hover:bg-app-darker"
            >
              <Mic className="w-5 h-5 text-app-gray" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
