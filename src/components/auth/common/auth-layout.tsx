// import { Promotion } from '@/src/components/layout/sign-up/promotion';
import { ReactNode } from 'react';

interface AuthLayoutProps {
  children: ReactNode;
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <div className="w-screen h-screen flex">
      <div className="bg-[#f5f5f5] w-[50%] h-full">
        {/* <Promotion /> */}
      </div>
      <div className="flex items-center justify-center w-[50%] h-full">
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
