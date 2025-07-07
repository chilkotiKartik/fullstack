import {
  ArrowLeft,
  Edit3,
  QrCode,
  Star,
  Lock,
  Bell,
  HelpCircle,
  Heart,
  Users,
  Settings,
  Moon,
  Smartphone,
  Globe,
  Shield,
  Camera,
  Key,
  Download,
  Share,
  Info,
  LogOut,
  Trash2,
  Archive,
  ChevronRight,
  User,
  Database,
  Wifi,
  Battery,
  Volume2,
  Palette,
  Eye,
  MessageSquare,
  Phone,
  Video,
  Mic,
  Image as ImageIcon,
  File,
} from "lucide-react";
import { Button } from "./ui/button";
import { Switch } from "./ui/switch";
import { useState } from "react";

interface SettingsScreenProps {
  onBack: () => void;
  onNotificationSettings?: () => void;
  onArchivedChats?: () => void;
  onPrivacySettings?: () => void;
  onSecuritySettings?: () => void;
  onQRCode?: () => void;
  onChangeNumber?: () => void;
  onAccountInfo?: () => void;
}

export function SettingsScreen({
  onBack,
  onNotificationSettings,
  onArchivedChats,
  onPrivacySettings,
  onSecuritySettings,
  onQRCode,
  onChangeNumber,
  onAccountInfo,
}: SettingsScreenProps) {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkModeEnabled, setDarkModeEnabled] = useState(true);
  const [readReceiptsEnabled, setReadReceiptsEnabled] = useState(true);
  const [lastSeenEnabled, setLastSeenEnabled] = useState(true);
  const [profilePhotoEnabled, setProfilePhotoEnabled] = useState(true);
  const [aboutEnabled, setAboutEnabled] = useState(true);
  const [twoStepEnabled, setTwoStepEnabled] = useState(false);
  const [fingerprintEnabled, setFingerprintEnabled] = useState(true);
  const [autoDownloadEnabled, setAutoDownloadEnabled] = useState(true);
  const [selectedSection, setSelectedSection] = useState<string | null>(null);

  const profileSections = [
    {
      title: "Account",
      icon: User,
      items: [
        {
          icon: Lock,
          label: "Privacy",
          description: "Last seen, profile photo, about",
          hasArrow: true,
          onClick: onPrivacySettings,
        },
        {
          icon: Shield,
          label: "Security",
          description: "Two-step verification, change number",
          hasArrow: true,
          onClick: onSecuritySettings,
        },
        {
          icon: QrCode,
          label: "QR Code",
          description: "Share your profile",
          hasArrow: true,
          onClick: onQRCode,
        },
        {
          icon: Key,
          label: "Change Number",
          description: "Update your phone number",
          hasArrow: true,
          onClick: onChangeNumber,
        },
        {
          icon: Archive,
          label: "Request Account Info",
          description: "Download your data",
          hasArrow: true,
          onClick: onAccountInfo,
        },
        {
          icon: Trash2,
          label: "Delete My Account",
          description: "Permanently delete your account",
          hasArrow: true,
          textColor: "text-red-400",
        },
      ],
    },
    {
      title: "Preferences",
      icon: Settings,
      items: [
        {
          icon: Bell,
          label: "Notifications",
          description: "Message, group & call tones",
          hasArrow: true,
          onClick: onNotificationSettings,
        },
        {
          icon: Moon,
          label: "Dark Mode",
          description: "App appearance",
          hasSwitch: true,
          value: darkModeEnabled,
          onChange: setDarkModeEnabled,
        },
        {
          icon: Globe,
          label: "Language",
          description: "English",
          hasArrow: true,
        },
        {
          icon: Smartphone,
          label: "Linked Devices",
          description: "0 devices",
          hasArrow: true,
        },
        {
          icon: Palette,
          label: "Chat Wallpaper",
          description: "Customize your chat background",
          hasArrow: true,
        },
        {
          icon: Eye,
          label: "Font Size",
          description: "Medium",
          hasArrow: true,
        },
      ],
    },
    {
      title: "Chats",
      icon: MessageSquare,
      items: [
        {
          icon: Archive,
          label: "Archived Chats",
          description: "View your archived conversations",
          hasArrow: true,
          onClick: onArchivedChats,
        },
        {
          icon: Download,
          label: "Chat Backup",
          description: "Back up your chats to cloud storage",
          hasArrow: true,
        },
        {
          icon: Download,
          label: "Auto-Download Media",
          description: "Photos, videos, documents",
          hasSwitch: true,
          value: autoDownloadEnabled,
          onChange: setAutoDownloadEnabled,
        },
        {
          icon: Database,
          label: "Storage Usage",
          description: "Manage storage and data usage",
          hasArrow: true,
        },
        {
          icon: Wifi,
          label: "Network Usage",
          description: "View data consumption",
          hasArrow: true,
        },
      ],
    },
    {
      title: "Support",
      icon: HelpCircle,
      items: [
        {
          icon: HelpCircle,
          label: "Help",
          description: "Help center, contact us, privacy policy",
          hasArrow: true,
        },
        {
          icon: Heart,
          label: "Tell a friend",
          description: "Share this app",
          hasArrow: true,
        },
        {
          icon: Info,
          label: "App Info",
          description: "Version, terms, licenses",
          hasArrow: true,
        },
        {
          icon: Star,
          label: "Rate Us",
          description: "Rate ChatsApp on the store",
          hasArrow: true,
        },
      ],
    },
  ];

  const privacySettings = [
    {
      label: "Last Seen",
      description: "Who can see when you were last online",
      value: lastSeenEnabled,
      onChange: setLastSeenEnabled,
    },
    {
      label: "Profile Photo",
      description: "Who can see your profile photo",
      value: profilePhotoEnabled,
      onChange: setProfilePhotoEnabled,
    },
    {
      label: "About",
      description: "Who can see your about information",
      value: aboutEnabled,
      onChange: setAboutEnabled,
    },
    {
      label: "Read Receipts",
      description: "Turn off to hide read receipts",
      value: readReceiptsEnabled,
      onChange: setReadReceiptsEnabled,
    },
  ];

  const securitySettings = [
    {
      label: "Two-Step Verification",
      description: "Add extra security to your account",
      value: twoStepEnabled,
      onChange: setTwoStepEnabled,
    },
    {
      label: "Fingerprint Lock",
      description: "Use fingerprint to unlock app",
      value: fingerprintEnabled,
      onChange: setFingerprintEnabled,
    },
  ];

  const renderMainSettings = () => (
    <>
      {/* Profile Header */}
      <div className="bg-app-dark px-6 py-6 border-b border-app-darker">
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="w-16 h-16 rounded-full bg-app-teal/20 flex items-center justify-center">
              <span className="text-app-teal font-medium text-xl">You</span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-app-teal hover:bg-app-teal/90 p-0"
            >
              <Camera className="w-4 h-4 text-white" />
            </Button>
          </div>
          <div className="flex-1">
            <h2 className="text-white font-medium text-xl">Your Name</h2>
            <p className="text-app-gray text-sm">
              Hey there! I'm using ChatsApp.
            </p>
          </div>
          <Button variant="ghost" size="sm" className="p-2 hover:bg-app-darker">
            <Edit3 className="w-5 h-5 text-app-teal" />
          </Button>
        </div>

        <div className="mt-4 p-3 bg-app-darker rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white font-medium">+1 (555) 123-4567</p>
              <p className="text-app-gray text-sm">Phone number</p>
            </div>
            <QrCode className="w-6 h-6 text-app-teal" />
          </div>
        </div>
      </div>

      {/* Settings Sections */}
      <div className="px-6 py-4 space-y-6">
        {profileSections.map((section, sectionIndex) => (
          <div key={sectionIndex} className="space-y-3">
            <div className="flex items-center gap-2">
              <section.icon className="w-5 h-5 text-app-teal" />
              <h3 className="text-app-gray text-sm font-medium uppercase tracking-wider">
                {section.title}
              </h3>
            </div>
            <div className="space-y-1">
              {section.items.map((item, itemIndex) => (
                <div
                  key={itemIndex}
                  onClick={item.onClick}
                  className={`flex items-center gap-4 p-3 rounded-lg hover:bg-app-dark/50 transition-colors ${
                    item.onClick ? "cursor-pointer" : ""
                  }`}
                >
                  <div className="w-8 h-8 rounded-full bg-app-teal/20 flex items-center justify-center">
                    <item.icon className="w-4 h-4 text-app-teal" />
                  </div>
                  <div className="flex-1">
                    <p
                      className={`font-medium ${
                        item.textColor || "text-white"
                      }`}
                    >
                      {item.label}
                    </p>
                    <p className="text-app-gray text-sm">{item.description}</p>
                  </div>
                  {item.hasSwitch && item.onChange ? (
                    <Switch
                      checked={item.value}
                      onCheckedChange={item.onChange}
                      className="data-[state=checked]:bg-app-teal"
                    />
                  ) : item.hasArrow ? (
                    <ChevronRight className="w-4 h-4 text-app-gray" />
                  ) : null}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Stats Section */}
      <div className="px-6 py-4">
        <div className="flex items-center gap-2 mb-3">
          <Database className="w-5 h-5 text-app-teal" />
          <h3 className="text-app-gray text-sm font-medium uppercase tracking-wider">
            Usage Statistics
          </h3>
        </div>
        <div className="bg-app-dark rounded-lg p-4 space-y-4">
          <div className="flex justify-between">
            <span className="text-white">Messages sent</span>
            <span className="text-app-teal font-medium">1,247</span>
          </div>
          <div className="flex justify-between">
            <span className="text-white">Storage used</span>
            <span className="text-app-teal font-medium">2.4 GB</span>
          </div>
          <div className="flex justify-between">
            <span className="text-white">Contacts</span>
            <span className="text-app-teal font-medium">89</span>
          </div>
          <div className="flex justify-between">
            <span className="text-white">Active since</span>
            <span className="text-app-teal font-medium">March 2024</span>
          </div>
        </div>
      </div>

      {/* Logout Section */}
      <div className="px-6 py-4 border-t border-app-darker">
        <button className="flex items-center gap-4 p-3 rounded-lg hover:bg-red-500/10 transition-colors w-full">
          <div className="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center">
            <LogOut className="w-4 h-4 text-red-400" />
          </div>
          <div className="flex-1 text-left">
            <p className="text-red-400 font-medium">Log Out</p>
            <p className="text-app-gray text-sm">Sign out of your account</p>
          </div>
        </button>
      </div>

      {/* App Info */}
      <div className="px-6 py-4 text-center border-t border-app-darker">
        <p className="text-app-gray text-sm">ChatsApp v2.24.1</p>
        <p className="text-app-gray text-xs mt-1">Made with ❤️ by Builder.io</p>
        <p className="text-app-gray text-xs mt-2">
          © 2024 ChatsApp. All rights reserved.
        </p>
      </div>
    </>
  );

  const renderPrivacySettings = () => (
    <>
      <div className="px-6 py-4">
        <h2 className="text-white text-lg font-medium mb-4">
          Privacy Settings
        </h2>
        <p className="text-app-gray text-sm mb-6">
          Control who can see your information and activity
        </p>
      </div>

      <div className="px-6 space-y-4">
        {privacySettings.map((setting, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-4 bg-app-dark rounded-lg"
          >
            <div className="flex-1">
              <h3 className="text-white font-medium">{setting.label}</h3>
              <p className="text-app-gray text-sm">{setting.description}</p>
            </div>
            <Switch
              checked={setting.value}
              onCheckedChange={setting.onChange}
              className="data-[state=checked]:bg-app-teal"
            />
          </div>
        ))}
      </div>

      <div className="px-6 py-6">
        <div className="bg-app-dark rounded-lg p-4">
          <h3 className="text-white font-medium mb-2">Blocked Contacts</h3>
          <p className="text-app-gray text-sm mb-4">0 blocked contacts</p>
          <Button className="w-full bg-app-teal hover:bg-app-teal/90 text-white">
            Manage Blocked Contacts
          </Button>
        </div>
      </div>
    </>
  );

  const renderSecuritySettings = () => (
    <>
      <div className="px-6 py-4">
        <h2 className="text-white text-lg font-medium mb-4">
          Security Settings
        </h2>
        <p className="text-app-gray text-sm mb-6">
          Enhance your account security with additional protection
        </p>
      </div>

      <div className="px-6 space-y-4">
        {securitySettings.map((setting, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-4 bg-app-dark rounded-lg"
          >
            <div className="flex-1">
              <h3 className="text-white font-medium">{setting.label}</h3>
              <p className="text-app-gray text-sm">{setting.description}</p>
            </div>
            <Switch
              checked={setting.value}
              onCheckedChange={setting.onChange}
              className="data-[state=checked]:bg-app-teal"
            />
          </div>
        ))}
      </div>

      <div className="px-6 py-6 space-y-4">
        <div className="bg-app-dark rounded-lg p-4">
          <h3 className="text-white font-medium mb-2">Active Sessions</h3>
          <p className="text-app-gray text-sm mb-4">
            Manage your active login sessions
          </p>
          <Button className="w-full bg-app-teal hover:bg-app-teal/90 text-white">
            View Active Sessions
          </Button>
        </div>

        <div className="bg-app-dark rounded-lg p-4">
          <h3 className="text-white font-medium mb-2">Security Checkup</h3>
          <p className="text-app-gray text-sm mb-4">
            Review your security settings
          </p>
          <Button className="w-full bg-app-teal hover:bg-app-teal/90 text-white">
            Run Security Checkup
          </Button>
        </div>
      </div>
    </>
  );

  return (
    <div className="mobile-container">
      {/* Header */}
      <div className="bg-app-dark px-4 py-3 flex items-center gap-3 border-b border-app-darker">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => {
            if (selectedSection) {
              setSelectedSection(null);
            } else {
              onBack();
            }
          }}
          className="p-2 hover:bg-app-darker lg:hidden"
        >
          <ArrowLeft className="w-5 h-5 text-white" />
        </Button>
        <h1 className="text-white font-medium text-lg">
          {selectedSection === "privacy"
            ? "Privacy"
            : selectedSection === "security"
              ? "Security"
              : "Settings"}
        </h1>
      </div>

      <div className="overflow-y-auto pb-20 lg:pb-4">
        {!selectedSection && renderMainSettings()}
        {selectedSection === "privacy" && renderPrivacySettings()}
        {selectedSection === "security" && renderSecuritySettings()}
      </div>
    </div>
  );
}
