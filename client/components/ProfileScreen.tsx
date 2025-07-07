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
} from "lucide-react";
import { Button } from "./ui/button";
import { Switch } from "./ui/switch";
import { useState } from "react";

interface ProfileScreenProps {
  onBack: () => void;
}

export function ProfileScreen({ onBack }: ProfileScreenProps) {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkModeEnabled, setDarkModeEnabled] = useState(true);

  const profileSections = [
    {
      title: "Account",
      items: [
        {
          icon: Lock,
          label: "Privacy",
          description: "Last seen, profile photo, about",
        },
        {
          icon: Shield,
          label: "Security",
          description: "Two-step verification, change number",
        },
        { icon: QrCode, label: "QR Code", description: "Share your profile" },
      ],
    },
    {
      title: "Preferences",
      items: [
        {
          icon: Bell,
          label: "Notifications",
          description: "Message, group & call tones",
          hasSwitch: true,
          value: notificationsEnabled,
          onChange: setNotificationsEnabled,
        },
        {
          icon: Moon,
          label: "Dark Mode",
          description: "App appearance",
          hasSwitch: true,
          value: darkModeEnabled,
          onChange: setDarkModeEnabled,
        },
        { icon: Globe, label: "Language", description: "English" },
        { icon: Smartphone, label: "Linked Devices", description: "0 devices" },
      ],
    },
    {
      title: "Support",
      items: [
        {
          icon: HelpCircle,
          label: "Help",
          description: "Help center, contact us, privacy policy",
        },
        { icon: Heart, label: "Tell a friend", description: "Share this app" },
      ],
    },
  ];

  return (
    <div className="mobile-container">
      {/* Header */}
      <div className="bg-app-dark px-4 py-3 flex items-center gap-3 border-b border-app-darker">
        <Button
          variant="ghost"
          size="sm"
          onClick={onBack}
          className="p-2 hover:bg-app-darker"
        >
          <ArrowLeft className="w-5 h-5 text-white" />
        </Button>
        <h1 className="text-white font-medium text-lg">Settings</h1>
      </div>

      <div className="overflow-y-auto pb-20">
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
                Hey there! I'm using this awesome messaging app.
              </p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="p-2 hover:bg-app-darker"
            >
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
              <h3 className="text-app-gray text-sm font-medium uppercase tracking-wider">
                {section.title}
              </h3>
              <div className="space-y-1">
                {section.items.map((item, itemIndex) => (
                  <div
                    key={itemIndex}
                    className="flex items-center gap-4 p-3 rounded-lg hover:bg-app-dark/50 transition-colors cursor-pointer"
                  >
                    <div className="w-8 h-8 rounded-full bg-app-teal/20 flex items-center justify-center">
                      <item.icon className="w-4 h-4 text-app-teal" />
                    </div>
                    <div className="flex-1">
                      <p className="text-white font-medium">{item.label}</p>
                      <p className="text-app-gray text-sm">
                        {item.description}
                      </p>
                    </div>
                    {item.hasSwitch && item.onChange ? (
                      <Switch
                        checked={item.value}
                        onCheckedChange={item.onChange}
                        className="data-[state=checked]:bg-app-teal"
                      />
                    ) : (
                      <ArrowLeft className="w-4 h-4 text-app-gray rotate-180" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="px-6 py-4">
          <h3 className="text-app-gray text-sm font-medium uppercase tracking-wider mb-3">
            Usage
          </h3>
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
          </div>
        </div>

        {/* App Info */}
        <div className="px-6 py-4 text-center">
          <p className="text-app-gray text-sm">Messaging App v2.24.1</p>
          <p className="text-app-gray text-xs mt-1">
            Made with ❤️ by Builder.io
          </p>
        </div>
      </div>
    </div>
  );
}
