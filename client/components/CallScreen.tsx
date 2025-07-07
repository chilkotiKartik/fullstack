import {
  PhoneOff,
  Mic,
  MicOff,
  Video,
  VideoOff,
  Volume2,
  VolumeX,
  MessageSquare,
  UserPlus,
  MoreVertical,
  Camera,
  CameraOff,
  Maximize2,
  Minimize2,
} from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "./ui/button";

interface CallScreenProps {
  contact: {
    name: string;
    avatar?: string;
  };
  callType: "incoming" | "outgoing" | "active";
  isVideoCall: boolean;
  onEndCall: () => void;
  onAcceptCall?: () => void;
  onDeclineCall?: () => void;
}

export function CallScreen({
  contact,
  callType,
  isVideoCall,
  onEndCall,
  onAcceptCall,
  onDeclineCall,
}: CallScreenProps) {
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoEnabled, setIsVideoEnabled] = useState(isVideoCall);
  const [isSpeakerOn, setIsSpeakerOn] = useState(false);
  const [callDuration, setCallDuration] = useState(0);
  const [isMinimized, setIsMinimized] = useState(false);

  useEffect(() => {
    if (callType === "active") {
      const timer = setInterval(() => {
        setCallDuration((prev) => prev + 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [callType]);

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const getCallStatusText = () => {
    switch (callType) {
      case "incoming":
        return `Incoming ${isVideoCall ? "video" : "voice"} call`;
      case "outgoing":
        return "Calling...";
      case "active":
        return formatDuration(callDuration);
      default:
        return "";
    }
  };

  if (isMinimized) {
    return (
      <div className="fixed top-4 right-4 bg-app-dark rounded-lg p-3 shadow-lg z-50 border border-app-teal">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-app-teal/20 flex items-center justify-center">
            <span className="text-app-teal text-xs font-medium">
              {contact.name.charAt(0)}
            </span>
          </div>
          <div>
            <p className="text-white text-sm font-medium">{contact.name}</p>
            <p className="text-app-gray text-xs">{getCallStatusText()}</p>
          </div>
          <button
            onClick={() => setIsMinimized(false)}
            className="text-app-teal hover:text-white transition-colors"
          >
            <Maximize2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="mobile-container bg-gradient-to-b from-app-darker via-app-dark to-app-darker flex flex-col">
      {/* Status Bar */}
      <div className="status-bar">
        <div className="flex items-center gap-1">
          <Volume2 className="w-4 h-4" />
        </div>
        <div className="flex items-center gap-1">
          <span className="text-xs">
            {isVideoCall ? "Video Call" : "Voice Call"}
          </span>
        </div>
      </div>

      {/* Video Area */}
      {isVideoCall && (
        <div className="relative flex-1 bg-black/20 overflow-hidden">
          {/* Remote Video */}
          <div className="w-full h-full bg-gradient-to-br from-app-dark to-app-darker flex items-center justify-center">
            <div className="w-32 h-32 rounded-full bg-app-teal/20 flex items-center justify-center">
              <span className="text-app-teal font-medium text-4xl">
                {contact.name.charAt(0)}
              </span>
            </div>
          </div>

          {/* Local Video Preview */}
          {isVideoEnabled && (
            <div className="absolute top-4 right-4 w-24 h-32 bg-app-darker rounded-lg border-2 border-app-teal overflow-hidden">
              <div className="w-full h-full bg-gradient-to-br from-app-teal/20 to-app-cyan/20 flex items-center justify-center">
                <span className="text-white text-xs">You</span>
              </div>
            </div>
          )}

          {/* Minimize Button */}
          <button
            onClick={() => setIsMinimized(true)}
            className="absolute top-4 left-4 w-10 h-10 bg-black/50 rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-colors"
          >
            <Minimize2 className="w-5 h-5" />
          </button>
        </div>
      )}

      {/* Call Info */}
      <div className="flex-1 flex flex-col items-center justify-center px-8 text-center">
        {!isVideoCall && (
          <div className="mb-8">
            <div className="w-40 h-40 rounded-full bg-gradient-to-br from-app-teal/30 to-app-cyan/30 flex items-center justify-center mb-6 mx-auto">
              <span className="text-app-teal font-medium text-6xl">
                {contact.name.charAt(0)}
              </span>
            </div>
          </div>
        )}

        <h2 className="text-white text-2xl font-medium mb-2">{contact.name}</h2>
        <p className="text-app-gray text-lg mb-8">{getCallStatusText()}</p>

        {/* Connection Quality Indicator */}
        {callType === "active" && (
          <div className="flex items-center gap-2 mb-8">
            <div className="flex items-center gap-1">
              <div className="w-1 h-2 bg-app-teal rounded-full"></div>
              <div className="w-1 h-3 bg-app-teal rounded-full"></div>
              <div className="w-1 h-4 bg-app-teal rounded-full"></div>
              <div className="w-1 h-3 bg-app-teal/50 rounded-full"></div>
            </div>
            <span className="text-app-gray text-sm">Good connection</span>
          </div>
        )}
      </div>

      {/* Call Controls */}
      <div className="px-8 pb-8">
        {callType === "incoming" ? (
          <div className="flex items-center justify-center gap-8">
            <button
              onClick={onDeclineCall}
              className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center hover:bg-red-600 transition-colors shadow-lg"
            >
              <PhoneOff className="w-8 h-8 text-white" />
            </button>
            <button
              onClick={onAcceptCall}
              className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center hover:bg-green-600 transition-colors shadow-lg"
            >
              <Phone className="w-8 h-8 text-white" />
            </button>
          </div>
        ) : (
          <>
            {/* Primary Controls */}
            <div className="flex items-center justify-center gap-6 mb-6">
              <button
                onClick={() => setIsMuted(!isMuted)}
                className={`w-14 h-14 rounded-full flex items-center justify-center transition-colors shadow-lg ${
                  isMuted
                    ? "bg-red-500 hover:bg-red-600"
                    : "bg-app-dark hover:bg-app-gray/20"
                }`}
              >
                {isMuted ? (
                  <MicOff className="w-6 h-6 text-white" />
                ) : (
                  <Mic className="w-6 h-6 text-white" />
                )}
              </button>

              <button
                onClick={onEndCall}
                className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center hover:bg-red-600 transition-colors shadow-lg"
              >
                <PhoneOff className="w-8 h-8 text-white" />
              </button>

              <button
                onClick={() => setIsSpeakerOn(!isSpeakerOn)}
                className={`w-14 h-14 rounded-full flex items-center justify-center transition-colors shadow-lg ${
                  isSpeakerOn
                    ? "bg-app-teal hover:bg-app-teal/90"
                    : "bg-app-dark hover:bg-app-gray/20"
                }`}
              >
                {isSpeakerOn ? (
                  <Volume2 className="w-6 h-6 text-white" />
                ) : (
                  <VolumeX className="w-6 h-6 text-white" />
                )}
              </button>
            </div>

            {/* Secondary Controls */}
            <div className="flex items-center justify-center gap-4">
              {isVideoCall && (
                <button
                  onClick={() => setIsVideoEnabled(!isVideoEnabled)}
                  className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${
                    !isVideoEnabled
                      ? "bg-red-500 hover:bg-red-600"
                      : "bg-app-dark hover:bg-app-gray/20"
                  }`}
                >
                  {isVideoEnabled ? (
                    <Video className="w-5 h-5 text-white" />
                  ) : (
                    <VideoOff className="w-5 h-5 text-white" />
                  )}
                </button>
              )}

              <button className="w-12 h-12 rounded-full bg-app-dark hover:bg-app-gray/20 flex items-center justify-center transition-colors">
                <MessageSquare className="w-5 h-5 text-white" />
              </button>

              <button className="w-12 h-12 rounded-full bg-app-dark hover:bg-app-gray/20 flex items-center justify-center transition-colors">
                <UserPlus className="w-5 h-5 text-white" />
              </button>

              <button className="w-12 h-12 rounded-full bg-app-dark hover:bg-app-gray/20 flex items-center justify-center transition-colors">
                <MoreVertical className="w-5 h-5 text-white" />
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
