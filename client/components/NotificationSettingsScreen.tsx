import {
  ArrowLeft,
  Bell,
  BellOff,
  Volume2,
  VolumeX,
  Vibrate,
  Moon,
  MessageSquare,
  Users,
  Phone,
  Video,
} from "lucide-react";
import { Button } from "./ui/button";
import { Switch } from "./ui/switch";
import { useState } from "react";

interface NotificationSettingsScreenProps {
  onBack: () => void;
}

export function NotificationSettingsScreen({
  onBack,
}: NotificationSettingsScreenProps) {
  const [notificationSettings, setNotificationSettings] = useState({
    messagesEnabled: true,
    groupsEnabled: true,
    callsEnabled: true,
    soundEnabled: true,
    vibrationEnabled: true,
    ledEnabled: true,
    popupEnabled: true,
    inAppSounds: true,
    inAppVibration: true,
    inAppPreview: true,
  });

  const [quietHours, setQuietHours] = useState({
    enabled: false,
    startTime: "22:00",
    endTime: "07:00",
  });

  const updateSetting = (key: keyof typeof notificationSettings) => {
    setNotificationSettings((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const notificationTypes = [
    {
      icon: MessageSquare,
      title: "Messages",
      description: "New message notifications",
      key: "messagesEnabled" as const,
    },
    {
      icon: Users,
      title: "Groups",
      description: "Group message notifications",
      key: "groupsEnabled" as const,
    },
    {
      icon: Phone,
      title: "Calls",
      description: "Incoming call notifications",
      key: "callsEnabled" as const,
    },
  ];

  const soundAndVibration = [
    {
      icon: Volume2,
      title: "Sound",
      description: "Play notification sounds",
      key: "soundEnabled" as const,
    },
    {
      icon: Vibrate,
      title: "Vibration",
      description: "Vibrate for notifications",
      key: "vibrationEnabled" as const,
    },
  ];

  const inAppSettings = [
    {
      title: "In-App Sounds",
      description: "Play sounds within the app",
      key: "inAppSounds" as const,
    },
    {
      title: "In-App Vibration",
      description: "Vibrate within the app",
      key: "inAppVibration" as const,
    },
    {
      title: "In-App Preview",
      description: "Show message preview in app",
      key: "inAppPreview" as const,
    },
  ];

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
        <h1 className="text-white font-medium text-lg">Notifications</h1>
      </div>

      <div className="overflow-y-auto pb-20 lg:pb-4">
        {/* Notification Types */}
        <div className="px-6 py-6">
          <h2 className="text-white font-medium mb-4 flex items-center gap-2">
            <Bell className="w-5 h-5 text-app-teal" />
            Notification Types
          </h2>
          <div className="space-y-4">
            {notificationTypes.map((type) => (
              <div
                key={type.key}
                className="flex items-center justify-between p-4 bg-app-dark rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-app-teal/20 flex items-center justify-center">
                    <type.icon className="w-4 h-4 text-app-teal" />
                  </div>
                  <div>
                    <h3 className="text-white font-medium">{type.title}</h3>
                    <p className="text-app-gray text-sm">{type.description}</p>
                  </div>
                </div>
                <Switch
                  checked={notificationSettings[type.key]}
                  onCheckedChange={() => updateSetting(type.key)}
                  className="data-[state=checked]:bg-app-teal"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Sound & Vibration */}
        <div className="px-6 py-6 border-t border-app-darker">
          <h2 className="text-white font-medium mb-4 flex items-center gap-2">
            <Volume2 className="w-5 h-5 text-app-teal" />
            Sound & Vibration
          </h2>
          <div className="space-y-4">
            {soundAndVibration.map((setting) => (
              <div
                key={setting.key}
                className="flex items-center justify-between p-4 bg-app-dark rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-app-teal/20 flex items-center justify-center">
                    <setting.icon className="w-4 h-4 text-app-teal" />
                  </div>
                  <div>
                    <h3 className="text-white font-medium">{setting.title}</h3>
                    <p className="text-app-gray text-sm">
                      {setting.description}
                    </p>
                  </div>
                </div>
                <Switch
                  checked={notificationSettings[setting.key]}
                  onCheckedChange={() => updateSetting(setting.key)}
                  className="data-[state=checked]:bg-app-teal"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Quiet Hours */}
        <div className="px-6 py-6 border-t border-app-darker">
          <h2 className="text-white font-medium mb-4 flex items-center gap-2">
            <Moon className="w-5 h-5 text-app-teal" />
            Quiet Hours
          </h2>
          <div className="bg-app-dark rounded-lg p-4 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-white font-medium">Enable Quiet Hours</h3>
                <p className="text-app-gray text-sm">
                  Mute notifications during selected hours
                </p>
              </div>
              <Switch
                checked={quietHours.enabled}
                onCheckedChange={(enabled) =>
                  setQuietHours((prev) => ({ ...prev, enabled }))
                }
                className="data-[state=checked]:bg-app-teal"
              />
            </div>

            {quietHours.enabled && (
              <div className="space-y-3 pt-4 border-t border-app-darker">
                <div className="flex items-center justify-between">
                  <span className="text-white">From</span>
                  <input
                    type="time"
                    value={quietHours.startTime}
                    onChange={(e) =>
                      setQuietHours((prev) => ({
                        ...prev,
                        startTime: e.target.value,
                      }))
                    }
                    className="bg-app-darker text-white px-3 py-2 rounded-lg border border-app-gray/30 focus:border-app-teal outline-none"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white">To</span>
                  <input
                    type="time"
                    value={quietHours.endTime}
                    onChange={(e) =>
                      setQuietHours((prev) => ({
                        ...prev,
                        endTime: e.target.value,
                      }))
                    }
                    className="bg-app-darker text-white px-3 py-2 rounded-lg border border-app-gray/30 focus:border-app-teal outline-none"
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* In-App Settings */}
        <div className="px-6 py-6 border-t border-app-darker">
          <h2 className="text-white font-medium mb-4">In-App Settings</h2>
          <div className="space-y-4">
            {inAppSettings.map((setting) => (
              <div
                key={setting.key}
                className="flex items-center justify-between p-4 bg-app-dark rounded-lg"
              >
                <div>
                  <h3 className="text-white font-medium">{setting.title}</h3>
                  <p className="text-app-gray text-sm">{setting.description}</p>
                </div>
                <Switch
                  checked={notificationSettings[setting.key]}
                  onCheckedChange={() => updateSetting(setting.key)}
                  className="data-[state=checked]:bg-app-teal"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Reset to Defaults */}
        <div className="px-6 py-6 border-t border-app-darker">
          <Button
            onClick={() => {
              setNotificationSettings({
                messagesEnabled: true,
                groupsEnabled: true,
                callsEnabled: true,
                soundEnabled: true,
                vibrationEnabled: true,
                ledEnabled: true,
                popupEnabled: true,
                inAppSounds: true,
                inAppVibration: true,
                inAppPreview: true,
              });
              setQuietHours({
                enabled: false,
                startTime: "22:00",
                endTime: "07:00",
              });
            }}
            variant="outline"
            className="w-full border-app-gray/30 text-white hover:bg-app-dark"
          >
            Reset to Defaults
          </Button>
        </div>
      </div>
    </div>
  );
}
