import {
  Volume2,
  MoreVertical,
  QrCode,
  Camera,
  Search,
  Plus,
  Settings,
  Users,
  MessageCircle,
  Pin,
  Archive,
  Star,
  MoreHorizontal,
  CheckCircle2,
  Circle,
  Filter,
  SortDesc,
  Trash2,
  Bell,
  BellOff,
  Mic,
  Paperclip,
  Image,
  Video,
  MapPin,
  Clock,
  Download,
  Forward,
  Reply,
  Edit3,
  Copy,
  Info,
  UserCheck,
} from "lucide-react";
import { BottomNavigation } from "./BottomNavigation";
import { useState, useEffect, useRef } from "react";
import { Button } from "./ui/button";

interface ChatData {
  id: number;
  name: string;
  lastMessage: string;
  time: string;
  unread: number;
  avatar?: string;
}

interface GroupData {
  id: number;
  name: string;
  participants: string[];
  lastMessage: string;
  time: string;
  unread: number;
  isGroup: true;
}

interface MainAppScreenProps {
  onChatSelect?: (chat: ChatData) => void;
  onGroupSelect?: (group: GroupData) => void;
  onProfileOpen?: () => void;
  onContactsOpen?: () => void;
}

export function MainAppScreen({
  onChatSelect,
  onGroupSelect,
  onProfileOpen,
  onContactsOpen,
}: MainAppScreenProps) {
  const [activeTab, setActiveTab] = useState("chats");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [sortBy, setSortBy] = useState<"time" | "name" | "unread">("time");
  const [selectedChats, setSelectedChats] = useState<number[]>([]);
  const [isSelectionMode, setIsSelectionMode] = useState(false);
  const [showQuickActions, setShowQuickActions] = useState(false);
  const [pinnedChats, setPinnedChats] = useState<number[]>([1, 3]);
  const [archivedChats, setArchivedChats] = useState<number[]>([]);
  const [mutedChats, setMutedChats] = useState<number[]>([]);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Enhanced chat data with comprehensive metadata
  const allChats: (ChatData & {
    isOnline: boolean;
    lastSeen: string;
    messageType: "text" | "voice" | "image" | "video" | "document" | "location";
    isTyping: boolean;
    isMuted: boolean;
  })[] = [
    {
      id: 1,
      name: "Alex Johnson",
      lastMessage: "Hey! Are we still on for coffee this weekend? ☕",
      time: "2:30 PM",
      unread: 2,
      isOnline: true,
      lastSeen: "online",
      messageType: "text",
      isTyping: false,
      isMuted: false,
    },
    {
      id: 2,
      name: "Sarah Chen",
      lastMessage: "🎉 The project looks amazing! Great work",
      time: "1:15 PM",
      unread: 0,
      isOnline: true,
      lastSeen: "online",
      messageType: "text",
      isTyping: true,
      isMuted: false,
    },
    {
      id: 3,
      name: "Mike Rodriguez",
      lastMessage: "📎 presentation-final.pdf",
      time: "12:45 PM",
      unread: 1,
      isOnline: false,
      lastSeen: "2 hours ago",
      messageType: "document",
      isTyping: false,
      isMuted: false,
    },
    {
      id: 4,
      name: "Emily Davis",
      lastMessage: "📅 See you at the meeting tomorrow",
      time: "11:30 AM",
      unread: 0,
      isOnline: false,
      lastSeen: "45 minutes ago",
      messageType: "text",
      isTyping: false,
      isMuted: true,
    },
    {
      id: 5,
      name: "Mom",
      lastMessage: "❤️ Don't forget dinner on Sunday! Love you",
      time: "Yesterday",
      unread: 0,
      isOnline: false,
      lastSeen: "yesterday",
      messageType: "text",
      isTyping: false,
      isMuted: false,
    },
    {
      id: 6,
      name: "James Wilson",
      lastMessage: "🎵 Voice message (0:42)",
      time: "Yesterday",
      unread: 0,
      isOnline: true,
      lastSeen: "online",
      messageType: "voice",
      isTyping: false,
      isMuted: false,
    },
    {
      id: 7,
      name: "Lisa Wang",
      lastMessage: "📷 Photo",
      time: "2 days ago",
      unread: 1,
      isOnline: false,
      lastSeen: "1 day ago",
      messageType: "image",
      isTyping: false,
      isMuted: false,
    },
    {
      id: 8,
      name: "David Kumar",
      lastMessage: "📍 Shared location",
      time: "3 days ago",
      unread: 0,
      isOnline: false,
      lastSeen: "3 days ago",
      messageType: "location",
      isTyping: false,
      isMuted: false,
    },
    {
      id: 9,
      name: "Anna Thompson",
      lastMessage: "🎥 Video (2:15)",
      time: "1 week ago",
      unread: 0,
      isOnline: true,
      lastSeen: "online",
      messageType: "video",
      isTyping: false,
      isMuted: false,
    },
  ];

  // Filter chats based on current state
  const chats = allChats.filter((chat) => !archivedChats.includes(chat.id));

  // Enhanced groups data
  const allGroups: (GroupData & {
    description: string;
    messageType: "text" | "voice" | "image" | "video" | "document";
    adminCount: number;
    isMuted: boolean;
  })[] = [
    {
      id: 1,
      name: "🚀 Team Alpha",
      participants: [
        "Alex Johnson",
        "Sarah Chen",
        "Mike Rodriguez",
        "Emily Davis",
        "You",
      ],
      lastMessage: "Sarah: Can we reschedule the standup?",
      time: "10:20 AM",
      unread: 3,
      isGroup: true,
      description: "Main project team collaboration",
      messageType: "text",
      adminCount: 2,
      isMuted: false,
    },
    {
      id: 2,
      name: "🎨 Design Team",
      participants: [
        "Lisa Wang",
        "Emily Davis",
        "Anna Thompson",
        "David Kumar",
        "You",
      ],
      lastMessage: "Lisa: 📎 design-system-v2.fig",
      time: "Yesterday",
      unread: 5,
      isGroup: true,
      description: "Creative minds at work",
      messageType: "document",
      adminCount: 1,
      isMuted: false,
    },
    {
      id: 3,
      name: "👨‍👩‍👧‍👦 Family Group",
      participants: ["Mom", "Dad", "Sister", "Brother", "You"],
      lastMessage: "Mom: 📷 Photo",
      time: "2 days ago",
      unread: 0,
      isGroup: true,
      description: "Family forever ❤️",
      messageType: "image",
      adminCount: 2,
      isMuted: false,
    },
    {
      id: 4,
      name: "📚 Book Club",
      participants: [
        "Anna Thompson",
        "David Kumar",
        "Lisa Wang",
        "James Wilson",
        "Mike Rodriguez",
        "You",
      ],
      lastMessage: "Anna: 🎵 Voice message (1:23)",
      time: "3 days ago",
      unread: 2,
      isGroup: true,
      description: "Monthly book discussions",
      messageType: "voice",
      adminCount: 1,
      isMuted: true,
    },
    {
      id: 5,
      name: "🏋️ Gym Buddies",
      participants: ["James Wilson", "Alex Johnson", "Mike Rodriguez", "You"],
      lastMessage: "James: 📍 Shared location - Gold's Gym",
      time: "1 week ago",
      unread: 0,
      isGroup: true,
      description: "Fitness motivation group",
      messageType: "location",
      adminCount: 1,
      isMuted: false,
    },
  ];

  const groups = allGroups.filter((group) => !archivedChats.includes(group.id));

  // Filter chats based on search and filter
  const filteredChats = chats.filter((chat) => {
    if (
      searchQuery &&
      !chat.name.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false;
    }
    if (selectedFilter === "unread" && chat.unread === 0) {
      return false;
    }
    return true;
  });

  const filteredGroups = groups.filter((group) => {
    if (
      searchQuery &&
      !group.name.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false;
    }
    if (selectedFilter === "unread" && group.unread === 0) {
      return false;
    }
    return true;
  });

  // Helper function to get message type icon
  const getMessageTypeIcon = (type: string) => {
    switch (type) {
      case "voice":
        return <Mic className="w-4 h-4 text-app-teal" />;
      case "image":
        return <Image className="w-4 h-4 text-green-400" />;
      case "video":
        return <Video className="w-4 h-4 text-blue-400" />;
      case "document":
        return <Paperclip className="w-4 h-4 text-yellow-400" />;
      case "location":
        return <MapPin className="w-4 h-4 text-red-400" />;
      default:
        return null;
    }
  };

  const renderChatsTab = () => (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="px-6 py-4 flex items-center justify-between">
        <h1 className="text-xl font-medium text-app-teal lg:text-2xl">
          ChatsApp
        </h1>
        <div className="flex items-center gap-2">
          <button
            onClick={onContactsOpen}
            className="p-2 hover:bg-app-dark/50 rounded-full transition-colors interactive-button"
            title="Contacts"
          >
            <QrCode className="w-5 h-5 text-white" />
          </button>
          <button className="p-2 hover:bg-app-dark/50 rounded-full transition-colors interactive-button">
            <Camera className="w-5 h-5 text-white" />
          </button>
          <button
            onClick={onProfileOpen}
            className="p-2 hover:bg-app-dark/50 rounded-full transition-colors interactive-button"
          >
            <Settings className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>

      {/* Search */}
      <div className="px-6 mb-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-app-gray" />
          <input
            type="text"
            placeholder="Ask AI or Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-app-dark rounded-full py-3 pl-10 pr-4 text-white placeholder-app-gray outline-none ring-2 ring-transparent focus:ring-app-teal"
          />
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="px-6 mb-4">
        <div className="flex items-center gap-3 overflow-x-auto">
          <button
            onClick={() => setSelectedFilter("all")}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap ${
              selectedFilter === "all"
                ? "bg-app-teal/20 text-app-teal"
                : "text-app-gray hover:text-white hover:bg-app-dark/50"
            }`}
          >
            All
          </button>
          <button
            onClick={() => setSelectedFilter("unread")}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap ${
              selectedFilter === "unread"
                ? "bg-app-teal/20 text-app-teal"
                : "text-app-gray hover:text-white hover:bg-app-dark/50"
            }`}
          >
            Unread ({[...chats, ...groups].filter((c) => c.unread > 0).length})
          </button>
          <button
            onClick={() => setSelectedFilter("favourites")}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap ${
              selectedFilter === "favourites"
                ? "bg-app-teal/20 text-app-teal"
                : "text-app-gray hover:text-white hover:bg-app-dark/50"
            }`}
          >
            Favourites
          </button>
          <button
            onClick={() => setActiveTab("communities")}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap ${
              activeTab === "communities"
                ? "bg-app-teal/20 text-app-teal"
                : "text-app-gray hover:text-white hover:bg-app-dark/50"
            }`}
          >
            Groups ({groups.length})
          </button>
          <button
            onClick={onContactsOpen}
            className="w-8 h-8 rounded-full border border-app-gray flex items-center justify-center hover:border-app-teal hover:bg-app-teal/10 transition-all"
          >
            <Plus className="w-4 h-4 text-app-gray hover:text-app-teal" />
          </button>
        </div>
      </div>

      {/* Chat List */}
      <div className="flex-1 overflow-y-auto pb-20 lg:pb-4">
        {/* Individual Chats */}
        {filteredChats.map((chat) => (
          <div
            key={`chat-${chat.id}`}
            onClick={() => onChatSelect?.(chat)}
            className="px-6 py-3 flex items-center gap-3 chat-item cursor-pointer ripple"
          >
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-app-teal/30 to-app-cyan/30 flex-shrink-0 flex items-center justify-center">
              <span className="text-app-teal font-medium text-sm">
                {chat.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .slice(0, 2)}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                <h3 className="font-medium text-white truncate">{chat.name}</h3>
                <span className="text-xs text-app-gray">{chat.time}</span>
              </div>
              <p className="text-sm text-app-gray truncate">
                {chat.lastMessage}
              </p>
            </div>
            {chat.unread > 0 && (
              <div className="w-5 h-5 bg-app-teal rounded-full flex items-center justify-center flex-shrink-0 animate-pulse">
                <span className="text-xs text-white font-medium">
                  {chat.unread > 9 ? "9+" : chat.unread}
                </span>
              </div>
            )}
          </div>
        ))}

        {/* Groups Section */}
        {(activeTab === "chats" || activeTab === "communities") &&
          filteredGroups.length > 0 && (
            <>
              {activeTab === "chats" && (
                <div className="px-6 py-2">
                  <h3 className="text-app-gray text-sm font-medium">Groups</h3>
                </div>
              )}
              {filteredGroups.map((group) => (
                <div
                  key={`group-${group.id}`}
                  onClick={() => onGroupSelect?.(group)}
                  className="px-6 py-3 flex items-center gap-3 chat-item cursor-pointer ripple"
                >
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500/30 to-pink-500/30 flex-shrink-0 flex items-center justify-center">
                    <Users className="w-6 h-6 text-purple-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-medium text-white truncate">
                        {group.name}
                      </h3>
                      <span className="text-xs text-app-gray">
                        {group.time}
                      </span>
                    </div>
                    <p className="text-sm text-app-gray truncate">
                      {group.lastMessage}
                    </p>
                    <p className="text-xs text-app-gray mt-1">
                      {group.participants.length} participants
                    </p>
                  </div>
                  {group.unread > 0 && (
                    <div className="w-5 h-5 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0 animate-pulse">
                      <span className="text-xs text-white font-medium">
                        {group.unread > 9 ? "9+" : group.unread}
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </>
          )}

        {/* Empty State */}
        {filteredChats.length === 0 && filteredGroups.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12 px-6 text-center">
            <div className="w-16 h-16 bg-app-dark rounded-full flex items-center justify-center mb-4">
              <MessageCircle className="w-8 h-8 text-app-gray" />
            </div>
            <h3 className="text-white font-medium mb-2">
              No conversations found
            </h3>
            <p className="text-app-gray text-sm">
              {searchQuery
                ? "Try searching with different keywords"
                : "Start a new conversation"}
            </p>
          </div>
        )}
      </div>

      {/* Floating Action Button */}
      <button className="fixed bottom-24 right-6 w-14 h-14 bg-app-teal rounded-full flex items-center justify-center shadow-lg">
        <Plus className="w-6 h-6 text-white" />
      </button>
    </div>
  );

  const renderUpdatesTab = () => (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="px-6 py-4 flex items-center justify-between">
        <h1 className="text-xl font-medium text-app-teal">Updates</h1>
        <div className="flex items-center gap-4">
          <QrCode className="w-6 h-6 text-white" />
          <Search className="w-6 h-6 text-white" />
          <MoreVertical className="w-6 h-6 text-white" />
        </div>
      </div>

      {/* Status Section */}
      <div className="px-6 mb-6">
        <h2 className="text-white font-medium mb-4">Status</h2>
        <div className="flex items-center gap-3 mb-6 p-4 rounded-lg border border-app-dark">
          <div className="relative">
            <div className="w-12 h-12 rounded-full bg-app-gray/30"></div>
            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-app-teal rounded-full flex items-center justify-center">
              <Plus className="w-4 h-4 text-white" />
            </div>
          </div>
          <div>
            <h3 className="text-app-teal font-medium">Add Status</h3>
            <p className="text-sm text-app-gray">Disappears after 24 hours</p>
          </div>
        </div>
      </div>

      {/* Recent Updates */}
      <div className="px-6">
        <h3 className="text-white font-medium mb-4">Recent Updates</h3>
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-full bg-app-gray/30"></div>
            <div className="flex-1">
              <h4 className="text-white font-medium">Contact {i}</h4>
              <p className="text-sm text-app-gray">Today, 2:30 PM</p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex-1"></div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case "chats":
        return renderChatsTab();
      case "updates":
        return renderUpdatesTab();
      case "communities":
        return (
          <div className="flex flex-col items-center justify-center h-full px-6 text-center">
            <h2 className="text-app-teal text-xl font-medium mb-4">
              Communities
            </h2>
            <p className="text-app-gray">Communities feature coming soon</p>
          </div>
        );
      case "calls":
        return (
          <div className="flex flex-col items-center justify-center h-full px-6 text-center">
            <h2 className="text-app-teal text-xl font-medium mb-4">Calls</h2>
            <p className="text-app-gray">Calls feature coming soon</p>
          </div>
        );
      default:
        return renderChatsTab();
    }
  };

  return (
    <div className="mobile-container">
      {/* Status Bar */}
      <div className="status-bar">
        <div className="flex items-center gap-1">
          <Volume2 className="w-4 h-4" />
        </div>
        <div className="flex items-center gap-1">
          <MoreVertical className="w-4 h-4" />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 pb-16">{renderContent()}</div>

      {/* Bottom Navigation */}
      <BottomNavigation activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
}
