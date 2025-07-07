import { Volume2, MoreVertical, ChevronDown, ArrowLeft } from "lucide-react";
import { Button } from "./ui/button";
import { useState, useEffect } from "react";

interface PhoneVerificationProps {
  onVerified: () => void;
  onBack: () => void;
}

export function PhoneVerification({
  onVerified,
  onBack,
}: PhoneVerificationProps) {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("India");
  const [step, setStep] = useState<"phone" | "code">("phone");
  const [verificationCode, setVerificationCode] = useState("");
  const [timer, setTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);

  useEffect(() => {
    if (step === "code" && timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => {
          if (prev <= 1) {
            setCanResend(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [step, timer]);

  const keypadNumbers = [
    ["1", "2", "3", "—"],
    ["4", "5", "6", "←"],
    ["7", "8", "9", "⊗"],
    ["#", "0", ".", "✓"],
  ];

  const handleKeypadPress = (value: string) => {
    if (step === "phone") {
      if (value === "←") {
        setPhoneNumber((prev) => prev.slice(0, -1));
      } else if (value === "⊗") {
        setPhoneNumber("");
      } else if (value === "✓") {
        if (phoneNumber.length >= 10) {
          setStep("code");
          setTimer(60);
          setCanResend(false);
        }
      } else if (value !== "—") {
        setPhoneNumber((prev) => prev + value);
      }
    } else {
      if (value === "←") {
        setVerificationCode((prev) => prev.slice(0, -1));
      } else if (value === "⊗") {
        setVerificationCode("");
      } else if (value === "✓") {
        if (verificationCode.length === 6) {
          onVerified();
        }
      } else if (value !== "—" && verificationCode.length < 6) {
        const newCode = verificationCode + value;
        setVerificationCode(newCode);
        // Auto-verify when code is complete
        if (newCode.length === 6) {
          setTimeout(() => onVerified(), 500);
        }
      }
    }
  };

  const handleResendCode = () => {
    setTimer(60);
    setCanResend(false);
    setVerificationCode("");
  };

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

      {/* Header */}
      <div className="px-6 py-6 flex items-center gap-4">
        {step === "code" && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setStep("phone")}
            className="p-2 hover:bg-app-dark"
          >
            <ArrowLeft className="w-5 h-5 text-app-teal" />
          </Button>
        )}
        <div className="flex-1">
          <h1 className="text-xl font-medium text-app-teal mb-4">
            {step === "phone"
              ? "Enter your phone number"
              : "Enter verification code"}
          </h1>

          {step === "phone" ? (
            <>
              <div className="text-sm text-white mb-1">
                We need to verify your phone number.
              </div>
              <div className="text-sm text-white mb-1">
                Carrier Charges may apply.{" "}
                <button className="text-app-teal underline">
                  What's my number ?
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="text-sm text-white mb-1">
                We sent a code to +{phoneNumber}
              </div>
              <div className="text-sm text-white mb-1">
                Enter the 6-digit code below
              </div>
            </>
          )}
        </div>
      </div>

      {/* Input Section */}
      <div className="px-6 mb-6">
        {step === "phone" ? (
          <>
            <div className="bg-app-teal rounded-lg p-4 mb-4 flex items-center justify-between">
              <span className="text-white font-medium">{selectedCountry}</span>
              <ChevronDown className="w-5 h-5 text-white" />
            </div>

            {/* Phone Input */}
            <div className="bg-app-teal rounded-lg p-4 flex items-center gap-3">
              <span className="text-white">+91</span>
              <input
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="bg-transparent text-white placeholder-white/70 outline-none flex-1 text-lg"
                placeholder="Phone number"
                readOnly
              />
            </div>
          </>
        ) : (
          <>
            {/* Verification Code Input */}
            <div className="bg-app-teal rounded-lg p-4 flex items-center justify-center">
              <input
                type="tel"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
                className="bg-transparent text-white text-center text-2xl font-mono tracking-widest outline-none w-full"
                placeholder="------"
                maxLength={6}
                readOnly
              />
            </div>

            {/* Timer and Resend */}
            <div className="text-center mt-4">
              {!canResend ? (
                <p className="text-app-gray text-sm">
                  Resend code in {Math.floor(timer / 60)}:
                  {(timer % 60).toString().padStart(2, "0")}
                </p>
              ) : (
                <button
                  onClick={handleResendCode}
                  className="text-app-teal text-sm font-medium"
                >
                  Resend Code
                </button>
              )}
            </div>
          </>
        )}
      </div>

      {/* Action Button */}
      {step === "phone" && (
        <div className="px-6 mb-8">
          <Button
            onClick={() => handleKeypadPress("✓")}
            className="w-full bg-app-teal hover:bg-app-teal/90 text-white font-medium py-4 rounded-full text-base"
            disabled={phoneNumber.length < 10}
          >
            Send Code
          </Button>
        </div>
      )}

      {/* Keypad */}
      <div className="flex-1 flex flex-col justify-end pb-8">
        <div className="grid grid-cols-4 gap-4 px-6">
          {keypadNumbers.flat().map((num, index) => (
            <button
              key={index}
              onClick={() => handleKeypadPress(num)}
              className={`keypad-button ${
                num === "—" ? "opacity-0 pointer-events-none" : ""
              }`}
              disabled={num === "—"}
            >
              {num === "←" ? "⌫" : num}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
