import {
  ArrowLeft,
  Search,
  UserPlus,
  Phone,
  MessageCircle,
  Video,
  Star,
  Users,
  Filter,
  SortAsc,
} from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";

interface Contact {
  id: number;
  name: string;
  phone: string;
  status: string;
  isOnline: boolean;
  isFavorite: boolean;
  lastSeen: string;
  avatar?: string;
}

interface ContactsScreenProps {
  onBack: () => void;
  onStartChat: (contact: Contact) => void;
}

export function ContactsScreen({ onBack, onStartChat }: ContactsScreenProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState<"all" | "favorites" | "online">("all");
  const [sortBy, setSortBy] = useState<"name" | "recent">("name");

  const contacts: Contact[] = [
    {
      id: 1,
      name: "Alex Johnson",
      phone: "+1 (555) 123-4567",
      status: "Working on something amazing",
      isOnline: true,
      isFavorite: true,
      lastSeen: "online",
    },
    {
      id: 2,
      name: "Sarah Chen",
      phone: "+1 (555) 234-5678",
      status: "Building the future",
      isOnline: true,
      isFavorite: false,
      lastSeen: "online",
    },
    {
      id: 3,
      name: "Mike Rodriguez",
      phone: "+1 (555) 345-6789",
      status: "Coffee enthusiast ☕",
      isOnline: false,
      isFavorite: true,
      lastSeen: "last seen 2 hours ago",
    },
    {
      id: 4,
      name: "Emily Davis",
      phone: "+1 (555) 456-7890",
      status: "Design is my passion",
      isOnline: false,
      isFavorite: false,
      lastSeen: "last seen yesterday",
    },
    {
      id: 5,
      name: "James Wilson",
      phone: "+1 (555) 567-8901",
      status: "Tech lead @ Company",
      isOnline: true,
      isFavorite: false,
      lastSeen: "online",
    },
    {
      id: 6,
      name: "Lisa Wang",
      phone: "+1 (555) 678-9012",
      status: "Product manager",
      isOnline: false,
      isFavorite: true,
      lastSeen: "last seen 5 minutes ago",
    },
    {
      id: 7,
      name: "David Kumar",
      phone: "+1 (555) 789-0123",
      status: "Always learning",
      isOnline: false,
      isFavorite: false,
      lastSeen: "last seen 3 days ago",
    },
    {
      id: 8,
      name: "Anna Thompson",
      phone: "+1 (555) 890-1234",
      status: "Love traveling ✈️",
      isOnline: true,
      isFavorite: false,
      lastSeen: "online",
    },
  ];

  const filteredContacts = contacts
    .filter((contact) => {
      if (searchQuery) {
        return (
          contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          contact.phone.includes(searchQuery)
        );
      }
      return true;
    })
    .filter((contact) => {
      switch (filter) {
        case "favorites":
          return contact.isFavorite;
        case "online":
          return contact.isOnline;
        default:
          return true;
      }
    })
    .sort((a, b) => {
      if (sortBy === "name") {
        return a.name.localeCompare(b.name);
      }
      // For recent sorting, we'd typically sort by last interaction
      return a.name.localeCompare(b.name);
    });

  const toggleFavorite = (contactId: number) => {
    // In a real app, this would update the contact in state/database
    console.log("Toggle favorite for contact", contactId);
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
        <h1 className="text-white font-medium text-lg flex-1">Contacts</h1>
        <Button
          variant="ghost"
          size="sm"
          className="p-2 hover:bg-app-darker interactive-button"
        >
          <UserPlus className="w-5 h-5 text-app-teal" />
        </Button>
      </div>

      {/* Search */}
      <div className="px-4 py-4 bg-app-dark border-b border-app-darker">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-app-gray" />
          <input
            type="text"
            placeholder="Search contacts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-app-darker rounded-full py-3 pl-10 pr-4 text-white placeholder-app-gray outline-none ring-2 ring-transparent focus:ring-app-teal transition-all duration-200"
          />
        </div>
      </div>

      {/* Filters */}
      <div className="px-4 py-3 bg-app-dark border-b border-app-darker">
        <div className="flex items-center gap-3 mb-3">
          <Button
            onClick={() => setFilter("all")}
            variant={filter === "all" ? "default" : "ghost"}
            size="sm"
            className={`px-4 py-2 rounded-full text-sm ${
              filter === "all"
                ? "bg-app-teal text-white"
                : "text-app-gray hover:text-white"
            }`}
          >
            All ({contacts.length})
          </Button>
          <Button
            onClick={() => setFilter("favorites")}
            variant={filter === "favorites" ? "default" : "ghost"}
            size="sm"
            className={`px-4 py-2 rounded-full text-sm ${
              filter === "favorites"
                ? "bg-app-teal text-white"
                : "text-app-gray hover:text-white"
            }`}
          >
            Favorites ({contacts.filter((c) => c.isFavorite).length})
          </Button>
          <Button
            onClick={() => setFilter("online")}
            variant={filter === "online" ? "default" : "ghost"}
            size="sm"
            className={`px-4 py-2 rounded-full text-sm ${
              filter === "online"
                ? "bg-app-teal text-white"
                : "text-app-gray hover:text-white"
            }`}
          >
            Online ({contacts.filter((c) => c.isOnline).length})
          </Button>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSortBy(sortBy === "name" ? "recent" : "name")}
            className="p-2 hover:bg-app-darker text-app-gray hover:text-white"
          >
            <SortAsc className="w-4 h-4" />
          </Button>
          <span className="text-app-gray text-sm">
            Sort by {sortBy === "name" ? "Name" : "Recent"}
          </span>
        </div>
      </div>

      {/* Contacts List */}
      <div className="flex-1 overflow-y-auto pb-20 lg:pb-4">
        {filteredContacts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 px-6 text-center">
            <Users className="w-12 h-12 text-app-gray mb-4" />
            <h3 className="text-white font-medium mb-2">No contacts found</h3>
            <p className="text-app-gray text-sm">
              {searchQuery
                ? "Try searching with a different term"
                : "Your contacts will appear here"}
            </p>
          </div>
        ) : (
          <div className="space-y-1">
            {filteredContacts.map((contact) => (
              <div
                key={contact.id}
                className="px-4 py-4 flex items-center gap-3 chat-item cursor-pointer"
                onClick={() => onStartChat(contact)}
              >
                <div className="relative">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-app-teal/30 to-app-cyan/30 flex items-center justify-center">
                    <span className="text-app-teal font-medium text-sm">
                      {contact.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .slice(0, 2)}
                    </span>
                  </div>
                  {contact.isOnline && (
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-app-green rounded-full border-2 border-app-darker"></div>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-medium text-white truncate">
                      {contact.name}
                    </h3>
                    {contact.isFavorite && (
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    )}
                  </div>
                  <p className="text-sm text-app-gray truncate mb-1">
                    {contact.status}
                  </p>
                  <p className="text-xs text-app-gray">{contact.lastSeen}</p>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(contact.id);
                    }}
                    className="p-2 hover:bg-app-darker"
                  >
                    <Star
                      className={`w-4 h-4 ${
                        contact.isFavorite
                          ? "text-yellow-400 fill-current"
                          : "text-app-gray"
                      }`}
                    />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      console.log("Call", contact.name);
                    }}
                    className="p-2 hover:bg-app-darker"
                  >
                    <Phone className="w-4 h-4 text-app-gray" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      console.log("Video call", contact.name);
                    }}
                    className="p-2 hover:bg-app-darker"
                  >
                    <Video className="w-4 h-4 text-app-gray" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Floating Add Button */}
      <Button className="fixed bottom-24 lg:bottom-6 right-6 w-14 h-14 bg-app-teal rounded-full flex items-center justify-center shadow-lg floating-button">
        <UserPlus className="w-6 h-6 text-white" />
      </Button>
    </div>
  );
}
