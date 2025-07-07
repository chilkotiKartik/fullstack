import {
  ArrowLeft,
  Download,
  Share,
  MoreVertical,
  Trash2,
  Star,
  Forward,
  ZoomIn,
  ZoomOut,
  RotateCw,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
} from "lucide-react";
import { useState, useRef } from "react";
import { Button } from "./ui/button";

interface MediaItem {
  id: string;
  type: "image" | "video";
  url: string;
  caption?: string;
  sender: string;
  timestamp: string;
}

interface MediaViewerProps {
  media: MediaItem[];
  currentIndex: number;
  onClose: () => void;
  onDelete?: (id: string) => void;
}

export function MediaViewer({
  media,
  currentIndex,
  onClose,
  onDelete,
}: MediaViewerProps) {
  const [currentMediaIndex, setCurrentMediaIndex] = useState(currentIndex);
  const [zoom, setZoom] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const currentMedia = media[currentMediaIndex];

  const handlePrevious = () => {
    setCurrentMediaIndex((prev) => (prev > 0 ? prev - 1 : media.length - 1));
    setZoom(1);
  };

  const handleNext = () => {
    setCurrentMediaIndex((prev) => (prev < media.length - 1 ? prev + 1 : 0));
    setZoom(1);
  };

  const handleZoomIn = () => {
    setZoom((prev) => Math.min(prev + 0.5, 3));
  };

  const handleZoomOut = () => {
    setZoom((prev) => Math.max(prev - 0.5, 0.5));
  };

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleDownload = () => {
    // In a real app, this would trigger download
    console.log("Downloading media:", currentMedia.id);
  };

  const handleShare = () => {
    // In a real app, this would open share menu
    console.log("Sharing media:", currentMedia.id);
  };

  const handleDelete = () => {
    if (onDelete) {
      onDelete(currentMedia.id);
      if (media.length === 1) {
        onClose();
      } else {
        handleNext();
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-black z-50 flex flex-col">
      {/* Header */}
      <div
        className={`absolute top-0 left-0 right-0 z-10 bg-gradient-to-b from-black/80 to-transparent p-4 transition-opacity duration-300 ${
          showControls ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="p-2 hover:bg-white/10 text-white"
            >
              <ArrowLeft className="w-6 h-6" />
            </Button>
            <div>
              <p className="text-white font-medium">{currentMedia.sender}</p>
              <p className="text-white/70 text-sm">{currentMedia.timestamp}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleShare}
              className="p-2 hover:bg-white/10 text-white"
            >
              <Share className="w-5 h-5" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleDownload}
              className="p-2 hover:bg-white/10 text-white"
            >
              <Download className="w-5 h-5" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="p-2 hover:bg-white/10 text-white"
            >
              <MoreVertical className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Media Content */}
      <div
        className="flex-1 flex items-center justify-center relative"
        onClick={() => setShowControls(!showControls)}
      >
        {currentMedia.type === "image" ? (
          <img
            src={currentMedia.url}
            alt="Media"
            className="max-w-full max-h-full object-contain transition-transform duration-200"
            style={{ transform: `scale(${zoom})` }}
          />
        ) : (
          <video
            ref={videoRef}
            src={currentMedia.url}
            className="max-w-full max-h-full object-contain"
            controls={false}
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            muted={isMuted}
          />
        )}

        {/* Navigation Arrows */}
        {media.length > 1 && (
          <>
            <Button
              variant="ghost"
              size="sm"
              onClick={handlePrevious}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 p-3 hover:bg-white/10 text-white rounded-full"
            >
              <ArrowLeft className="w-6 h-6" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleNext}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 p-3 hover:bg-white/10 text-white rounded-full"
            >
              <ArrowLeft className="w-6 h-6 rotate-180" />
            </Button>
          </>
        )}

        {/* Video Controls */}
        {currentMedia.type === "video" && (
          <div
            className={`absolute bottom-20 left-1/2 transform -translate-x-1/2 flex items-center gap-4 bg-black/80 rounded-full px-6 py-3 transition-opacity duration-300 ${
              showControls ? "opacity-100" : "opacity-0"
            }`}
          >
            <Button
              variant="ghost"
              size="sm"
              onClick={handlePlayPause}
              className="p-2 hover:bg-white/10 text-white"
            >
              {isPlaying ? (
                <Pause className="w-5 h-5" />
              ) : (
                <Play className="w-5 h-5" />
              )}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleMute}
              className="p-2 hover:bg-white/10 text-white"
            >
              {isMuted ? (
                <VolumeX className="w-5 h-5" />
              ) : (
                <Volume2 className="w-5 h-5" />
              )}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="p-2 hover:bg-white/10 text-white"
            >
              <Maximize className="w-5 h-5" />
            </Button>
          </div>
        )}
      </div>

      {/* Bottom Controls */}
      <div
        className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 transition-opacity duration-300 ${
          showControls ? "opacity-100" : "opacity-0"
        }`}
      >
        {/* Caption */}
        {currentMedia.caption && (
          <div className="mb-4">
            <p className="text-white text-center">{currentMedia.caption}</p>
          </div>
        )}

        {/* Controls */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {currentMedia.type === "image" && (
              <>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleZoomOut}
                  className="p-2 hover:bg-white/10 text-white"
                  disabled={zoom <= 0.5}
                >
                  <ZoomOut className="w-5 h-5" />
                </Button>
                <span className="text-white text-sm">
                  {Math.round(zoom * 100)}%
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleZoomIn}
                  className="p-2 hover:bg-white/10 text-white"
                  disabled={zoom >= 3}
                >
                  <ZoomIn className="w-5 h-5" />
                </Button>
              </>
            )}
          </div>

          {/* Media Counter */}
          {media.length > 1 && (
            <div className="text-white text-sm">
              {currentMediaIndex + 1} of {media.length}
            </div>
          )}

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              className="p-2 hover:bg-white/10 text-white"
            >
              <Star className="w-5 h-5" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="p-2 hover:bg-white/10 text-white"
            >
              <Forward className="w-5 h-5" />
            </Button>
            {onDelete && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleDelete}
                className="p-2 hover:bg-white/10 text-red-400"
              >
                <Trash2 className="w-5 h-5" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
