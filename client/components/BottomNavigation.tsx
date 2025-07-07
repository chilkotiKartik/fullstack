import { MessageCircle, RotateCcw, Users, Phone } from "lucide-react";

interface BottomNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function BottomNavigation({
  activeTab,
  onTabChange,
}: BottomNavigationProps) {
  const tabs = [
    { id: "chats", label: "Chats", icon: MessageCircle },
    { id: "updates", label: "Updates", icon: RotateCcw },
    { id: "communities", label: "Communities", icon: Users },
    { id: "calls", label: "Calls", icon: Phone },
  ];

  return (
    <div className="bottom-nav max-w-sm mx-auto">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        return (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`nav-item ${activeTab === tab.id ? "active" : ""}`}
          >
            <Icon className="w-6 h-6" />
            <span>{tab.label}</span>
          </button>
        );
      })}
    </div>
  );
}
