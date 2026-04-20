import { sql } from 'drizzle-orm';
import {
  boolean,
  date,
  integer,
  numeric,
  pgEnum,
  pgTable,
  text,
  timestamp,
  unique,
  uuid,
  varchar
} from 'drizzle-orm/pg-core';

const timestamps = {
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull().$onUpdate(() => sql`now()`)
};

export const membershipRoleEnum = pgEnum('membership_role', ['owner', 'manager', 'seller', 'assistant']);
export const prescriptionStatusEnum = pgEnum('prescription_status', ['active', 'expired', 'cancelled']);
export const productTypeEnum = pgEnum('product_type', ['frame', 'lens', 'accessory', 'service']);
export const stockMovementTypeEnum = pgEnum('stock_movement_type', ['in', 'out', 'adjustment', 'reserved', 'release']);
export const saleStatusEnum = pgEnum('sale_status', ['draft', 'completed', 'cancelled', 'refunded']);
export const paymentMethodEnum = pgEnum('payment_method', ['cash', 'pix', 'credit_card', 'debit_card', 'bank_transfer', 'other']);
export const cashSessionStatusEnum = pgEnum('cash_session_status', ['open', 'closed']);
export const cashMovementTypeEnum = pgEnum('cash_movement_type', ['open', 'sale', 'payment', 'withdrawal', 'deposit', 'close', 'adjustment']);
export const financeTypeEnum = pgEnum('finance_type', ['payable', 'receivable']);
export const financeStatusEnum = pgEnum('finance_status', ['pending', 'partial', 'paid', 'cancelled', 'overdue']);

export const tenants = pgTable('tenants', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: varchar('name', { length: 150 }).notNull(),
  slug: varchar('slug', { length: 150 }).notNull().unique(),
  ...timestamps
});

export const stores = pgTable('stores', {
  id: uuid('id').defaultRandom().primaryKey(),
  tenantId: uuid('tenant_id').notNull().references(() => tenants.id, { onDelete: 'cascade' }),
  code: varchar('code', { length: 32 }).notNull(),
  name: varchar('name', { length: 150 }).notNull(),
  city: varchar('city', { length: 100 }),
  state: varchar('state', { length: 2 }),
  isActive: boolean('is_active').default(true).notNull(),
  ...timestamps
}, (table) => ({
  tenantStoreCodeUnique: unique().on(table.tenantId, table.code)
}));

export const users = pgTable('users', {
  id: uuid('id').defaultRandom().primaryKey(),
  authUserId: varchar('auth_user_id', { length: 191 }).notNull().unique(),
  email: varchar('email', { length: 191 }).notNull().unique(),
  fullName: varchar('full_name', { length: 191 }).notNull(),
  phone: varchar('phone', { length: 32 }),
  ...timestamps
});

