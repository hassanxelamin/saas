'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getNav, NavItem } from '@/src/sanity/sanity-utils';

type LinkButtonProps = {
  type: 'primary' | 'secondary';
};

export default function LinkButton({ type }: LinkButtonProps) {
  const [nav, setNav] = useState<NavItem | null>(null);

  useEffect(() => {
    async function fetchData() {
      const data = await getNav();
      setNav(data);
    }
    fetchData();
  }, []);

  if (!nav) {
    return <div>Loading...</div>; // Add a loading state or spinner here
  }

  const url = type === 'primary' ? nav.primaryLinkUrl : nav.secondaryLinkUrl;
  const text = type === 'primary' ? nav.primaryLinkText : nav.secondaryLinkText;

  return (
    <Link href={url}>
      <div className="w-[129px] h-[35px] bg-indigo-300 rounded-[50px] flex items-center justify-center text-center">
        {text}
      </div>
    </Link>
  );
}
