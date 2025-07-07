import { useState, useEffect } from "react";
import { SplashScreen } from "@/components/SplashScreen";
import { WelcomeScreen } from "@/components/WelcomeScreen";
import { PhoneVerificationEnhanced } from "@/components/PhoneVerificationEnhanced";
import { EnhancedMainAppScreen } from "@/components/EnhancedMainAppScreen";
import { ChatScreen } from "@/components/ChatScreen";
import { GroupChatScreen } from "@/components/GroupChatScreen";
import { SettingsScreen } from "@/components/SettingsScreen";
import { ContactsScreen } from "@/components/ContactsScreen";
import { NotificationSettingsScreen } from "@/components/NotificationSettingsScreen";
import { ArchivedChatsScreen } from "@/components/ArchivedChatsScreen";
import { PrivacySettingsScreen } from "@/components/PrivacySettingsScreen";
import { QRCodeScreen } from "@/components/QRCodeScreen";
import { CallScreen } from "@/components/CallScreen";
import { MediaViewer } from "@/components/MediaViewer";
import { StatusScreen } from "@/components/StatusScreen";
import { ChangeNumberScreen } from "@/components/ChangeNumberScreen";

type AppScreen =
  | "splash"
  | "welcome"
  | "phone-verification"
  | "main"
  | "chat"
  | "group-chat"
  | "settings"
  | "contacts"
  | "notification-settings"
  | "archived-chats"
  | "privacy-settings"
  | "security-settings"
  | "qr-code"
  | "change-number"
  | "account-info"
  | "call"
  | "media-viewer"
  | "status-viewer";

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

interface Contact {
  id: number;
  name: string;
  phone: string;
  status: string;
  isOnline: boolean;
  isFavorite: boolean;
  lastSeen: string;
}

