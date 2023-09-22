import React from 'react';
import { ErrorMessage } from '@/src/components/ui/error-states/error';

interface InputProps {
  autoFocus?: boolean;
  type?: string;
  badge?: React.ReactNode;
  label: string;
  errorText?: string;
  // onPaste?: React.ClipboardEventHandler<HTMLInputElement>;
  disabled?: boolean;
  [x: string]: any;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      autoFocus = true,
      type = 'text',
      badge,
      label,
      errorText,
      hasError,
      // onPaste = () => {},
      ...rest
    },
    ref
  ) => {
    console.log(rest);
    return (
      <label htmlFor="myInput">
        <div>
          {/* {label} */}
          <div>
            <input
              id="myInput"
              // eslint-disable-next-line jsx-a11y/no-autofocus
              autoFocus={autoFocus}
              placeholder={label}
              // onPaste={onPaste}
              className={`block h-[4.4rem] w-[33rem] text-[1.4rem] font-light rounded-md border-[0.2rem] p-[1.2rem] py-2 ${
                hasError ? 'border-red-500' : 'border-gray-300'  // Conditionally apply red border based on hasError
              }`}
              type={type}
              // eslint-disable-next-line react/jsx-props-no-spreading
              {...rest}
              ref={ref}
            />
          </div>
          <ErrorMessage message={errorText || ''} />
        </div>
      </label>
    );
  }
);

Input.displayName = 'Input';

export { Input };
