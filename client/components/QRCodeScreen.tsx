import {
  ArrowLeft,
  Share,
  Download,
  QrCode,
  Camera,
  RotateCw,
  Copy,
  Check,
} from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";

interface QRCodeScreenProps {
  onBack: () => void;
}

export function QRCodeScreen({ onBack }: QRCodeScreenProps) {
  const [copied, setCopied] = useState(false);
  const [isScanning, setIsScanning] = useState(false);

  const handleCopyLink = () => {
    const profileLink = "https://chatsapp.com/profile/yourname";
    navigator.clipboard.writeText(profileLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    // In real app, this would trigger QR code download
    console.log("Downloading QR code");
  };

  const handleShare = () => {
    // In real app, this would open share menu
    if (navigator.share) {
      navigator.share({
        title: "My ChatsApp Profile",
        text: "Connect with me on ChatsApp",
        url: "https://chatsapp.com/profile/yourname",
      });
    }
  };

  const QRCodeDisplay = () => (
    <div className="bg-white rounded-2xl p-8 mx-6 shadow-lg">
      <div className="flex flex-col items-center">
        {/* QR Code Placeholder */}
        <div className="w-48 h-48 bg-black rounded-lg flex items-center justify-center mb-4">
          <div className="grid grid-cols-8 gap-1 w-44 h-44">
            {Array.from({ length: 64 }).map((_, i) => (
              <div
                key={i}
                className={`w-full h-full ${
                  Math.random() > 0.5 ? "bg-black" : "bg-white"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Profile Info */}
        <div className="text-center">
          <div className="w-16 h-16 rounded-full bg-app-teal/20 flex items-center justify-center mx-auto mb-3">
            <span className="text-app-teal font-medium text-xl">You</span>
          </div>
          <h3 className="text-gray-800 font-medium text-lg">Your Name</h3>
          <p className="text-gray-600 text-sm">ChatsApp Profile</p>
        </div>
      </div>
    </div>
  );

  if (isScanning) {
    return (
      <div className="mobile-container lg:flex-1">
        {/* Header */}
        <div className="bg-app-dark px-4 py-3 flex items-center gap-3 border-b border-app-darker">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsScanning(false)}
            className="p-2 hover:bg-app-darker"
          >
            <ArrowLeft className="w-5 h-5 text-white" />
          </Button>
          <h1 className="text-white font-medium text-lg">Scan QR Code</h1>
        </div>

        {/* Camera View */}
        <div className="flex-1 bg-black relative">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-64 h-64 border-2 border-white rounded-2xl relative">
              <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-app-teal rounded-tl-2xl"></div>
              <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-app-teal rounded-tr-2xl"></div>
              <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-app-teal rounded-bl-2xl"></div>
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-app-teal rounded-br-2xl"></div>

              {/* Scanning line animation */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-full h-0.5 bg-app-teal animate-pulse"></div>
              </div>
            </div>
          </div>

          <div className="absolute bottom-8 left-0 right-0 text-center">
            <p className="text-white mb-4">
              Position the QR code within the frame
            </p>
            <div className="flex justify-center gap-4">
              <Button
                variant="ghost"
                className="bg-black/50 text-white hover:bg-black/70"
              >
                <Camera className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

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
        <h1 className="text-white font-medium text-lg">QR Code</h1>
        <div className="ml-auto flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsScanning(true)}
            className="p-2 hover:bg-app-darker"
          >
            <Camera className="w-5 h-5 text-white" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleShare}
            className="p-2 hover:bg-app-darker"
          >
            <Share className="w-5 h-5 text-white" />
          </Button>
        </div>
      </div>

      <div className="overflow-y-auto pb-20 lg:pb-4">
        {/* Instructions */}
        <div className="px-6 py-6 text-center">
          <div className="w-16 h-16 rounded-full bg-app-teal/20 flex items-center justify-center mx-auto mb-4">
            <QrCode className="w-8 h-8 text-app-teal" />
          </div>
          <h2 className="text-white text-xl font-medium mb-2">
            Share Your Profile
          </h2>
          <p className="text-app-gray text-sm">
            Let others scan your QR code to add you as a contact
          </p>
        </div>

        {/* QR Code */}
        <div className="px-6 mb-6">
          <QRCodeDisplay />
        </div>

        {/* Actions */}
        <div className="px-6 space-y-4">
          <div className="flex gap-3">
            <Button
              onClick={handleDownload}
              className="flex-1 bg-app-teal hover:bg-app-teal/90 text-white"
            >
              <Download className="w-4 h-4 mr-2" />
              Download
            </Button>
            <Button
              onClick={handleShare}
              variant="outline"
              className="flex-1 border-app-teal text-app-teal hover:bg-app-teal/10"
            >
              <Share className="w-4 h-4 mr-2" />
              Share
            </Button>
          </div>

          <div className="bg-app-dark rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-white font-medium">Profile Link</h3>
                <p className="text-app-gray text-sm">
                  chatsapp.com/profile/yourname
                </p>
              </div>
              <Button
                onClick={handleCopyLink}
                size="sm"
                className={`${
                  copied
                    ? "bg-green-500 hover:bg-green-600"
                    : "bg-app-teal hover:bg-app-teal/90"
                } text-white`}
              >
                {copied ? (
                  <Check className="w-4 h-4" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </Button>
            </div>
          </div>

          <Button
            onClick={() => setIsScanning(true)}
            variant="outline"
            className="w-full border-app-gray text-white hover:bg-app-dark"
          >
            <Camera className="w-4 h-4 mr-2" />
            Scan QR Code
          </Button>
        </div>

        {/* Tips */}
        <div className="px-6 py-6 border-t border-app-darker">
          <h3 className="text-white font-medium mb-4">Tips</h3>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-app-teal/20 flex items-center justify-center mt-0.5">
                <span className="text-app-teal text-xs">1</span>
              </div>
              <p className="text-app-gray text-sm">
                Share your QR code with friends to connect instantly
              </p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-app-teal/20 flex items-center justify-center mt-0.5">
                <span className="text-app-teal text-xs">2</span>
              </div>
              <p className="text-app-gray text-sm">
                Scan someone else's QR code to add them to your contacts
              </p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-app-teal/20 flex items-center justify-center mt-0.5">
                <span className="text-app-teal text-xs">3</span>
              </div>
              <p className="text-app-gray text-sm">
                Your QR code updates automatically when you change your profile
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
