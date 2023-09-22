import React, { ReactNode } from 'react';
import Spinner from '@/src/components/ui/loading-states/spinner';

interface ButtonLayoutProps {
  children: ReactNode;
  isLoading: boolean;
  className?: string;
  textColor?: string; // add textColor prop
  bgColor?: string; // add bgColor prop
  borderSize?: string; // add borderColor prop
  onClick?: () => void;
}

const Button = ({
  children,
  isLoading = false,
  textColor = 'white', // default color is white
  bgColor = 'primary', // default color is primary
  borderSize = '[0px]', // default border color is transparent
  onClick,
  ...rest
}: ButtonLayoutProps) => {
  return (
    <button
      type="submit"
      onClick={onClick}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...rest}
      className={`h-[4.4rem] w-[33rem] rounded-md p-[1.2rem] py-2 text-${textColor} bg-${bgColor} border-${borderSize}`}
      disabled={isLoading}
    >
      {isLoading ? <Spinner /> : children}
    </button>
  );
};

export { Button };
