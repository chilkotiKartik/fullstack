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
  Users,
  UserPlus,
  Info,
  Search,
} from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { Button } from "./ui/button";

interface GroupData {
  id: number;
  name: string;
  participants: string[];
  lastMessage: string;
  time: string;
  unread: number;
  avatar?: string;
  description?: string;
}

interface GroupMessage {
  id: number;
  text: string;
  time: string;
  sender: string;
  isSent: boolean;
  status?: "sending" | "sent" | "delivered" | "read";
}

interface GroupChatScreenProps {
  group: GroupData;
  onBack: () => void;
}

export function GroupChatScreen({ group, onBack }: GroupChatScreenProps) {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<GroupMessage[]>([
    {
      id: 1,
      text: "Hey everyone! Welcome to the group! 🎉",
      time: "10:30 AM",
      sender: "Alex Johnson",
      isSent: false,
    },
    {
      id: 2,
      text: "Thanks for adding me! Excited to be here",
      time: "10:31 AM",
      sender: "You",
      isSent: true,
      status: "read",
    },
    {
      id: 3,
      text: "This is going to be a great collaboration space",
      time: "10:32 AM",
      sender: "Sarah Chen",
      isSent: false,
    },
    {
      id: 4,
      text: "Absolutely! Can't wait to work together",
      time: "10:33 AM",
      sender: "Mike Rodriguez",
      isSent: false,
    },
    {
      id: 5,
      text: "Should we set up a meeting for next week?",
      time: "10:34 AM",
      sender: "You",
      isSent: true,
      status: "delivered",
    },
    {
      id: 6,
      text: "That sounds perfect! I'm free Tuesday or Wednesday",
      time: "10:35 AM",
      sender: "Emily Davis",
      isSent: false,
    },
  ]);
  const [typingUsers, setTypingUsers] = useState<string[]>([]);
  const [showGroupInfo, setShowGroupInfo] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (message.trim()) {
      const newMessage: GroupMessage = {
        id: messages.length + 1,
        text: message,
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        sender: "You",
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

      // Simulate typing responses
      setTimeout(() => {
        setTypingUsers(["Alex Johnson", "Sarah Chen"]);
      }, 1500);

      setTimeout(() => {
        setTypingUsers([]);
        const responses = [
          "Great idea! Let's do it",
          "Count me in!",
          "Tuesday works for me",
          "Looking forward to it!",
        ];
        const randomResponse =
          responses[Math.floor(Math.random() * responses.length)];
        const randomSender = ["Alex Johnson", "Sarah Chen", "Mike Rodriguez"][
          Math.floor(Math.random() * 3)
        ];

        setMessages((prev) => [
          ...prev,
          {
            id: prev.length + 1,
            text: randomResponse,
            time: new Date().toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            }),
            sender: randomSender,
            isSent: false,
          },
        ]);
      }, 3500);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const getSenderColor = (sender: string) => {
    const colors = [
      "text-blue-400",
      "text-green-400",
      "text-purple-400",
      "text-yellow-400",
      "text-pink-400",
      "text-indigo-400",
    ];
    const index = sender.charCodeAt(0) % colors.length;
    return colors[index];
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

        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-app-teal/30 to-app-cyan/30 flex items-center justify-center">
          <Users className="w-5 h-5 text-app-teal" />
        </div>

        <div
          className="flex-1 cursor-pointer"
          onClick={() => setShowGroupInfo(!showGroupInfo)}
        >
          <h2 className="text-white font-medium">{group.name}</h2>
          <p className="text-app-gray text-xs">
            {typingUsers.length > 0
              ? `${typingUsers.join(", ")} ${typingUsers.length === 1 ? "is" : "are"} typing...`
              : `${group.participants.length} participants`}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            className="p-2 hover:bg-app-darker interactive-button hidden md:flex"
          >
            <Search className="w-5 h-5 text-white" />
          </Button>
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
            onClick={() => setShowGroupInfo(!showGroupInfo)}
          >
            <Info className="w-5 h-5 text-white" />
          </Button>
        </div>
      </div>

      {/* Group Info Panel */}
      {showGroupInfo && (
        <div className="bg-app-dark px-4 py-3 border-b border-app-darker">
          <div className="space-y-3">
            <div>
              <h3 className="text-white font-medium">Description</h3>
              <p className="text-app-gray text-sm">
                Project collaboration group for the amazing ChatsApp
              </p>
            </div>
            <div>
              <h3 className="text-white font-medium mb-2">Participants</h3>
              <div className="flex flex-wrap gap-2">
                {group.participants.slice(0, 6).map((participant, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 bg-app-darker px-3 py-1 rounded-full"
                  >
                    <div className="w-6 h-6 rounded-full bg-app-teal/20 flex items-center justify-center">
                      <span className="text-app-teal text-xs">
                        {participant.charAt(0)}
                      </span>
                    </div>
                    <span className="text-white text-sm">{participant}</span>
                  </div>
                ))}
                {group.participants.length > 6 && (
                  <div className="flex items-center gap-2 bg-app-darker px-3 py-1 rounded-full">
                    <span className="text-app-gray text-sm">
                      +{group.participants.length - 6} more
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.isSent ? "justify-end" : "justify-start"} message-enter`}
          >
            <div
              className={`max-w-[80%] px-4 py-2 rounded-2xl relative ${
                msg.isSent ? "bg-app-teal text-white" : "bg-app-dark text-white"
              }`}
            >
              {!msg.isSent && (
                <p
                  className={`text-xs font-medium mb-1 ${getSenderColor(msg.sender)}`}
                >
                  {msg.sender}
                </p>
              )}
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

        {typingUsers.length > 0 && (
          <div className="flex justify-start">
            <div className="bg-app-dark px-4 py-2 rounded-2xl">
              <div className="flex items-center gap-2">
                <p className="text-xs text-app-gray">
                  {typingUsers.join(", ")}{" "}
                  {typingUsers.length === 1 ? "is" : "are"} typing
                </p>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-app-gray rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-app-gray rounded-full animate-bounce [animation-delay:0.1s]"></div>
                  <div className="w-2 h-2 bg-app-gray rounded-full animate-bounce [animation-delay:0.2s]"></div>
                </div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="bg-app-dark px-4 py-3 border-t border-app-darker">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="sm"
            className="p-2 hover:bg-app-darker interactive-button"
          >
            <Smile className="w-5 h-5 text-app-gray" />
          </Button>

          <div className="flex-1 relative">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Message..."
              className="w-full bg-app-darker text-white px-4 py-2 rounded-full outline-none ring-2 ring-transparent focus:ring-app-teal placeholder-app-gray transition-all duration-200"
            />
            <Button
              variant="ghost"
              size="sm"
              className="absolute right-1 top-1/2 transform -translate-y-1/2 p-1.5 hover:bg-app-dark"
            >
              <Paperclip className="w-4 h-4 text-app-gray" />
            </Button>
          </div>

          <Button
            variant="ghost"
            size="sm"
            className="p-2 hover:bg-app-darker interactive-button hidden md:flex"
          >
            <Camera className="w-5 h-5 text-app-gray" />
          </Button>

          {message.trim() ? (
            <Button
              onClick={handleSendMessage}
              size="sm"
              className="bg-app-teal hover:bg-app-teal/90 p-2 rounded-full floating-button"
            >
              <Send className="w-4 h-4 text-white" />
            </Button>
          ) : (
            <Button
              variant="ghost"
              size="sm"
              className="p-2 hover:bg-app-darker interactive-button"
            >
              <Mic className="w-5 h-5 text-app-gray" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
