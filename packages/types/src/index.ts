export type MembershipRole = 'owner' | 'manager' | 'seller' | 'assistant';
export type SaleStatus = 'draft' | 'completed' | 'cancelled' | 'refunded';
export type FinanceType = 'payable' | 'receivable';

export interface MoneySummary {
  subtotal: number;
  discount: number;
  total: number;
}
