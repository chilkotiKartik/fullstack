import {
  ArrowLeft,
  Plus,
  Eye,
  MoreVertical,
  Heart,
  MessageCircle,
  Share,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Camera,
  Type,
  Smile,
  Palette,
} from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { Button } from "./ui/button";

interface StatusItem {
  id: string;
  type: "image" | "video" | "text";
  content: string;
  backgroundColor?: string;
  duration: number;
  timestamp: string;
  views: number;
  isViewed: boolean;
}

interface Contact {
  id: string;
  name: string;
  avatar?: string;
  statuses: StatusItem[];
  lastUpdated: string;
}

interface StatusScreenProps {
  contact?: Contact;
  statusIndex?: number;
  onClose: () => void;
  onNext?: () => void;
  onPrevious?: () => void;
}

export function StatusScreen({
  contact,
  statusIndex = 0,
  onClose,
  onNext,
  onPrevious,
}: StatusScreenProps) {
  const [currentIndex, setCurrentIndex] = useState(statusIndex);
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [showReply, setShowReply] = useState(false);
  const [replyText, setReplyText] = useState("");
  const videoRef = useRef<HTMLVideoElement>(null);

  const currentStatus = contact?.statuses[currentIndex];

  useEffect(() => {
    if (!currentStatus || isPaused) return;

    const duration = currentStatus.duration * 1000;
    const interval = 50;
    const increment = (interval / duration) * 100;

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          handleNext();
          return 0;
        }
        return prev + increment;
      });
    }, interval);

    return () => clearInterval(timer);
  }, [currentIndex, isPaused, currentStatus]);

  const handleNext = () => {
    if (!contact) return;

    if (currentIndex < contact.statuses.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setProgress(0);
    } else {
      onNext?.();
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setProgress(0);
    } else {
      onPrevious?.();
    }
  };

  const handlePauseToggle = () => {
    setIsPaused(!isPaused);
    if (currentStatus?.type === "video" && videoRef.current) {
      if (isPaused) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
      }
    }
  };

  const handleReply = () => {
    if (replyText.trim()) {
      // In a real app, this would send the reply
      console.log("Sending reply:", replyText);
      setReplyText("");
      setShowReply(false);
    }
  };

  if (!contact || !currentStatus) {
    return (
      <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
        <p className="text-white">No status available</p>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black z-50 flex flex-col">
      {/* Progress Bars */}
      <div className="flex gap-1 p-4">
        {contact.statuses.map((_, index) => (
          <div key={index} className="flex-1 h-1 bg-white/30 rounded-full">
            <div
              className="h-full bg-white rounded-full transition-all duration-100"
              style={{
                width:
                  index < currentIndex
                    ? "100%"
                    : index === currentIndex
                      ? `${progress}%`
                      : "0%",
              }}
            />
          </div>
        ))}
      </div>

      {/* Header */}
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="p-2 hover:bg-white/10 text-white"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-app-teal/30 to-app-cyan/30 flex items-center justify-center">
            <span className="text-white font-medium text-sm">
              {contact.name.charAt(0)}
            </span>
          </div>
          <div>
            <p className="text-white font-medium">{contact.name}</p>
            <p className="text-white/70 text-sm">{currentStatus.timestamp}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {currentStatus.type === "video" && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMuted(!isMuted)}
              className="p-2 hover:bg-white/10 text-white"
            >
              {isMuted ? (
                <VolumeX className="w-5 h-5" />
              ) : (
                <Volume2 className="w-5 h-5" />
              )}
            </Button>
          )}
          <Button
            variant="ghost"
            size="sm"
            className="p-2 hover:bg-white/10 text-white"
          >
            <MoreVertical className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Status Content */}
      <div
        className="flex-1 relative flex items-center justify-center"
        onClick={handlePauseToggle}
      >
        {/* Touch Areas for Navigation */}
        <div
          className="absolute left-0 top-0 w-1/3 h-full z-10"
          onClick={(e) => {
            e.stopPropagation();
            handlePrevious();
          }}
        />
        <div
          className="absolute right-0 top-0 w-1/3 h-full z-10"
          onClick={(e) => {
            e.stopPropagation();
            handleNext();
          }}
        />

        {currentStatus.type === "image" && (
          <img
            src={currentStatus.content}
            alt="Status"
            className="max-w-full max-h-full object-contain"
          />
        )}

        {currentStatus.type === "video" && (
          <video
            ref={videoRef}
            src={currentStatus.content}
            className="max-w-full max-h-full object-contain"
            autoPlay
            muted={isMuted}
            controls={false}
          />
        )}

        {currentStatus.type === "text" && (
          <div
            className="w-full h-full flex items-center justify-center p-8"
            style={{
              backgroundColor: currentStatus.backgroundColor || "#1a1a1a",
            }}
          >
            <p className="text-white text-2xl text-center font-medium leading-relaxed">
              {currentStatus.content}
            </p>
          </div>
        )}

        {/* Pause Indicator */}
        {isPaused && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/20">
            <div className="bg-black/80 rounded-full p-4">
              <Pause className="w-12 h-12 text-white" />
            </div>
          </div>
        )}
      </div>

      {/* Bottom Actions */}
      <div className="p-4">
        {/* View Count */}
        <div className="flex items-center justify-center gap-2 mb-4">
          <Eye className="w-4 h-4 text-white/70" />
          <span className="text-white/70 text-sm">
            {currentStatus.views} views
          </span>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              className="p-3 hover:bg-white/10 text-white rounded-full"
            >
              <Heart className="w-6 h-6" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowReply(true)}
              className="p-3 hover:bg-white/10 text-white rounded-full"
            >
              <MessageCircle className="w-6 h-6" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="p-3 hover:bg-white/10 text-white rounded-full"
            >
              <Share className="w-6 h-6" />
            </Button>
          </div>
        </div>

        {/* Reply Input */}
        {showReply && (
          <div className="mt-4 flex items-center gap-3 bg-white/10 rounded-full px-4 py-2">
            <input
              type="text"
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              placeholder="Reply to status..."
              className="flex-1 bg-transparent text-white placeholder-white/70 outline-none"
              autoFocus
            />
            <Button
              onClick={handleReply}
              size="sm"
              className="bg-app-teal hover:bg-app-teal/90 text-white px-4 py-2 rounded-full"
            >
              Send
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
