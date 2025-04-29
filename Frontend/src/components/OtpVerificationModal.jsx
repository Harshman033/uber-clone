import { useState, useRef, useEffect } from "react";

function OtpVerificationModal({ onClose, verified, setVerified }) {
    // State to track if verification is in progress
    const [verifying, setVerifying] = useState(false);
    const [error, setError] = useState(false);
    
    // State for OTP input
    const [otp, setOtp] = useState(['', '', '', '']);
    const inputRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];
    
    // Handle input change
    const handleChange = (index, value) => {
      // Only allow numbers
      if (value && !/^\d*$/.test(value)) return;
      
      // Update OTP array
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      
      // Move to next input if current is filled
      if (value && index < 3) {
        inputRefs[index + 1].current.focus();
      }
    };
    
    // Handle keydown events for backspace and navigation
    const handleKeyDown = (index, e) => {
      if (e.key === 'Backspace' && !otp[index] && index > 0) {
        // Move to previous input on backspace if current is empty
        inputRefs[index - 1].current.focus();
      } else if (e.key === 'ArrowLeft' && index > 0) {
        inputRefs[index - 1].current.focus();
      } else if (e.key === 'ArrowRight' && index < 3) {
        inputRefs[index + 1].current.focus();
      } else if (e.key === 'Escape') {
        onClose();
      }
    };
    
    // Handle paste event for entire OTP
    const handlePaste = (e) => {
      e.preventDefault();
      const pastedData = e.clipboardData.getData('text');
      const digits = pastedData.replace(/\D/g, '').split('').slice(0, 4);
      
      const newOtp = [...otp];
      digits.forEach((digit, index) => {
        if (index < 4) newOtp[index] = digit;
      });
      
      setOtp(newOtp);
      
      // Focus last filled input or last input
      const lastIndex = Math.min(digits.length - 1, 3);
      if (lastIndex >= 0) {
        inputRefs[lastIndex].current.focus();
      }
    };
    
    // Verify OTP function
    const verifyOtp = () => {
      const otpString = otp.join('');
      
      // Check if OTP is complete
      if (otpString.length !== 4) {
        setError(true);
        return;
      }
      
      setVerifying(true);
      setError(false);
      
      // Simulate verification process
      setTimeout(() => {
        setVerifying(false);
        setVerified(true);
        
        // Close modal after showing success
        setTimeout(() => {
          onClose();
        }, 1500);
      }, 1500);
    };
    
    // Reset error state when OTP changes
    useEffect(() => {
      if (error) {
        setError(false);
      }
    }, [otp]);
    
    // Focus first input on modal open
    useEffect(() => {
      inputRefs[0].current.focus();
    }, []);
    
    // Handle click outside to close
    const modalRef = useRef(null);
    useEffect(() => {
      function handleClickOutside(event) {
        if (modalRef.current && !modalRef.current.contains(event.target)) {
          if (!verifying && !verified) {
            onClose();
          }
        }
      }
      
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [onClose, verifying, verified]);
    
    // Close on escape key
    useEffect(() => {
      const handleEsc = (event) => {
        if (event.key === 'Escape' && !verifying && !verified) {
          onClose();
        }
      };
      
      document.addEventListener('keydown', handleEsc);
      return () => {
        document.removeEventListener('keydown', handleEsc);
      };
    }, [onClose, verifying, verified]);
    
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
        <div 
          ref={modalRef}
          className="w-full max-w-md p-6 mx-4 bg-white rounded-xl shadow-xl" 
          style={{ 
            animation: 'slideIn 0.3s ease-out forwards',
          }}
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-800">
              Verify your 
            </h2>
            
            {!verifying && !verified && (
              <button 
                onClick={onClose}
                className="p-1 rounded-full hover:bg-gray-100"
              >
                <svg className="w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
          
          <p className="mb-6 text-sm text-gray-600">
            Enter the 4-digit code sent to your device
          </p>
          
          <div className="flex justify-center mb-6 space-x-3">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={inputRefs[index]}
                type="text"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                onPaste={index === 0 ? handlePaste : undefined}
                className={`w-12 h-12 text-center text-xl font-medium rounded-lg border ${
                  error 
                    ? 'border-red-500 bg-red-50' 
                    : 'border-gray-300 focus:border-black focus:ring-0'
                } transition-all duration-200`}
                disabled={verifying || verified}
              />
            ))}
          </div>
          
          {error && (
            <p className="mb-4 text-sm text-center text-red-500">
              Please enter a valid 4-digit code
            </p>
          )}
          
          <button
            onClick={verifyOtp}
            disabled={verifying || verified}
            className={`w-full py-3 text-white font-medium rounded-lg transition-all duration-200 ${
              verifying 
                ? 'bg-gray-400 cursor-not-allowed' 
                : verified 
                  ? 'bg-green-500 cursor-not-allowed' 
                  : 'bg-yellow-400 hover:bg-yellow-600'
            }`}
          >
            {verifying ? (
              <span className="flex items-center justify-center">
                <svg className="w-5 h-5 mr-2 animate-spin" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Verifying
              </span>
            ) : verified ? (
              <span className="flex items-center justify-center">
                <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Verified
              </span>
            ) : (
              'Verify'
            )}
          </button>
          
          <div className="mt-6 text-center">
            <button className="text-sm font-medium text-black hover:underline">
              Resend code
            </button>
          </div>
        </div>
{/*         
        <style jsx>{`
          @keyframes slideIn {
            from {
              opacity: 0;
              transform: translateY(-20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}</style> */}
      </div>
    );
  }

  export default OtpVerificationModal;