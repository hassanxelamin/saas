export interface BoxProps {
  id: string;
  color?: string;
  borderColor: string;
  details: {
    plan: string;
    trial: string;
    price: string;
  };
  price: {
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
}

export interface Price {
  id: string;
  productId: string;
  active: boolean;
  currency: string;
  type: string;
  unit_amount: number | null;
  interval: string | null;
  interval_count: number | null;
  trial_period_days: number | null;
  metadata: any;
}

export interface Product {
  id: string;
  active: boolean;
  name: string;
  metadata: any;
  prices: Price[];
}
