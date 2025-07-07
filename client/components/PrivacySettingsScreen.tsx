import {
  ArrowLeft,
  Eye,
  EyeOff,
  Users,
  UserCheck,
  UserX,
  Shield,
  Clock,
  Image,
  MessageSquare,
  Phone,
  CheckCircle,
} from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";

interface PrivacySettingsScreenProps {
  onBack: () => void;
}

export function PrivacySettingsScreen({ onBack }: PrivacySettingsScreenProps) {
  const [lastSeenSetting, setLastSeenSetting] = useState<
    "everyone" | "contacts" | "nobody"
  >("everyone");
  const [profilePhotoSetting, setProfilePhotoSetting] = useState<
    "everyone" | "contacts" | "nobody"
  >("everyone");
  const [aboutSetting, setAboutSetting] = useState<
    "everyone" | "contacts" | "nobody"
  >("everyone");
  const [statusSetting, setStatusSetting] = useState<
    "everyone" | "contacts" | "nobody"
  >("contacts");
  const [readReceiptsSetting, setReadReceiptsSetting] = useState(true);
  const [groupsSetting, setGroupsSetting] = useState<
    "everyone" | "contacts" | "nobody"
  >("contacts");
  const [callsSetting, setCallsSetting] = useState<
    "everyone" | "contacts" | "nobody"
  >("everyone");

  const privacyOptions = [
    { value: "everyone", label: "Everyone", icon: Users },
    { value: "contacts", label: "My Contacts", icon: UserCheck },
    { value: "nobody", label: "Nobody", icon: UserX },
  ];

  const privacySettings = [
    {
      icon: Clock,
      title: "Last Seen",
      description: "Who can see when you were last online",
      value: lastSeenSetting,
      onChange: setLastSeenSetting,
    },
    {
      icon: Image,
      title: "Profile Photo",
      description: "Who can see your profile photo",
      value: profilePhotoSetting,
      onChange: setProfilePhotoSetting,
    },
    {
      icon: MessageSquare,
      title: "About",
      description: "Who can see your about information",
      value: aboutSetting,
      onChange: setAboutSetting,
    },
    {
      icon: Eye,
      title: "Status",
      description: "Who can see your status updates",
      value: statusSetting,
      onChange: setStatusSetting,
    },
    {
      icon: Users,
      title: "Groups",
      description: "Who can add you to groups",
      value: groupsSetting,
      onChange: setGroupsSetting,
    },
    {
      icon: Phone,
      title: "Calls",
      description: "Who can call you",
      value: callsSetting,
      onChange: setCallsSetting,
    },
  ];

  const PrivacySettingRow = ({ setting }: { setting: any }) => {
    const [showOptions, setShowOptions] = useState(false);

    return (
      <div className="bg-app-dark rounded-lg overflow-hidden">
        <div
          className="flex items-center gap-4 p-4 cursor-pointer hover:bg-app-darker transition-colors"
          onClick={() => setShowOptions(!showOptions)}
        >
          <div className="w-10 h-10 rounded-full bg-app-teal/20 flex items-center justify-center">
            <setting.icon className="w-5 h-5 text-app-teal" />
          </div>
          <div className="flex-1">
            <h3 className="text-white font-medium">{setting.title}</h3>
            <p className="text-app-gray text-sm">{setting.description}</p>
          </div>
          <div className="text-app-teal text-sm font-medium">
            {privacyOptions.find((opt) => opt.value === setting.value)?.label}
          </div>
        </div>

        {showOptions && (
          <div className="border-t border-app-darker bg-app-darker/50">
            {privacyOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => {
                  setting.onChange(option.value);
                  setShowOptions(false);
                }}
                className="w-full flex items-center gap-4 p-4 hover:bg-app-dark transition-colors"
              >
                <option.icon className="w-5 h-5 text-app-gray" />
                <span className="text-white">{option.label}</span>
                {setting.value === option.value && (
                  <CheckCircle className="w-5 h-5 text-app-teal ml-auto" />
                )}
              </button>
            ))}
          </div>
        )}
      </div>
    );
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
        <h1 className="text-white font-medium text-lg">Privacy</h1>
      </div>

      <div className="overflow-y-auto pb-20 lg:pb-4">
        {/* Info Banner */}
        <div className="px-6 py-4 bg-app-teal/10 border-b border-app-darker">
          <div className="flex items-start gap-3">
            <Shield className="w-5 h-5 text-app-teal mt-0.5" />
            <div>
              <h3 className="text-white font-medium mb-1">
                Your Privacy Matters
              </h3>
              <p className="text-app-gray text-sm">
                Control who can see your information and how others can contact
                you.
              </p>
            </div>
          </div>
        </div>

        {/* Privacy Settings */}
        <div className="px-6 py-6 space-y-4">
          <h2 className="text-white font-medium mb-4">
            Who can see my personal info
          </h2>
          {privacySettings.map((setting, index) => (
            <PrivacySettingRow key={index} setting={setting} />
          ))}
        </div>

        {/* Read Receipts */}
        <div className="px-6 py-6 border-t border-app-darker">
          <div className="bg-app-dark rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-app-teal/20 flex items-center justify-center">
                  <Eye className="w-5 h-5 text-app-teal" />
                </div>
                <div>
                  <h3 className="text-white font-medium">Read Receipts</h3>
                  <p className="text-app-gray text-sm">
                    If turned off, you won't send or receive read receipts
                  </p>
                </div>
              </div>
              <button
                onClick={() => setReadReceiptsSetting(!readReceiptsSetting)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  readReceiptsSetting ? "bg-app-teal" : "bg-app-gray"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    readReceiptsSetting ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Blocked Contacts */}
        <div className="px-6 py-6 border-t border-app-darker">
          <h2 className="text-white font-medium mb-4">Blocked Contacts</h2>
          <div className="bg-app-dark rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-white font-medium">Blocked Users</h3>
                <p className="text-app-gray text-sm">0 contacts blocked</p>
              </div>
              <Button className="bg-app-teal hover:bg-app-teal/90 text-white px-4 py-2">
                Manage
              </Button>
            </div>
          </div>
        </div>

        {/* Privacy Tips */}
        <div className="px-6 py-6 border-t border-app-darker">
          <h2 className="text-white font-medium mb-4">Privacy Tips</h2>
          <div className="space-y-3">
            <div className="bg-app-dark rounded-lg p-4">
              <h3 className="text-white font-medium mb-2">
                Two-Step Verification
              </h3>
              <p className="text-app-gray text-sm mb-3">
                Add an extra layer of security to your account
              </p>
              <Button
                variant="outline"
                className="border-app-teal text-app-teal hover:bg-app-teal/10"
              >
                Enable
              </Button>
            </div>
            <div className="bg-app-dark rounded-lg p-4">
              <h3 className="text-white font-medium mb-2">
                Disappearing Messages
              </h3>
              <p className="text-app-gray text-sm">
                Messages disappear after a set time for added privacy
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
