import { UserButton, SignInButton } from '@clerk/nextjs';
import type { User } from '@clerk/nextjs/api';
import { currentUser } from '@clerk/nextjs/app-beta';
import Link from 'next/link';

// UI Components
import { Button } from '@/src/components/ui';
import { Logo } from '@/src/components';
import { ProfileDropdown } from '../../auth/profile/profile';

export default async function Navbar() {
  const user: User | null = await currentUser();

  return (
    <nav className="flex items-center justify-between w-screen 
                    xl:px-[20rem] md:px-[15rem] sm:px-[10rem] px-[3rem]
                    xl:mt-[6.5rem] md:mt-[5rem] sm:mt-[3.5rem] mt-[2rem]">
      <Logo />
      <div className="h-full font-medium mr-2"> 
        {user ? (
          <div className="w-[298px] flex items-center justify-center text-center space-x-5">
            {/* <Button type="primary" /> */}
            <Link href="dashboard">
              <div className='h-[4rem] rounded-[5px] text-black font-bold flex items-center justify-center text-center text-[1.4rem] rounded-[8px]'>Dashboard</div>
            </Link>
            {/* <UserButton /> */}
            <ProfileDropdown />
          </div>
        ) : (
          <div className="w-[298px] flex items-center justify-end space-x-8 h-full">
            <div className="flex items-center justify-center text-center">
              <SignInButton />
            </div>
            <Link href="sign-up">
              <div className='w-[10rem] h-[4rem] bg-black rounded-[5px] text-white flex items-center justify-center text-center text-[1.4rem] rounded-[8px]'>
                Try Free!
              </div>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
