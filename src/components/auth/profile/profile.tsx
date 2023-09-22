'use client'

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

interface MenuProps {
  open: boolean;
}

const menuVariants = {
  open: { opacity: 1, height: "auto" },
  closed: { opacity: 0, height: 0 }
};

export const ProfileDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button onClick={() => setIsOpen(!isOpen)} className="w-10 h-10 rounded-full overflow-hidden">
        <Image src="/profile-icon.svg" width={90} height={70} />
      </button>

      <motion.div
        className="absolute right-0 w-[17.9rem] mt-2 origin-top-right bg-black rounded-md shadow-lg"
        variants={menuVariants}
        initial="closed"
        animate={isOpen ? "open" : "closed"}
      >
        <div className="p-2">
            <Link href="/account" legacyBehavior className="p-2">
            <a className="block w-full text-left px-4 py-2 text-[1.2rem] text-white">
                Account Settings
            </a>
            </Link>
        </div>
        <div className="p-2">
          <button className="block w-full text-left px-4 py-2 text-[1.2rem] text-white">
            Manage Billing
          </button>
        </div>
        <div className="p-2">
          <button className="block w-full text-left px-4 py-2 text-[1.2rem] text-white">
            Change Plans
          </button>
        </div>
        <div className="p-2">
          <button className="block w-full text-left px-4 py-2 text-[1.2rem] text-white">
            Help
          </button>
        </div>
        <div className="p-2">
          <button className="block w-full text-left px-4 py-2 text-[1.2rem] text-white">
            Troubleshooting
          </button>
        </div>
        <div className="p-2">
          <button className="block w-full text-left px-4 py-2 text-[1.2rem] text-white">
            Logout
          </button>
        </div>
        {/* Add more menu items here */}
      </motion.div>
    </div>
  );
};
