import { create } from 'zustand';

type Price = {
  id: string;
  productId: string;
  active: boolean;
  currency: string;
  interval: string;
  interval_count: number;
  metadata: Record<string, unknown>;
  trial_period_days: number | null;
  type: string;
  unit_amount: number;
};

type Store = {
  selectedSubscription: string;
  selectSubscription: (id: string) => void;
  selectedPrice: Price | null;
  selectPrice: (price: Price) => void;
};

export const useSubscriptionStore = create<Store>((set) => ({
  selectedSubscription: '',
  selectSubscription: (id) => set({ selectedSubscription: id }),
  selectedPrice: null,
  selectPrice: (price) => set({ selectedPrice: price }),
}));
