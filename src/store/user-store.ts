import { create } from 'zustand';

type Store = {
  user: any; // Replace 'any' with your User type
  subscription: any; // Replace 'any' with your Subscription type
  clerkSessionId: string | null;
  setSessionData: (
    user: any,
    subscription: any,
    clerkSessionId: string | null
  ) => void; // Replace 'any' with your User and Subscription types
};

export const useUserStore = create<Store>((set) => ({
  user: null,
  subscription: null,
  clerkSessionId: null,
  setSessionData: (user, subscription, clerkSessionId) =>
    set({ user, subscription, clerkSessionId }),
}));
