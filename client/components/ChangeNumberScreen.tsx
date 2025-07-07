import {
  ArrowLeft,
  Phone,
  AlertTriangle,
  CheckCircle,
  Info,
} from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";

interface ChangeNumberScreenProps {
  onBack: () => void;
  onComplete: () => void;
}

export function ChangeNumberScreen({
  onBack,
  onComplete,
}: ChangeNumberScreenProps) {
  const [step, setStep] = useState<"info" | "verify" | "complete">("info");
  const [oldNumber, setOldNumber] = useState("+1 (555) 123-4567");
  const [newNumber, setNewNumber] = useState("");
  const [isVerified, setIsVerified] = useState(false);

  const handleContinue = () => {
    if (step === "info") {
      setStep("verify");
    } else if (step === "verify") {
      setStep("complete");
      setIsVerified(true);
    } else {
      onComplete();
    }
  };

  const renderInfoStep = () => (
    <>
      <div className="px-6 py-6">
        <div className="w-16 h-16 rounded-full bg-app-teal/20 flex items-center justify-center mx-auto mb-6">
          <Phone className="w-8 h-8 text-app-teal" />
        </div>
        <h2 className="text-white text-xl font-medium text-center mb-4">
          Change Number
        </h2>
        <p className="text-app-gray text-center mb-8">
          Changing your phone number will migrate your account info, groups &
          settings.
        </p>
      </div>

      <div className="px-6 mb-6">
        <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4 mb-6">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-500 mt-0.5" />
            <div>
              <h3 className="text-amber-500 font-medium mb-1">Important</h3>
              <ul className="text-amber-200 text-sm space-y-1">
                <li>• Your contacts will be notified of this change</li>
                <li>• You'll need to verify your new number</li>
                <li>
                  • Your old number will no longer be associated with this
                  account
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="text-white text-sm font-medium mb-2 block">
              Current Number
            </label>
            <div className="bg-app-dark rounded-lg p-4">
              <div className="text-white">{oldNumber}</div>
            </div>
          </div>

          <div>
            <label className="text-white text-sm font-medium mb-2 block">
              New Number
            </label>
            <input
              type="tel"
              value={newNumber}
              onChange={(e) => setNewNumber(e.target.value)}
              placeholder="Enter your new phone number"
              className="w-full bg-app-dark text-white placeholder-app-gray rounded-lg p-4 outline-none ring-2 ring-transparent focus:ring-app-teal transition-colors"
            />
          </div>
        </div>
      </div>

      <div className="px-6">
        <Button
          onClick={handleContinue}
          disabled={!newNumber.trim()}
          className="w-full bg-app-teal hover:bg-app-teal/90 text-white font-medium py-4 rounded-lg disabled:opacity-50"
        >
          Continue
        </Button>
      </div>
    </>
  );

  const renderVerifyStep = () => (
    <>
      <div className="px-6 py-6">
        <div className="w-16 h-16 rounded-full bg-app-teal/20 flex items-center justify-center mx-auto mb-6">
          <Phone className="w-8 h-8 text-app-teal animate-pulse" />
        </div>
        <h2 className="text-white text-xl font-medium text-center mb-4">
          Verify New Number
        </h2>
        <p className="text-app-gray text-center mb-8">
          We'll send a verification code to {newNumber}
        </p>
      </div>

      <div className="px-6 mb-6">
        <div className="bg-app-dark rounded-lg p-6">
          <h3 className="text-white font-medium mb-4">Verification Steps:</h3>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 rounded-full bg-app-teal flex items-center justify-center">
                <span className="text-white text-xs">1</span>
              </div>
              <span className="text-white">Verify your old number</span>
              <CheckCircle className="w-5 h-5 text-green-500 ml-auto" />
            </div>
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 rounded-full bg-app-teal flex items-center justify-center">
                <span className="text-white text-xs">2</span>
              </div>
              <span className="text-white">Verify your new number</span>
              <div className="w-5 h-5 bg-app-gray/30 rounded-full ml-auto animate-pulse"></div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 rounded-full bg-app-gray/30 flex items-center justify-center">
                <span className="text-app-gray text-xs">3</span>
              </div>
              <span className="text-app-gray">Migrate account data</span>
            </div>
          </div>
        </div>
      </div>

      <div className="px-6">
        <Button
          onClick={handleContinue}
          className="w-full bg-app-teal hover:bg-app-teal/90 text-white font-medium py-4 rounded-lg"
        >
          Send Verification Code
        </Button>
      </div>
    </>
  );

  const renderCompleteStep = () => (
    <>
      <div className="px-6 py-6">
        <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-8 h-8 text-green-500" />
        </div>
        <h2 className="text-white text-xl font-medium text-center mb-4">
          Number Changed Successfully
        </h2>
        <p className="text-app-gray text-center mb-8">
          Your phone number has been updated to {newNumber}
        </p>
      </div>

      <div className="px-6 mb-6">
        <div className="bg-app-dark rounded-lg p-6">
          <h3 className="text-white font-medium mb-4">What happens next:</h3>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <Info className="w-5 h-5 text-app-teal mt-0.5" />
              <div>
                <p className="text-white font-medium">Contacts Notified</p>
                <p className="text-app-gray text-sm">
                  Your contacts will be informed about your number change
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Info className="w-5 h-5 text-app-teal mt-0.5" />
              <div>
                <p className="text-white font-medium">Groups Updated</p>
                <p className="text-app-gray text-sm">
                  All your group memberships have been transferred
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Info className="w-5 h-5 text-app-teal mt-0.5" />
              <div>
                <p className="text-white font-medium">Settings Preserved</p>
                <p className="text-app-gray text-sm">
                  Your account settings and preferences remain unchanged
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="px-6">
        <Button
          onClick={handleContinue}
          className="w-full bg-app-teal hover:bg-app-teal/90 text-white font-medium py-4 rounded-lg"
        >
          Done
        </Button>
      </div>
    </>
  );

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
        <h1 className="text-white font-medium text-lg">
          {step === "info"
            ? "Change Number"
            : step === "verify"
              ? "Verify"
              : "Complete"}
        </h1>
      </div>

      <div className="overflow-y-auto pb-20 lg:pb-4">
        {step === "info" && renderInfoStep()}
        {step === "verify" && renderVerifyStep()}
        {step === "complete" && renderCompleteStep()}
      </div>
    </div>
  );
}