export default function Index() {
  const [currentScreen, setCurrentScreen] = useState<AppScreen>("splash");
  const [selectedChat, setSelectedChat] = useState<ChatData | null>(null);
  const [selectedGroup, setSelectedGroup] = useState<GroupData | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isMobile, setIsMobile] = useState(true);

  // Check for responsive design
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Smooth transition between screens
  const navigateToScreen = (screen: AppScreen, data?: ChatData | GroupData) => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentScreen(screen);
      if (data && "isGroup" in data) {
        setSelectedGroup(data);
        setSelectedChat(null);
      } else if (data) {
        setSelectedChat(data as ChatData);
        setSelectedGroup(null);
      }
      setIsTransitioning(false);
    }, 150);
  };

  const handleSplashComplete = () => {
    navigateToScreen("welcome");
  };

  const handleWelcomeContinue = () => {
    navigateToScreen("phone-verification");
  };

  const handlePhoneVerified = () => {
    navigateToScreen("main");
  };

  const handleChatSelect = (chat: ChatData) => {
    navigateToScreen("chat", chat);
  };

  const handleGroupSelect = (group: GroupData) => {
    navigateToScreen("group-chat", group);
  };

  const handleContactSelect = (contact: Contact) => {
    // Convert contact to chat format for new conversation
    const newChat: ChatData = {
      id: Date.now(), // Simple ID generation
      name: contact.name,
      lastMessage: "Start a conversation...",
      time: "now",
      unread: 0,
    };
    navigateToScreen("chat", newChat);
  };

  const handleBackToMain = () => {
    navigateToScreen("main");
    setSelectedChat(null);
    setSelectedGroup(null);
  };

  const handleProfileOpen = () => {
    navigateToScreen("settings");
  };

  const handleContactsOpen = () => {
    navigateToScreen("contacts");
  };

  const handleNotificationSettings = () => {
    navigateToScreen("notification-settings");
  };

  const handleArchivedChats = () => {
    navigateToScreen("archived-chats");
  };

  const handlePrivacySettings = () => {
    navigateToScreen("privacy-settings");
  };

  const handleSecuritySettings = () => {
    navigateToScreen("security-settings");
  };

  const handleQRCode = () => {
    navigateToScreen("qr-code");
  };

  const handleChangeNumber = () => {
    navigateToScreen("change-number");
  };

  const handleAccountInfo = () => {
    navigateToScreen("account-info");
  };

  const handleCall = (contact: any, isVideo: boolean = false) => {
    // Store call data and navigate
    navigateToScreen("call");
  };

  const handleMediaViewer = (media: any[], index: number = 0) => {
    // Store media data and navigate
    navigateToScreen("media-viewer");
  };

  const handleStatusViewer = (contact: any, statusIndex: number = 0) => {
    // Store status data and navigate
    navigateToScreen("status-viewer");
  };

  const renderCurrentScreen = () => {
    switch (currentScreen) {
      case "splash":
        return <SplashScreen onComplete={handleSplashComplete} />;

      case "welcome":
        return <WelcomeScreen onContinue={handleWelcomeContinue} />;

      case "phone-verification":
        return (
          <PhoneVerificationEnhanced
            onVerified={handlePhoneVerified}
            onBack={() => navigateToScreen("welcome")}
          />
        );

      case "main":
        return (
          <EnhancedMainAppScreen
            onChatSelect={handleChatSelect}
            onGroupSelect={handleGroupSelect}
            onProfileOpen={handleProfileOpen}
            onContactsOpen={handleContactsOpen}
          />
        );

      case "chat":
        return selectedChat ? (
          <ChatScreen chat={selectedChat} onBack={handleBackToMain} />
        ) : (
          <EnhancedMainAppScreen
            onChatSelect={handleChatSelect}
            onGroupSelect={handleGroupSelect}
            onProfileOpen={handleProfileOpen}
            onContactsOpen={handleContactsOpen}
          />
        );

      case "group-chat":
        return selectedGroup ? (
          <GroupChatScreen group={selectedGroup} onBack={handleBackToMain} />
        ) : (
          <EnhancedMainAppScreen
            onChatSelect={handleChatSelect}
            onGroupSelect={handleGroupSelect}
            onProfileOpen={handleProfileOpen}
            onContactsOpen={handleContactsOpen}
          />
        );

      case "contacts":
        return (
          <ContactsScreen
            onBack={handleBackToMain}
            onStartChat={handleContactSelect}
          />
        );

      case "settings":
        return (
          <SettingsScreen
            onBack={handleBackToMain}
            onNotificationSettings={handleNotificationSettings}
            onArchivedChats={handleArchivedChats}
            onPrivacySettings={handlePrivacySettings}
            onSecuritySettings={handleSecuritySettings}
            onQRCode={handleQRCode}
            onChangeNumber={handleChangeNumber}
            onAccountInfo={handleAccountInfo}
          />
        );

      case "notification-settings":
        return (
          <NotificationSettingsScreen
            onBack={() => navigateToScreen("settings")}
          />
        );

      case "archived-chats":
        return (
          <ArchivedChatsScreen onBack={() => navigateToScreen("settings")} />
        );

      case "privacy-settings":
        return (
          <PrivacySettingsScreen onBack={() => navigateToScreen("settings")} />
        );

      case "security-settings":
        return <SettingsScreen onBack={() => navigateToScreen("settings")} />;

      case "qr-code":
        return <QRCodeScreen onBack={() => navigateToScreen("settings")} />;

      case "change-number":
        return (
          <ChangeNumberScreen
            onComplete={() => navigateToScreen("settings")}
            onBack={() => navigateToScreen("settings")}
          />
        );

      case "account-info":
        return <SettingsScreen onBack={() => navigateToScreen("settings")} />;

      case "call":
        return (
          <CallScreen
            contact={{ name: "Contact Name" }}
            callType="incoming"
            isVideoCall={false}
            onEndCall={handleBackToMain}
            onAcceptCall={() => console.log("Call accepted")}
            onDeclineCall={handleBackToMain}
          />
        );

      case "media-viewer":
        return (
          <MediaViewer media={[]} currentIndex={0} onClose={handleBackToMain} />
        );

      case "status-viewer":
        return <StatusScreen onClose={handleBackToMain} />;

      default:
        return <WelcomeScreen onContinue={handleWelcomeContinue} />;
    }
  };

  return (
    <div className="min-h-screen bg-app-darker overflow-hidden lg:bg-gradient-to-br lg:from-app-darker lg:to-app-dark lg:p-4">
      <div
        className={`transition-all duration-300 transform ${
          isTransitioning ? "opacity-0 scale-95" : "opacity-100 scale-100"
        } ${isMobile ? "" : "lg:max-w-6xl lg:mx-auto lg:shadow-2xl lg:rounded-2xl lg:overflow-hidden"}`}
      >
        {renderCurrentScreen()}
      </div>

      {/* Desktop keyboard shortcuts hint */}
      {!isMobile &&
        (currentScreen === "main" ||
          currentScreen === "chat" ||
          currentScreen === "group-chat") && (
          <div className="fixed bottom-6 left-6 bg-app-dark/80 backdrop-blur-sm rounded-lg px-4 py-2 text-app-gray text-sm">
            <div className="flex items-center gap-4">
              <span>
                <kbd className="bg-app-darker px-2 py-1 rounded text-xs">
                  Ctrl+K
                </kbd>{" "}
                Search
              </span>
              <span>
                <kbd className="bg-app-darker px-2 py-1 rounded text-xs">
                  Ctrl+N
                </kbd>{" "}
                New Chat
              </span>
              <span>
                <kbd className="bg-app-darker px-2 py-1 rounded text-xs">
                  Esc
                </kbd>{" "}
                Back
              </span>
            </div>
          </div>
        )}
    </div>
  );
}
