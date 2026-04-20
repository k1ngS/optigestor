import { z } from 'zod';

export const tenantSchema = z.object({
  name: z.string().min(2),
  slug: z.string().min(2)
});

export const customerSchema = z.object({
  fullName: z.string().min(3),
  phone: z.string().min(8).optional(),
  email: z.string().email().optional()
});

export const saleItemSchema = z.object({
  productId: z.string().uuid(),
  quantity: z.number().int().positive(),
  unitPrice: z.number().nonnegative()
});

export const createSaleSchema = z.object({
  storeId: z.string().uuid(),
  customerId: z.string().uuid().optional(),
  items: z.array(saleItemSchema).min(1)
});

export type CreateSaleInput = z.infer<typeof createSaleSchema>;
