import {
  Volume2,
  MoreVertical,
  ChevronDown,
  ArrowLeft,
  Phone,
  Shield,
  Globe,
  Edit3,
  CheckCircle,
  ArrowRight,
  Inbox,
  AlertCircle,
  Lock,
} from "lucide-react";
import { Button } from "./ui/button";
import { useState, useEffect } from "react";

interface PhoneVerificationEnhancedProps {
  onVerified: () => void;
  onBack: () => void;
}

export function PhoneVerificationEnhanced({
  onVerified,
  onBack,
}: PhoneVerificationEnhancedProps) {
  const [step, setStep] = useState<
    | "phone"
    | "confirm"
    | "auto-verify"
    | "code"
    | "profile"
    | "email"
    | "initializing"
  >("phone");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("India");
  const [verificationCode, setVerificationCode] = useState("");
  const [timer, setTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const [userName, setUserName] = useState("");
  const [profilePhoto, setProfilePhoto] = useState<string | null>(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [initProgress, setInitProgress] = useState(0);

  const keypadNumbers = [
    ["1", "2", "3", "—"],
    ["4", "5", "6", "←"],
    ["7", "8", "9", "⊗"],
    ["#", "0", ".", "✓"],
  ];

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

  useEffect(() => {
    if (step === "initializing") {
      const interval = setInterval(() => {
        setInitProgress((prev) => {
          if (prev >= 100) {
            return 100;
          }
          return prev + 2;
        });
      }, 100);
      return () => clearInterval(interval);
    }
  }, [step]);

  useEffect(() => {
    if (initProgress >= 100 && step === "initializing") {
      const timer = setTimeout(() => {
        onVerified();
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [initProgress, step, onVerified]);

  const handleKeypadPress = (value: string) => {
    if (step === "phone") {
      if (value === "←") {
        setPhoneNumber((prev) => prev.slice(0, -1));
      } else if (value === "⊗") {
        setPhoneNumber("");
      } else if (value === "✓") {
        if (phoneNumber.length >= 10) {
          setShowConfirm(true);
        }
      } else if (value !== "—") {
        setPhoneNumber((prev) => prev + value);
      }
    } else if (step === "code") {
      if (value === "←") {
        setVerificationCode((prev) => prev.slice(0, -1));
      } else if (value === "⊗") {
        setVerificationCode("");
      } else if (value === "✓") {
        if (verificationCode.length === 6) {
          setStep("profile");
        }
      } else if (value !== "—" && verificationCode.length < 6) {
        const newCode = verificationCode + value;
        setVerificationCode(newCode);
        if (newCode.length === 6) {
          setTimeout(() => setStep("profile"), 500);
        }
      }
    }
  };

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePhoto(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const renderPhoneStep = () => (
    <>
      <div className="px-6 py-8">
        <h1 className="text-2xl font-medium text-app-teal mb-6 text-center">
          Enter your phone number
        </h1>
        <div className="text-center mb-8">
          <p className="text-white/90 mb-2">
            We need to verify your phone number.
          </p>
          <p className="text-white/80">
            Carrier Charges may apply.{" "}
            <button className="text-app-teal underline">
              What's my number ?
            </button>
          </p>
        </div>
      </div>

      <div className="px-8 mb-8 space-y-6">
        {/* Country Selector */}
        <div className="bg-app-teal rounded-xl p-4">
          <div className="flex items-center justify-between">
            <span className="text-white text-lg font-medium">India</span>
            <ChevronDown className="w-5 h-5 text-white" />
          </div>
        </div>

        {/* Phone Number Input */}
        <div className="bg-app-teal rounded-xl p-4 flex items-center">
          <span className="text-white text-lg mr-4">+</span>
          <input
            type="tel"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="flex-1 bg-transparent text-white text-lg outline-none"
            placeholder="Phone number"
            readOnly
          />
        </div>

        {/* Confirmation Popup */}
        {showConfirm && (
          <div className="bg-app-teal rounded-xl p-6 space-y-4">
            <div className="text-center">
              <h3 className="text-white text-lg font-medium mb-4">
                Is this is the correct Number ?
              </h3>
              <div className="bg-app-cyan rounded-lg p-4 mb-4">
                <span className="text-white text-xl font-medium">
                  +91 {phoneNumber}
                </span>
              </div>
              <div className="flex justify-between">
                <button
                  onClick={() => setShowConfirm(false)}
                  className="text-white hover:text-white/80 transition-colors"
                >
                  Edit
                </button>
                <button
                  onClick={() => setStep("auto-verify")}
                  className="text-white hover:text-white/80 transition-colors"
                >
                  Yes
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Next Button */}
        <Button
          onClick={() => handleKeypadPress("✓")}
          className="w-full bg-app-teal hover:bg-app-teal/90 text-white font-medium py-4 rounded-full text-lg"
          disabled={phoneNumber.length < 10}
        >
          Next
        </Button>
      </div>
    </>
  );

  const renderAutoVerifyStep = () => (
    <>
      <div className="px-6 py-6 flex items-center gap-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setStep("phone")}
          className="p-2 hover:bg-app-dark"
        >
          <ArrowLeft className="w-5 h-5 text-white" />
        </Button>
      </div>

      <div className="px-6 mb-8 space-y-8">
        {/* Phone Icon with Checkmark */}
        <div className="flex items-center justify-center mb-8">
          <div className="relative">
            <div className="w-32 h-32 bg-app-teal rounded-3xl flex items-center justify-center">
              <Phone className="w-16 h-16 text-white" />
            </div>
            <div className="absolute -top-2 -right-2 w-10 h-10 bg-app-teal rounded-full flex items-center justify-center border-4 border-app-darker">
              <span className="text-white text-lg">✓</span>
            </div>
          </div>
        </div>

        <div className="text-center">
          <h1 className="text-xl font-medium text-white mb-8 px-4 leading-relaxed">
            To automatically verify with a missed call to your phone :
          </h1>
        </div>

        <div className="space-y-8">
          <div className="flex items-start gap-6">
            <div className="w-12 h-12 bg-app-teal rounded-2xl flex items-center justify-center flex-shrink-0">
              <Phone className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <p className="text-white text-base leading-relaxed">
                Allow App to manage this call so we can call your phone number
                and end the call automatically
              </p>
            </div>
          </div>

          <div className="flex items-start gap-6">
            <div className="w-12 h-12 bg-app-teal rounded-2xl flex items-center justify-center flex-shrink-0">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <p className="text-white text-base leading-relaxed">
                Allow App to do a one-time check and access your call log so we
                can confirm that you received the call.
              </p>
            </div>
          </div>
        </div>

        <div className="text-center pt-4">
          <button className="text-app-teal text-sm underline leading-relaxed">
            Learn more about how you can manage your phone verification
            permission
          </button>
        </div>
      </div>

      <div className="px-8 space-y-6">
        <Button
          onClick={() => setStep("code")}
          className="w-full bg-app-teal hover:bg-app-teal/90 text-white font-medium py-4 rounded-full text-lg"
        >
          Continue
        </Button>
        <button
          onClick={() => setStep("code")}
          className="w-full text-app-teal text-center py-2 text-lg"
        >
          Verify another way
        </button>
      </div>
    </>
  );

  const renderCodeStep = () => (
    <>
      <div className="px-6 py-8">
        <h1 className="text-2xl font-medium text-app-teal mb-8 text-center">
          Verifying your Number
        </h1>
        <div className="text-center mb-2">
          <div className="text-base text-white mb-2">
            Waiting to automatically detect 6-digit
          </div>
          <div className="text-base text-white mb-4">
            code sent by SMS to ({phoneNumber})
          </div>
          <button className="text-app-teal text-base underline">
            Wrong Number ?
          </button>
        </div>
      </div>

      <div className="px-8 mb-8">
        <div className="bg-app-teal rounded-xl p-6 flex items-center justify-center mb-8">
          <input
            type="tel"
            value={verificationCode}
            onChange={(e) => setVerificationCode(e.target.value)}
            className="bg-transparent text-white text-center text-3xl font-mono tracking-[0.5em] outline-none w-full"
            placeholder="------"
            maxLength={6}
            readOnly
          />
        </div>

        <div className="text-center">
          {!canResend ? (
            <p className="text-app-gray text-base">
              Resend code in {Math.floor(timer / 60)}:
              {(timer % 60).toString().padStart(2, "0")}
            </p>
          ) : (
            <button
              onClick={() => {
                setTimer(60);
                setCanResend(false);
                setVerificationCode("");
              }}
              className="text-app-teal text-base font-medium"
            >
              Didn't receive code ?
            </button>
          )}
        </div>
      </div>
    </>
  );

  const renderProfileStep = () => (
    <>
      <div className="px-6 py-8">
        <h1 className="text-2xl font-medium text-app-teal mb-6 text-center">
          Profile info
        </h1>
        <p className="text-white text-center mb-12 text-base">
          Please provide your name and an optional profile photo
        </p>
      </div>

      <div className="px-8 mb-12 flex flex-col items-center">
        <div className="relative mb-8">
          <div className="w-40 h-40 rounded-full bg-app-teal flex items-center justify-center overflow-hidden">
            {profilePhoto ? (
              <img
                src={profilePhoto}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-white text-4xl font-medium">
                {userName ? userName.charAt(0).toUpperCase() : ""}
              </span>
            )}
          </div>
          <label className="absolute bottom-2 right-2 w-12 h-12 bg-app-darker rounded-full flex items-center justify-center cursor-pointer hover:bg-app-dark transition-colors border-4 border-app-teal">
            <span className="text-app-teal text-2xl font-bold">+</span>
            <input
              type="file"
              accept="image/*"
              onChange={handlePhotoUpload}
              className="hidden"
            />
          </label>
        </div>

        <div className="w-full">
          <input
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            placeholder="Your name"
            className="w-full bg-app-teal text-white placeholder-white/70 outline-none px-6 py-4 rounded-xl text-center text-lg"
          />
        </div>
      </div>

      <div className="px-8">
        <Button
          onClick={() => setStep("email")}
          disabled={!userName.trim()}
          className="w-full bg-app-teal hover:bg-app-teal/90 text-white font-medium py-4 rounded-full text-lg disabled:opacity-50"
        >
          Next
        </Button>
      </div>
    </>
  );

  const renderEmailStep = () => (
    <>
      <div className="px-6 py-8 text-center">
        <div className="mb-8">
          <div className="w-20 h-20 mx-auto mb-6 bg-app-teal rounded-2xl flex items-center justify-center">
            <Inbox className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-2xl font-medium text-app-teal mb-6">
            Add email to protect your account
          </h1>
        </div>

        <div className="space-y-8 text-left px-4">
          <div className="flex items-start gap-4">
            <CheckCircle className="w-6 h-6 text-app-teal flex-shrink-0 mt-1" />
            <div>
              <p className="text-white font-medium mb-1">
                Verify your account, even without SMS
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <AlertCircle className="w-6 h-6 text-app-teal flex-shrink-0 mt-1" />
            <div>
              <p className="text-white font-medium mb-1">
                Email helps us reach you in case of security or support
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <Lock className="w-6 h-6 text-app-teal flex-shrink-0 mt-1" />
            <div>
              <p className="text-white font-medium mb-1">
                Your email address won't be visible to others
              </p>
            </div>
          </div>
        </div>

        <div className="mt-12">
          <button className="text-app-teal text-base underline mb-8">
            Learn More
          </button>
        </div>
      </div>

      <div className="px-8 space-y-4">
        <Button
          onClick={() => setStep("initializing")}
          className="w-full bg-app-teal hover:bg-app-teal/90 text-white font-medium py-4 rounded-full text-lg"
        >
          Add email
        </Button>
        <button
          onClick={() => setStep("initializing")}
          className="w-full text-app-teal text-center py-2 text-lg"
        >
          Skip
        </button>
      </div>
    </>
  );

  const renderInitializingStep = () => (
    <>
      <div className="flex-1 flex flex-col items-center justify-center px-6">
        <h1 className="text-2xl font-medium text-app-teal mb-6 text-center">
          Initialising...
        </h1>
        <p className="text-white text-center mb-16 text-base">
          Please wait a moment
        </p>

        <div className="relative w-48 h-48 mb-16">
          <div className="absolute inset-0 border-2 border-app-gray/20 rounded-full"></div>
          <div
            className="absolute inset-0 border-2 border-app-teal rounded-full transition-all duration-300"
            style={{
              clipPath: `polygon(50% 0%, ${50 + initProgress / 2}% 0%, ${50 + initProgress / 2}% 100%, 50% 100%)`,
            }}
          ></div>
          <div className="absolute inset-4 rounded-full bg-app-darker"></div>
        </div>
      </div>
    </>
  );

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

      {/* Dynamic Content */}
      {step === "phone" && renderPhoneStep()}
      {step === "auto-verify" && renderAutoVerifyStep()}
      {step === "code" && renderCodeStep()}
      {step === "profile" && renderProfileStep()}
      {step === "email" && renderEmailStep()}
      {step === "initializing" && renderInitializingStep()}

      {/* Keypad */}
      {(step === "phone" || step === "code") && (
        <div className="flex-1 flex flex-col justify-end pb-8">
          <div className="px-6">
            <div className="grid grid-cols-4 gap-4 p-6">
              {keypadNumbers.flat().map((num, index) => (
                <button
                  key={index}
                  onClick={() => handleKeypadPress(num)}
                  className={`h-16 w-16 rounded-full flex items-center justify-center text-black text-xl font-medium transition-all duration-200 ${
                    num === "—"
                      ? "opacity-0 pointer-events-none"
                      : "bg-app-gray hover:bg-app-gray/80 active:scale-95"
                  }`}
                  disabled={num === "—"}
                >
                  {num === "←" ? "⌫" : num === "⊗" ? "✕" : num}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
