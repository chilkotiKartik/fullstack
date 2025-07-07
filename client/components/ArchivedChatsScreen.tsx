import {
  ArrowLeft,
  Search,
  Archive,
  MessageCircle,
  Users,
  MoreVertical,
  Trash2,
  RotateCcw,
} from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";

interface ArchivedChat {
  id: number;
  name: string;
  lastMessage: string;
  time: string;
  isGroup: boolean;
}

interface ArchivedChatsScreenProps {
  onBack: () => void;
}

export function ArchivedChatsScreen({ onBack }: ArchivedChatsScreenProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedChats, setSelectedChats] = useState<number[]>([]);

  const archivedChats: ArchivedChat[] = [
    {
      id: 1,
      name: "Old Project Team",
      lastMessage: "Thanks everyone! Project completed successfully 🎉",
      time: "2 weeks ago",
      isGroup: true,
    },
    {
      id: 2,
      name: "John Smith",
      lastMessage: "See you later!",
      time: "1 month ago",
      isGroup: false,
    },
    {
      id: 3,
      name: "College Friends",
      lastMessage: "Great reunion guys! Let's plan another one",
      time: "2 months ago",
      isGroup: true,
    },
  ];

  const filteredChats = archivedChats.filter((chat) =>
    chat.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const toggleChatSelection = (chatId: number) => {
    setSelectedChats((prev) =>
      prev.includes(chatId)
        ? prev.filter((id) => id !== chatId)
        : [...prev, chatId],
    );
  };

  const unarchiveSelectedChats = () => {
    // In real app, this would update the backend
    console.log("Unarchiving chats:", selectedChats);
    setSelectedChats([]);
  };

  const deleteSelectedChats = () => {
    // In real app, this would delete from backend
    console.log("Deleting chats:", selectedChats);
    setSelectedChats([]);
  };

  return (
    <div className="mobile-container lg:flex-1">
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
        <h1 className="text-white font-medium text-lg flex-1">
          Archived Chats
        </h1>
        {selectedChats.length > 0 && (
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={unarchiveSelectedChats}
              className="p-2 hover:bg-app-darker"
            >
              <RotateCcw className="w-5 h-5 text-app-teal" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={deleteSelectedChats}
              className="p-2 hover:bg-app-darker"
            >
              <Trash2 className="w-5 h-5 text-red-400" />
            </Button>
          </div>
        )}
      </div>

      {/* Search */}
      <div className="px-4 py-4 bg-app-dark border-b border-app-darker">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-app-gray" />
          <input
            type="text"
            placeholder="Search archived chats..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-app-darker rounded-full py-3 pl-10 pr-4 text-white placeholder-app-gray outline-none ring-2 ring-transparent focus:ring-app-teal transition-all duration-200"
          />
        </div>
      </div>

      {/* Info Banner */}
      <div className="px-4 py-3 bg-app-teal/10 border-b border-app-darker">
        <div className="flex items-center gap-3">
          <Archive className="w-5 h-5 text-app-teal" />
          <div>
            <p className="text-white text-sm font-medium">
              {filteredChats.length} archived conversations
            </p>
            <p className="text-app-gray text-xs">
              Tap and hold to select multiple chats
            </p>
          </div>
        </div>
      </div>

      {/* Archived Chats List */}
      <div className="flex-1 overflow-y-auto pb-20 lg:pb-4">
        {filteredChats.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 px-6 text-center">
            <div className="w-16 h-16 bg-app-dark rounded-full flex items-center justify-center mb-4">
              <Archive className="w-8 h-8 text-app-gray" />
            </div>
            <h3 className="text-white font-medium mb-2">
              {searchQuery ? "No archived chats found" : "No archived chats"}
            </h3>
            <p className="text-app-gray text-sm">
              {searchQuery
                ? "Try searching with different keywords"
                : "Your archived conversations will appear here"}
            </p>
          </div>
        ) : (
          <div className="space-y-1">
            {filteredChats.map((chat) => (
              <div
                key={chat.id}
                onContextMenu={(e) => {
                  e.preventDefault();
                  toggleChatSelection(chat.id);
                }}
                className={`px-4 py-4 flex items-center gap-3 hover:bg-app-dark/30 transition-colors cursor-pointer ${
                  selectedChats.includes(chat.id) ? "bg-app-teal/10" : ""
                }`}
              >
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-app-gray/30 to-app-gray/50 flex items-center justify-center">
                  {chat.isGroup ? (
                    <Users className="w-6 h-6 text-app-gray" />
                  ) : (
                    <span className="text-app-gray font-medium text-sm">
                      {chat.name.charAt(0)}
                    </span>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-medium text-white/70 truncate">
                      {chat.name}
                    </h3>
                    <span className="text-xs text-app-gray">{chat.time}</span>
                  </div>
                  <p className="text-sm text-app-gray truncate">
                    {chat.lastMessage}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <Archive className="w-4 h-4 text-app-gray" />
                  {selectedChats.includes(chat.id) && (
                    <div className="w-2 h-2 bg-app-teal rounded-full"></div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