export const memberships = pgTable('memberships', {
  id: uuid('id').defaultRandom().primaryKey(),
  tenantId: uuid('tenant_id').notNull().references(() => tenants.id, { onDelete: 'cascade' }),
  storeId: uuid('store_id').references(() => stores.id, { onDelete: 'set null' }),
  userId: uuid('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  role: membershipRoleEnum('role').notNull(),
  isActive: boolean('is_active').default(true).notNull(),
  ...timestamps
}, (table) => ({
  tenantUserStoreUnique: unique().on(table.tenantId, table.userId, table.storeId)
}));

export const customers = pgTable('customers', {
  id: uuid('id').defaultRandom().primaryKey(),
  tenantId: uuid('tenant_id').notNull().references(() => tenants.id, { onDelete: 'cascade' }),
  storeId: uuid('store_id').references(() => stores.id, { onDelete: 'set null' }),
  fullName: varchar('full_name', { length: 191 }).notNull(),
  phone: varchar('phone', { length: 32 }),
  email: varchar('email', { length: 191 }),
  cpf: varchar('cpf', { length: 14 }),
  birthDate: date('birth_date'),
  ...timestamps
});

export const prescriptions = pgTable('prescriptions', {
  id: uuid('id').defaultRandom().primaryKey(),
  tenantId: uuid('tenant_id').notNull().references(() => tenants.id, { onDelete: 'cascade' }),
  storeId: uuid('store_id').references(() => stores.id, { onDelete: 'set null' }),
  customerId: uuid('customer_id').notNull().references(() => customers.id, { onDelete: 'cascade' }),
  status: prescriptionStatusEnum('status').default('active').notNull(),
  doctorName: varchar('doctor_name', { length: 191 }),
  prescribedAt: date('prescribed_at').notNull(),
  expirationDate: date('expiration_date'),
  rightEyeSphere: varchar('right_eye_sphere', { length: 16 }),
  leftEyeSphere: varchar('left_eye_sphere', { length: 16 }),
  notes: text('notes'),
  ...timestamps
});

export const products = pgTable('products', {
  id: uuid('id').defaultRandom().primaryKey(),
  tenantId: uuid('tenant_id').notNull().references(() => tenants.id, { onDelete: 'cascade' }),
  storeId: uuid('store_id').references(() => stores.id, { onDelete: 'set null' }),
  sku: varchar('sku', { length: 64 }).notNull(),
  name: varchar('name', { length: 191 }).notNull(),
  type: productTypeEnum('type').notNull(),
  costPrice: numeric('cost_price', { precision: 12, scale: 2 }).default('0').notNull(),
  salePrice: numeric('sale_price', { precision: 12, scale: 2 }).notNull(),
  isActive: boolean('is_active').default(true).notNull(),
  ...timestamps
}, (table) => ({
  tenantStoreSkuUnique: unique().on(table.tenantId, table.storeId, table.sku)
}));

export const inventory = pgTable('inventory', {
  id: uuid('id').defaultRandom().primaryKey(),
  tenantId: uuid('tenant_id').notNull().references(() => tenants.id, { onDelete: 'cascade' }),
  storeId: uuid('store_id').notNull().references(() => stores.id, { onDelete: 'cascade' }),
  productId: uuid('product_id').notNull().references(() => products.id, { onDelete: 'cascade' }),
  quantity: integer('quantity').default(0).notNull(),
  minQuantity: integer('min_quantity').default(0).notNull(),
  lastMovementType: stockMovementTypeEnum('last_movement_type'),
  ...timestamps
}, (table) => ({
  storeProductUnique: unique().on(table.storeId, table.productId)
}));

export const sales = pgTable('sales', {
  id: uuid('id').defaultRandom().primaryKey(),
  tenantId: uuid('tenant_id').notNull().references(() => tenants.id, { onDelete: 'cascade' }),
  storeId: uuid('store_id').notNull().references(() => stores.id, { onDelete: 'restrict' }),
  customerId: uuid('customer_id').references(() => customers.id, { onDelete: 'set null' }),
  cashierMembershipId: uuid('cashier_membership_id').references(() => memberships.id, { onDelete: 'set null' }),
  status: saleStatusEnum('status').default('completed').notNull(),
  subtotal: numeric('subtotal', { precision: 12, scale: 2 }).notNull(),
  discount: numeric('discount', { precision: 12, scale: 2 }).default('0').notNull(),
  total: numeric('total', { precision: 12, scale: 2 }).notNull(),
  notes: text('notes'),
  ...timestamps
});

export const saleItems = pgTable('sale_items', {
  id: uuid('id').defaultRandom().primaryKey(),
  saleId: uuid('sale_id').notNull().references(() => sales.id, { onDelete: 'cascade' }),
  productId: uuid('product_id').references(() => products.id, { onDelete: 'set null' }),
  quantity: integer('quantity').notNull(),
  unitPrice: numeric('unit_price', { precision: 12, scale: 2 }).notNull(),
  totalPrice: numeric('total_price', { precision: 12, scale: 2 }).notNull(),
  ...timestamps
});

export const payments = pgTable('payments', {
  id: uuid('id').defaultRandom().primaryKey(),
  saleId: uuid('sale_id').references(() => sales.id, { onDelete: 'cascade' }),
  method: paymentMethodEnum('method').notNull(),
  amount: numeric('amount', { precision: 12, scale: 2 }).notNull(),
  paidAt: timestamp('paid_at', { withTimezone: true }).defaultNow().notNull(),
  reference: varchar('reference', { length: 100 }),
  ...timestamps
});

export const cashSessions = pgTable('cash_sessions', {
  id: uuid('id').defaultRandom().primaryKey(),
  tenantId: uuid('tenant_id').notNull().references(() => tenants.id, { onDelete: 'cascade' }),
  storeId: uuid('store_id').notNull().references(() => stores.id, { onDelete: 'cascade' }),
  openedByMembershipId: uuid('opened_by_membership_id').notNull().references(() => memberships.id, { onDelete: 'restrict' }),
  closedByMembershipId: uuid('closed_by_membership_id').references(() => memberships.id, { onDelete: 'set null' }),
  status: cashSessionStatusEnum('status').default('open').notNull(),
  openedAt: timestamp('opened_at', { withTimezone: true }).defaultNow().notNull(),
  closedAt: timestamp('closed_at', { withTimezone: true }),
  openingAmount: numeric('opening_amount', { precision: 12, scale: 2 }).default('0').notNull(),
  closingAmount: numeric('closing_amount', { precision: 12, scale: 2 }),
  ...timestamps
});

export const cashMovements = pgTable('cash_movements', {
  id: uuid('id').defaultRandom().primaryKey(),
  sessionId: uuid('session_id').notNull().references(() => cashSessions.id, { onDelete: 'cascade' }),
  saleId: uuid('sale_id').references(() => sales.id, { onDelete: 'set null' }),
  type: cashMovementTypeEnum('type').notNull(),
  amount: numeric('amount', { precision: 12, scale: 2 }).notNull(),
  note: text('note'),
  createdByMembershipId: uuid('created_by_membership_id').references(() => memberships.id, { onDelete: 'set null' }),
  ...timestamps
});

export const financeEntries = pgTable('finance_entries', {
  id: uuid('id').defaultRandom().primaryKey(),
  tenantId: uuid('tenant_id').notNull().references(() => tenants.id, { onDelete: 'cascade' }),
  storeId: uuid('store_id').references(() => stores.id, { onDelete: 'set null' }),
  customerId: uuid('customer_id').references(() => customers.id, { onDelete: 'set null' }),
  saleId: uuid('sale_id').references(() => sales.id, { onDelete: 'set null' }),
  type: financeTypeEnum('type').notNull(),
  status: financeStatusEnum('status').default('pending').notNull(),
  description: varchar('description', { length: 191 }).notNull(),
  dueDate: date('due_date').notNull(),
  amount: numeric('amount', { precision: 12, scale: 2 }).notNull(),
  paidAmount: numeric('paid_amount', { precision: 12, scale: 2 }).default('0').notNull(),
  ...timestamps
});
