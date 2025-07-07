import { useState } from "react";
import { Volume2, MoreVertical, Globe } from "lucide-react";
import { Button } from "./ui/button";

interface SplashScreenProps {
  onComplete: () => void;
}

export function SplashScreen({ onComplete }: SplashScreenProps) {
  return (
    <div className="mobile-container bg-app-darker">
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
      <div className="flex-1 flex flex-col justify-between px-6 py-8">
        {/* Top Spacer */}
        <div className="flex-1"></div>

        {/* Welcome Text */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-light text-app-teal mb-2 animate-fade-in">
            Welcome to (app name)
          </h1>
          <h2 className="text-3xl font-light text-app-teal animate-fade-in animation-delay-200">
            / Namaste !
          </h2>
        </div>

        {/* Privacy Text */}
        <div className="text-center mb-12 px-4">
          <p className="text-white/90 text-base leading-relaxed mb-2">
            Read our{" "}
            <button className="text-app-teal underline">privacy policy</button>.
            Tap 'Agree and Continue'
          </p>
          <p className="text-white/90 text-base leading-relaxed">
            to accept the{" "}
            <button className="text-app-teal underline">
              Terms of Service
            </button>
          </p>
        </div>

        {/* Language Selector */}
        <div className="flex items-center justify-center mb-8">
          <div className="flex items-center gap-2">
            <Globe className="w-5 h-5 text-app-teal" />
            <span className="text-app-teal text-base font-medium">English</span>
            <div className="w-2 h-2 bg-app-teal rounded-full ml-2"></div>
          </div>
        </div>

        {/* Agree Button */}
        <Button
          onClick={onComplete}
          className="w-full bg-app-teal hover:bg-app-teal/90 text-white font-medium py-4 rounded-full text-lg shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-[1.02]"
        >
          Agree and Continue
        </Button>
      </div>
    </div>
  );
}
