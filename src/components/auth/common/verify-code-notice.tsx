import React, { useState } from 'react';

interface VerifyCodeNoticeProps {
  emailAddress: string;
  onResendClick: () => void;
}

const VerifyCodeNotice = ({
  emailAddress,
  onResendClick,
}: VerifyCodeNoticeProps) => {
  const [resendCodeDisabled, setResendCodeDisabled] = useState(false);

  const handleResendClick = async () => {
    try {
      setResendCodeDisabled(true);
      await onResendClick();
    } finally {
      setResendCodeDisabled(false);
    }
  };

  return (
    <div className="text-gray-500">
      Enter the 6-digit code sent to <br />
      <span className="text-black">{emailAddress}</span>
      <button
        type="button"
        disabled={resendCodeDisabled}
        onClick={handleResendClick}
        className={`block text-primary text-[1rem] mt-[2rem] mb-[0.3rem] ml-[0.2rem] bg-transparent border-none font-semibold ${
          resendCodeDisabled ? 'opacity-50' : ''
        }`}
      >
        Resend code
      </button>
    </div>
  );
};

export { VerifyCodeNotice };
