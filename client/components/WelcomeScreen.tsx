import { Volume2, MoreVertical, Globe } from "lucide-react";
import { Button } from "./ui/button";

interface WelcomeScreenProps {
  onContinue: () => void;
}

export function WelcomeScreen({ onContinue }: WelcomeScreenProps) {
  return (
    <div className="mobile-container">
      {/* Status Bar */}
      <div className="status-bar">
        <div className="flex items-center gap-1">
          <Volume2 className="w-4 h-4" />
        </div>
        <div className="flex items-center gap-1">
          <MoreVertical className="w-4 h-4" />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)] px-8 text-center">
        {/* App Icon/Logo */}
        <div className="w-24 h-24 bg-gradient-to-br from-app-teal to-app-cyan rounded-3xl flex items-center justify-center mb-8 animate-pulse">
          <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center">
            <span className="text-app-teal font-bold text-xl">💬</span>
          </div>
        </div>

        <h1 className="text-3xl font-light text-app-teal mb-2 animate-fade-in">
          Welcome to ChatsApp
        </h1>
        <h2 className="text-xl font-light text-app-cyan mb-12 opacity-80">
          Connect. Chat. Share.
        </h2>

        <div className="text-sm text-app-gray mb-8 leading-relaxed max-w-xs">
          Read our{" "}
          <button className="text-app-teal underline hover:text-app-cyan transition-colors">
            Privacy Policy
          </button>
          . Tap 'Agree and Continue' to accept the{" "}
          <button className="text-app-teal underline hover:text-app-cyan transition-colors">
            Terms of Service
          </button>
          .
        </div>

        {/* Language Selector */}
        <button className="flex items-center gap-2 mb-12 px-4 py-2 rounded-full bg-app-dark/50 hover:bg-app-dark transition-colors">
          <Globe className="w-4 h-4 text-app-teal" />
          <span className="text-white text-sm">English</span>
          <div className="w-2 h-2 rounded-full bg-app-teal ml-2"></div>
        </button>

        {/* Continue Button */}
        <Button
          onClick={onContinue}
          className="w-full bg-gradient-to-r from-app-teal to-app-cyan hover:from-app-teal/90 hover:to-app-cyan/90 text-white font-medium py-4 rounded-full text-base shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
        >
          Agree and Continue
        </Button>
      </div>
    </div>
  );
}
