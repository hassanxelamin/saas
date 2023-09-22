'use client';

import { useEffect } from 'react';
import { useClerk } from '@clerk/nextjs';
import { useUserStore } from '@/src/store/user-store'; // Replace with your store's path

const SessionListener = () => {
  const { session } = useClerk();
  const setSessionData = useUserStore((state) => state.setSessionData);

  useEffect(() => {
    if (session) {
      // Fetch subscription details from your API here
      fetch('/api/get-subscription', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ clerkSessionId: session.user.id }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data) {
            const { subscription } = data;
            setSessionData(session.user, subscription, session.user.id);
          } else {
            setSessionData(session.user, null, session.user.id);
          }
        });
    } else {
      // Reset the Zustand store when there's no active session
      setSessionData(null, null, null);
    }
  }, [session, setSessionData]);

  return null;
};

export default SessionListener;
