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
  X,
  ArrowUp,
  ArrowDown,
  Zap,
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
  isOnline: boolean;
  lastSeen: string;
  messageType: "text" | "voice" | "image" | "video" | "document" | "location";
  isTyping: boolean;
  isMuted: boolean;
}

interface GroupData {
  id: number;
  name: string;
  participants: string[];
  lastMessage: string;
  time: string;
  unread: number;
  isGroup: true;
  description: string;
  messageType: "text" | "voice" | "image" | "video" | "document" | "location";
  adminCount: number;
  isMuted: boolean;
}

interface MainAppScreenProps {
  onChatSelect?: (chat: ChatData) => void;
  onGroupSelect?: (group: GroupData) => void;
  onProfileOpen?: () => void;
  onContactsOpen?: () => void;
}

export function EnhancedMainAppScreen({
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
  const [mutedChats, setMutedChats] = useState<number[]>([4]);
  const [showFilters, setShowFilters] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Enhanced chat data with comprehensive metadata
  const allChats: ChatData[] = [
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
  ];

  // Enhanced groups data
  const allGroups: GroupData[] = [
    {
      id: 101,
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
      id: 102,
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
      id: 103,
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
  ];

  // Filter chats based on current state
  const chats = allChats.filter((chat) => !archivedChats.includes(chat.id));
  const groups = allGroups.filter((group) => !archivedChats.includes(group.id));

  // Advanced filtering and sorting
  const filteredChats = chats
    .filter((chat) => {
      if (
        searchQuery &&
        !chat.name.toLowerCase().includes(searchQuery.toLowerCase())
      ) {
        return false;
      }
      if (selectedFilter === "unread" && chat.unread === 0) return false;
      if (selectedFilter === "favourites" && !pinnedChats.includes(chat.id))
        return false;
      if (selectedFilter === "online" && !chat.isOnline) return false;
      if (selectedFilter === "muted" && !mutedChats.includes(chat.id))
        return false;
      return true;
    })
    .sort((a, b) => {
      // Always show pinned chats first
      const aIsPinned = pinnedChats.includes(a.id);
      const bIsPinned = pinnedChats.includes(b.id);
      if (aIsPinned && !bIsPinned) return -1;
      if (!aIsPinned && bIsPinned) return 1;

      switch (sortBy) {
        case "name":
          return a.name.localeCompare(b.name);
        case "unread":
          return b.unread - a.unread;
        case "time":
        default:
          return a.time.includes("PM") && b.time.includes("AM") ? -1 : 1;
      }
    });

  const filteredGroups = groups.filter((group) => {
    if (
      searchQuery &&
      !group.name.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false;
    }
    if (selectedFilter === "unread" && group.unread === 0) return false;
    if (selectedFilter === "favourites" && !pinnedChats.includes(group.id))
      return false;
    if (selectedFilter === "muted" && !mutedChats.includes(group.id))
      return false;
    return true;
  });

  // Quick action handlers
  const toggleChatSelection = (chatId: number) => {
    setSelectedChats((prev) =>
      prev.includes(chatId)
        ? prev.filter((id) => id !== chatId)
        : [...prev, chatId],
    );
  };

  const togglePinChat = (chatId: number) => {
    setPinnedChats((prev) =>
      prev.includes(chatId)
        ? prev.filter((id) => id !== chatId)
        : [...prev, chatId],
    );
  };

  const toggleMuteChat = (chatId: number) => {
    setMutedChats((prev) =>
      prev.includes(chatId)
        ? prev.filter((id) => id !== chatId)
        : [...prev, chatId],
    );
  };

  const archiveSelectedChats = () => {
    setArchivedChats((prev) => [...prev, ...selectedChats]);
    setSelectedChats([]);
    setIsSelectionMode(false);
  };

  const deleteSelectedChats = () => {
    setSelectedChats([]);
    setIsSelectionMode(false);
  };

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

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey) {
        switch (e.key) {
          case "k":
            e.preventDefault();
            searchInputRef.current?.focus();
            break;
          case "n":
            e.preventDefault();
            onContactsOpen?.();
            break;
          case "a":
            e.preventDefault();
            if (isSelectionMode) {
              setSelectedChats(filteredChats.map((c) => c.id));
            }
            break;
        }
      }
      if (e.key === "Escape") {
        setIsSelectionMode(false);
        setSelectedChats([]);
        setSearchQuery("");
        setShowFilters(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isSelectionMode, filteredChats, onContactsOpen]);

  const renderChatsTab = () => (
    <div className="flex flex-col h-full">
      {/* Stunning Enhanced Header */}
      <div className="relative px-6 py-4 bg-gradient-to-r from-app-darker via-app-dark to-app-darker">
        {/* Background Glow Effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-app-teal/5 via-transparent to-app-cyan/5"></div>
        <div className="absolute top-0 left-1/4 w-32 h-32 bg-app-teal/10 rounded-full blur-3xl"></div>
        <div className="absolute top-0 right-1/4 w-24 h-24 bg-app-cyan/10 rounded-full blur-2xl"></div>

        <div className="relative z-10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-app-teal via-app-cyan to-app-teal bg-clip-text text-transparent animate-fade-in">
                ChatsApp
              </h1>
              <div className="absolute -inset-1 bg-gradient-to-r from-app-teal/20 to-app-cyan/20 rounded-lg blur opacity-30 animate-pulse"></div>
            </div>
            {isSelectionMode && (
              <div className="px-3 py-1 bg-app-teal/20 rounded-full border border-app-teal/30 animate-scale-in">
                <span className="text-sm text-app-teal font-medium">
                  {selectedChats.length} selected
                </span>
              </div>
            )}
          </div>

          <div className="flex items-center gap-1">
            {isSelectionMode ? (
              <>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() =>
                    setSelectedChats(filteredChats.map((c) => c.id))
                  }
                  className="p-3 hover:bg-app-teal/20 rounded-xl transition-all duration-200 hover:scale-110"
                >
                  <CheckCircle2 className="w-5 h-5 text-app-teal" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={archiveSelectedChats}
                  className="p-3 hover:bg-app-dark/50 rounded-xl transition-all duration-200 hover:scale-110"
                >
                  <Archive className="w-5 h-5 text-white" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={deleteSelectedChats}
                  className="p-3 hover:bg-red-500/20 rounded-xl transition-all duration-200 hover:scale-110"
                >
                  <Trash2 className="w-5 h-5 text-red-400" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsSelectionMode(false)}
                  className="p-3 hover:bg-app-dark/50 rounded-xl transition-all duration-200 hover:scale-110"
                >
                  <X className="w-5 h-5 text-white" />
                </Button>
              </>
            ) : (
              <>
                <button
                  onClick={onContactsOpen}
                  className="p-3 hover:bg-app-teal/20 rounded-xl transition-all duration-200 hover:scale-110 relative group"
                  title="QR Code"
                >
                  <QrCode className="w-6 h-6 text-white group-hover:text-app-teal transition-colors" />
                  <div className="absolute inset-0 bg-app-teal/0 group-hover:bg-app-teal/10 rounded-xl transition-colors"></div>
                </button>
                <button className="p-3 hover:bg-app-teal/20 rounded-xl transition-all duration-200 hover:scale-110 relative group">
                  <Camera className="w-6 h-6 text-white group-hover:text-app-teal transition-colors" />
                  <div className="absolute inset-0 bg-app-teal/0 group-hover:bg-app-teal/10 rounded-xl transition-colors"></div>
                </button>
                <button
                  onClick={onProfileOpen}
                  className="p-3 hover:bg-app-teal/20 rounded-xl transition-all duration-200 hover:scale-110 relative group"
                >
                  <Settings className="w-6 h-6 text-white group-hover:text-app-teal transition-colors" />
                  <div className="absolute inset-0 bg-app-teal/0 group-hover:bg-app-teal/10 rounded-xl transition-colors"></div>
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Beautiful Enhanced Search Section */}
      <div className="px-6 mb-6">
        {/* Search Input with Stunning Design */}
        <div className="relative mb-4">
          {/* Search Background Glow */}
          <div className="absolute inset-0 bg-gradient-to-r from-app-teal/10 to-app-cyan/10 rounded-2xl blur-sm"></div>

          <div className="relative bg-gradient-to-r from-app-dark to-app-darker rounded-2xl p-1 shadow-xl">
            <div className="relative bg-app-darker rounded-xl">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-app-teal" />
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Search conversations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent py-4 pl-12 pr-16 text-white placeholder-app-gray/70 outline-none text-lg"
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center gap-1">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className={`p-2 rounded-xl transition-all duration-200 hover:scale-110 ${
                    showFilters
                      ? "bg-app-teal text-white shadow-lg"
                      : "text-app-gray hover:text-app-teal hover:bg-app-teal/10"
                  }`}
                >
                  <Filter className="w-4 h-4" />
                </button>
                <button
                  onClick={() =>
                    setSortBy(
                      sortBy === "time"
                        ? "name"
                        : sortBy === "name"
                          ? "unread"
                          : "time",
                    )
                  }
                  className="p-2 rounded-xl text-app-gray hover:text-app-teal hover:bg-app-teal/10 transition-all duration-200 hover:scale-110"
                  title={`Sort by ${sortBy}`}
                >
                  <SortDesc className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Beautiful Chat Statistics */}
        <div className="bg-gradient-to-r from-app-dark/50 to-app-darker/50 rounded-xl p-4 border border-app-teal/10">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-app-teal rounded-full animate-pulse"></div>
              <span className="text-white font-medium">
                {filteredChats.length + filteredGroups.length} conversations
              </span>
            </div>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-app-cyan rounded-full"></div>
                <span className="text-app-cyan font-medium">
                  {filteredChats.filter((c) => c.unread > 0).length +
                    filteredGroups.filter((g) => g.unread > 0).length}{" "}
                  unread
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Pin className="w-3 h-3 text-yellow-400" />
                <span className="text-yellow-400 font-medium">
                  {pinnedChats.length} pinned
                </span>
              </div>
              <div className="flex items-center gap-2">
                <BellOff className="w-3 h-3 text-app-gray" />
                <span className="text-app-gray font-medium">
                  {mutedChats.length} muted
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Filters */}
        {showFilters && (
          <div className="bg-app-dark rounded-lg p-4 mb-4 space-y-3 animate-in slide-in-from-top-2 duration-200">
            <h3 className="text-white font-medium text-sm">Filters</h3>
            <div className="flex flex-wrap gap-2">
              {["all", "unread", "favourites", "online", "muted"].map(
                (filter) => (
                  <button
                    key={filter}
                    onClick={() => setSelectedFilter(filter)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                      selectedFilter === filter
                        ? "bg-app-teal text-white"
                        : "bg-app-darker text-app-gray hover:text-white hover:bg-app-gray/20"
                    }`}
                  >
                    {filter === "favourites"
                      ? "Pinned"
                      : filter.charAt(0).toUpperCase() + filter.slice(1)}
                    {filter === "unread" &&
                      ` (${[...chats, ...groups].filter((c) => c.unread > 0).length})`}
                  </button>
                ),
              )}
            </div>
            <div className="flex items-center justify-between pt-2 border-t border-app-darker">
              <span className="text-app-gray text-xs">Sort by: {sortBy}</span>
              <button
                onClick={() => setShowFilters(false)}
                className="text-app-teal text-xs"
              >
                Done
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Statistics Bar */}
      <div className="px-6 mb-4">
        <div className="flex items-center justify-between text-xs text-app-gray">
          <span>
            {filteredChats.length + filteredGroups.length} conversations
          </span>
          <div className="flex items-center gap-4">
            <span>
              {
                [...filteredChats, ...filteredGroups].filter(
                  (c) => c.unread > 0,
                ).length
              }{" "}
              unread
            </span>
            <span>{pinnedChats.length} pinned</span>
            <span>{mutedChats.length} muted</span>
          </div>
        </div>
      </div>

      {/* Enhanced Chat List */}
      <div className="flex-1 overflow-y-auto pb-20 lg:pb-4">
        {/* Beautiful Pinned Chats Section */}
        {pinnedChats.length > 0 && !searchQuery && selectedFilter === "all" && (
          <div className="px-6 py-3 mb-2">
            <div className="flex items-center gap-3 px-4 py-2 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 rounded-xl border border-yellow-500/20">
              <div className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-lg flex items-center justify-center shadow-lg">
                <Pin className="w-4 h-4 text-white" />
              </div>
              <div>
                <h3 className="text-yellow-400 font-semibold">
                  Pinned Conversations
                </h3>
                <p className="text-yellow-300/70 text-xs">
                  Your most important chats
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Individual Chats */}
        {filteredChats.map((chat) => (
          <div
            key={`chat-${chat.id}`}
            className={`px-6 py-3 flex items-center gap-3 chat-item cursor-pointer ripple group ${
              selectedChats.includes(chat.id) ? "bg-app-teal/10" : ""
            }`}
            onClick={() => {
              if (isSelectionMode) {
                toggleChatSelection(chat.id);
              } else {
                onChatSelect?.(chat);
              }
            }}
            onContextMenu={(e) => {
              e.preventDefault();
              setIsSelectionMode(true);
              toggleChatSelection(chat.id);
            }}
          >
            {/* Selection Checkbox */}
            {isSelectionMode && (
              <div className="flex-shrink-0">
                {selectedChats.includes(chat.id) ? (
                  <CheckCircle2 className="w-5 h-5 text-app-teal" />
                ) : (
                  <Circle className="w-5 h-5 text-app-gray" />
                )}
              </div>
            )}

            {/* Avatar with Status */}
            <div className="relative flex-shrink-0">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-app-teal/30 to-app-cyan/30 flex items-center justify-center">
                <span className="text-app-teal font-medium text-sm">
                  {chat.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .slice(0, 2)}
                </span>
              </div>
              {chat.isOnline && (
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-app-green rounded-full border-2 border-app-darker"></div>
              )}
              {chat.isTyping && (
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-app-teal rounded-full animate-pulse"></div>
              )}
            </div>

            {/* Chat Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2">
                  <h3
                    className={`font-medium truncate ${
                      chat.unread > 0 ? "text-white" : "text-white/80"
                    }`}
                  >
                    {chat.name}
                  </h3>
                  {pinnedChats.includes(chat.id) && (
                    <Pin className="w-3 h-3 text-app-teal" />
                  )}
                  {mutedChats.includes(chat.id) && (
                    <BellOff className="w-3 h-3 text-app-gray" />
                  )}
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-xs text-app-gray">{chat.time}</span>
                  {getMessageTypeIcon(chat.messageType)}
                </div>
              </div>
              <div className="flex items-center justify-between">
                <p
                  className={`text-sm truncate flex items-center gap-1 ${
                    chat.unread > 0 ? "text-white/90" : "text-app-gray"
                  }`}
                >
                  {chat.isTyping ? (
                    <span className="text-app-teal">typing...</span>
                  ) : (
                    chat.lastMessage
                  )}
                </p>
                {chat.unread > 0 && (
                  <div className="ml-2 flex-shrink-0">
                    <div className="w-5 h-5 bg-app-teal rounded-full flex items-center justify-center animate-pulse">
                      <span className="text-xs text-white font-medium">
                        {chat.unread > 9 ? "9+" : chat.unread}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Quick Actions (on hover) */}
            {!isSelectionMode && (
              <div className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    togglePinChat(chat.id);
                  }}
                  className="p-1 hover:bg-app-dark rounded-full transition-colors"
                  title={pinnedChats.includes(chat.id) ? "Unpin" : "Pin"}
                >
                  <Pin
                    className={`w-4 h-4 ${
                      pinnedChats.includes(chat.id)
                        ? "text-app-teal"
                        : "text-app-gray"
                    }`}
                  />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleMuteChat(chat.id);
                  }}
                  className="p-1 hover:bg-app-dark rounded-full transition-colors"
                  title={mutedChats.includes(chat.id) ? "Unmute" : "Mute"}
                >
                  {mutedChats.includes(chat.id) ? (
                    <BellOff className="w-4 h-4 text-app-gray" />
                  ) : (
                    <Bell className="w-4 h-4 text-app-gray" />
                  )}
                </button>
              </div>
            )}
          </div>
        ))}

        {/* Groups Section */}
        {(activeTab === "chats" || activeTab === "communities") &&
          filteredGroups.length > 0 && (
            <>
              <div className="px-6 py-2 mt-4">
                <h3 className="text-app-gray text-sm font-medium flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  Groups
                </h3>
              </div>
              {filteredGroups.map((group, index) => (
                <div
                  key={`group-${group.id}`}
                  onClick={() => onGroupSelect?.(group)}
                  className="relative mx-4 mb-2 rounded-2xl overflow-hidden chat-item cursor-pointer group transition-all duration-300 bg-gradient-to-r from-purple-500/10 to-pink-500/10 hover:from-purple-500/20 hover:to-pink-500/20"
                  style={{
                    animationDelay: `${(index + filteredChats.length) * 50}ms`,
                  }}
                >
                  {/* Group Background Animation */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-500/10 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>

                  <div className="relative z-10 px-4 py-4 flex items-center gap-4">
                    {/* Enhanced Group Avatar */}
                    <div className="relative flex-shrink-0">
                      <div className="w-14 h-14 rounded-full bg-gradient-to-br from-purple-500/40 to-pink-500/40 flex items-center justify-center shadow-lg border-2 border-purple-500/20">
                        <Users className="w-7 h-7 text-purple-300" />
                      </div>

                      {/* Group Member Count Indicator */}
                      <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-purple-600 rounded-full flex items-center justify-center border-2 border-app-darker shadow-lg">
                        <span className="text-xs text-white font-bold">
                          {group.participants.length}
                        </span>
                      </div>
                    </div>

                    {/* Enhanced Group Info */}
                    <div className="flex-1 min-w-0 space-y-1">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold text-white truncate text-lg">
                            {group.name}
                          </h3>
                          {group.isMuted && (
                            <BellOff className="w-3 h-3 text-app-gray/70" />
                          )}
                        </div>

                        <div className="flex items-center gap-2">
                          <span className="text-xs text-app-gray/80 font-medium">
                            {group.time}
                          </span>
                          {getMessageTypeIcon(group.messageType)}
                        </div>
                      </div>

                      <p className="text-sm text-app-gray truncate line-clamp-1">
                        {group.lastMessage}
                      </p>

                      <div className="flex items-center justify-between">
                        <p className="text-xs text-purple-300/80 font-medium">
                          {group.participants.length} participants
                        </p>

                        {/* Enhanced Group Unread Badge */}
                        {group.unread > 0 && (
                          <div className="relative">
                            <div className="w-6 h-6 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg animate-pulse">
                              <span className="text-xs text-white font-bold">
                                {group.unread > 9 ? "9+" : group.unread}
                              </span>
                            </div>
                            <div className="absolute inset-0 bg-purple-500 rounded-full animate-ping opacity-20"></div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Bottom Border Glow */}
                  <div className="absolute bottom-0 left-4 right-4 h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent"></div>
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
            <p className="text-app-gray text-sm mb-4">
              {searchQuery
                ? "Try searching with different keywords"
                : "Start a new conversation"}
            </p>
            <Button
              onClick={onContactsOpen}
              className="bg-app-teal hover:bg-app-teal/90 text-white"
            >
              <Plus className="w-4 h-4 mr-2" />
              New Chat
            </Button>
          </div>
        )}
      </div>

      {/* Stunning Floating Action Button */}
      <div className="fixed bottom-24 lg:bottom-6 right-6">
        {/* Button Glow Effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-app-teal to-app-cyan rounded-full blur-lg opacity-30 animate-pulse"></div>

        <Button
          onClick={onContactsOpen}
          className="relative w-16 h-16 bg-gradient-to-br from-app-teal via-app-cyan to-app-teal rounded-full flex items-center justify-center shadow-2xl floating-button group border-2 border-white/20 overflow-hidden"
        >
          {/* Button Background Animation */}
          <div className="absolute inset-0 bg-gradient-to-r from-app-cyan to-app-teal opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

          {/* Plus Icon with Animation */}
          <Plus className="relative z-10 w-7 h-7 text-white group-hover:rotate-180 group-hover:scale-110 transition-all duration-300" />

          {/* Ripple Effect */}
          <div className="absolute inset-0 bg-white/0 group-active:bg-white/20 rounded-full transition-colors duration-100"></div>

          {/* Border Glow */}
          <div className="absolute inset-0 rounded-full border-2 border-transparent group-hover:border-white/30 transition-colors duration-300"></div>
        </Button>
      </div>
    </div>
  );

  // Rest of the component methods remain the same...
  const renderUpdatesTab = () => (
    <div className="flex flex-col h-full">
      <div className="px-6 py-4 flex items-center justify-between">
        <h1 className="text-xl font-medium text-app-teal">Updates</h1>
        <div className="flex items-center gap-4">
          <QrCode className="w-6 h-6 text-white" />
          <Search className="w-6 h-6 text-white" />
          <MoreVertical className="w-6 h-6 text-white" />
        </div>
      </div>

      <div className="px-6 mb-6">
        <h2 className="text-white font-medium mb-4">Status</h2>
        <div className="flex items-center gap-3 mb-6 p-4 rounded-lg border border-app-dark card-hover">
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

      <div className="px-6">
        <h3 className="text-white font-medium mb-4">Recent Updates</h3>
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="flex items-center gap-3 mb-4 p-2 rounded-lg hover:bg-app-dark/30 transition-colors"
          >
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-app-teal/30 to-app-cyan/30 flex items-center justify-center">
              <span className="text-app-teal font-medium">C{i}</span>
            </div>
            <div className="flex-1">
              <h4 className="text-white font-medium">Contact {i}</h4>
              <p className="text-sm text-app-gray">Today, 2:30 PM</p>
            </div>
          </div>
        ))}
      </div>
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
            <div className="w-16 h-16 bg-app-dark rounded-full flex items-center justify-center mb-4">
              <Users className="w-8 h-8 text-app-teal" />
            </div>
            <h2 className="text-app-teal text-xl font-medium mb-4">
              Communities
            </h2>
            <p className="text-app-gray mb-6">
              Stay connected with your groups and communities
            </p>
            <Button className="bg-app-teal hover:bg-app-teal/90 text-white">
              Explore Communities
            </Button>
          </div>
        );
      case "calls":
        return (
          <div className="flex flex-col items-center justify-center h-full px-6 text-center">
            <div className="w-16 h-16 bg-app-dark rounded-full flex items-center justify-center mb-4">
              <Video className="w-8 h-8 text-app-teal" />
            </div>
            <h2 className="text-app-teal text-xl font-medium mb-4">Calls</h2>
            <p className="text-app-gray mb-6">
              Your call history will appear here
            </p>
            <Button className="bg-app-teal hover:bg-app-teal/90 text-white">
              Make a Call
            </Button>
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
      <div className="flex-1 pb-16 lg:pb-0 desktop-main">{renderContent()}</div>

      {/* Bottom Navigation */}
      <BottomNavigation activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
}
