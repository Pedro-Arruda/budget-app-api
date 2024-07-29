import { z } from 'zod';
import type { Prisma } from '@prisma/client';

/////////////////////////////////////////
// HELPER FUNCTIONS
/////////////////////////////////////////


/////////////////////////////////////////
// ENUMS
/////////////////////////////////////////

export const TransactionIsolationLevelSchema = z.enum(['Serializable']);

export const CategoryScalarFieldEnumSchema = z.enum(['id','description','descriptionTranslated','parentId','parentDescription']);

export const AccountScalarFieldEnumSchema = z.enum(['id','itemId','name','finalNumber','balance','availableCreditLimit','balanceCloseDate','balanceDueDate','brand','creditLimit']);

export const TransactionScalarFieldEnumSchema = z.enum(['id','date','description','amount','type','invoiceId','accountId','categoryId','createdAt','updatedAt']);

export const FixedExpensesScalarFieldEnumSchema = z.enum(['id','description','amount','createdAt','updatedAt']);

export const IncomesScalarFieldEnumSchema = z.enum(['id','description','amount','everyMonth','month','year','createdAt','updatedAt']);

export const InvoicesScalarFieldEnumSchema = z.enum(['id','amount','month','year','accountId','createdAt','updatedAt']);

export const SortOrderSchema = z.enum(['asc','desc']);

export const NullsOrderSchema = z.enum(['first','last']);
/////////////////////////////////////////
// MODELS
/////////////////////////////////////////

/////////////////////////////////////////
// CATEGORY SCHEMA
/////////////////////////////////////////

export const CategorySchema = z.object({
  id: z.string(),
  description: z.string(),
  descriptionTranslated: z.string().nullable(),
  parentId: z.string().nullable(),
  parentDescription: z.string().nullable(),
})

export type Category = z.infer<typeof CategorySchema>

/////////////////////////////////////////
// ACCOUNT SCHEMA
/////////////////////////////////////////

export const AccountSchema = z.object({
  id: z.string(),
  itemId: z.string(),
  name: z.string().nullable(),
  finalNumber: z.number().int().nullable(),
  balance: z.number().nullable(),
  availableCreditLimit: z.number().nullable(),
  balanceCloseDate: z.coerce.date().nullable(),
  balanceDueDate: z.coerce.date().nullable(),
  brand: z.string().nullable(),
  creditLimit: z.number().nullable(),
})

export type Account = z.infer<typeof AccountSchema>

/////////////////////////////////////////
// TRANSACTION SCHEMA
/////////////////////////////////////////

export const TransactionSchema = z.object({
  id: z.string(),
  date: z.coerce.date(),
  description: z.string(),
  amount: z.string(),
  type: z.string().nullable(),
  invoiceId: z.string().nullable(),
  accountId: z.string(),
  categoryId: z.string().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type Transaction = z.infer<typeof TransactionSchema>

/////////////////////////////////////////
// FIXED EXPENSES SCHEMA
/////////////////////////////////////////

export const FixedExpensesSchema = z.object({
  id: z.string().uuid(),
  description: z.string(),
  amount: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type FixedExpenses = z.infer<typeof FixedExpensesSchema>

/////////////////////////////////////////
// INCOMES SCHEMA
/////////////////////////////////////////

export const IncomesSchema = z.object({
  id: z.string().uuid(),
  description: z.string(),
  amount: z.string(),
  everyMonth: z.boolean().nullable(),
  month: z.number().int().nullable(),
  year: z.number().int().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type Incomes = z.infer<typeof IncomesSchema>

/////////////////////////////////////////
// INVOICES SCHEMA
/////////////////////////////////////////

export const InvoicesSchema = z.object({
  id: z.string().uuid(),
  amount: z.number(),
  month: z.number().int(),
  year: z.number().int(),
  accountId: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type Invoices = z.infer<typeof InvoicesSchema>

/////////////////////////////////////////
// SELECT & INCLUDE
/////////////////////////////////////////

// CATEGORY
//------------------------------------------------------

export const CategoryIncludeSchema: z.ZodType<Prisma.CategoryInclude> = z.object({
  Transaction: z.union([z.boolean(),z.lazy(() => TransactionFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => CategoryCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const CategoryArgsSchema: z.ZodType<Prisma.CategoryDefaultArgs> = z.object({
  select: z.lazy(() => CategorySelectSchema).optional(),
  include: z.lazy(() => CategoryIncludeSchema).optional(),
}).strict();

export const CategoryCountOutputTypeArgsSchema: z.ZodType<Prisma.CategoryCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => CategoryCountOutputTypeSelectSchema).nullish(),
}).strict();

export const CategoryCountOutputTypeSelectSchema: z.ZodType<Prisma.CategoryCountOutputTypeSelect> = z.object({
  Transaction: z.boolean().optional(),
}).strict();

export const CategorySelectSchema: z.ZodType<Prisma.CategorySelect> = z.object({
  id: z.boolean().optional(),
  description: z.boolean().optional(),
  descriptionTranslated: z.boolean().optional(),
  parentId: z.boolean().optional(),
  parentDescription: z.boolean().optional(),
  Transaction: z.union([z.boolean(),z.lazy(() => TransactionFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => CategoryCountOutputTypeArgsSchema)]).optional(),
}).strict()

// ACCOUNT
//------------------------------------------------------

export const AccountIncludeSchema: z.ZodType<Prisma.AccountInclude> = z.object({
  Transaction: z.union([z.boolean(),z.lazy(() => TransactionFindManyArgsSchema)]).optional(),
  Invoices: z.union([z.boolean(),z.lazy(() => InvoicesFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => AccountCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const AccountArgsSchema: z.ZodType<Prisma.AccountDefaultArgs> = z.object({
  select: z.lazy(() => AccountSelectSchema).optional(),
  include: z.lazy(() => AccountIncludeSchema).optional(),
}).strict();

export const AccountCountOutputTypeArgsSchema: z.ZodType<Prisma.AccountCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => AccountCountOutputTypeSelectSchema).nullish(),
}).strict();

export const AccountCountOutputTypeSelectSchema: z.ZodType<Prisma.AccountCountOutputTypeSelect> = z.object({
  Transaction: z.boolean().optional(),
  Invoices: z.boolean().optional(),
}).strict();

export const AccountSelectSchema: z.ZodType<Prisma.AccountSelect> = z.object({
  id: z.boolean().optional(),
  itemId: z.boolean().optional(),
  name: z.boolean().optional(),
  finalNumber: z.boolean().optional(),
  balance: z.boolean().optional(),
  availableCreditLimit: z.boolean().optional(),
  balanceCloseDate: z.boolean().optional(),
  balanceDueDate: z.boolean().optional(),
  brand: z.boolean().optional(),
  creditLimit: z.boolean().optional(),
  Transaction: z.union([z.boolean(),z.lazy(() => TransactionFindManyArgsSchema)]).optional(),
  Invoices: z.union([z.boolean(),z.lazy(() => InvoicesFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => AccountCountOutputTypeArgsSchema)]).optional(),
}).strict()

// TRANSACTION
//------------------------------------------------------

export const TransactionIncludeSchema: z.ZodType<Prisma.TransactionInclude> = z.object({
  invoice: z.union([z.boolean(),z.lazy(() => InvoicesArgsSchema)]).optional(),
  account: z.union([z.boolean(),z.lazy(() => AccountArgsSchema)]).optional(),
  category: z.union([z.boolean(),z.lazy(() => CategoryArgsSchema)]).optional(),
}).strict()

export const TransactionArgsSchema: z.ZodType<Prisma.TransactionDefaultArgs> = z.object({
  select: z.lazy(() => TransactionSelectSchema).optional(),
  include: z.lazy(() => TransactionIncludeSchema).optional(),
}).strict();

export const TransactionSelectSchema: z.ZodType<Prisma.TransactionSelect> = z.object({
  id: z.boolean().optional(),
  date: z.boolean().optional(),
  description: z.boolean().optional(),
  amount: z.boolean().optional(),
  type: z.boolean().optional(),
  invoiceId: z.boolean().optional(),
  accountId: z.boolean().optional(),
  categoryId: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  invoice: z.union([z.boolean(),z.lazy(() => InvoicesArgsSchema)]).optional(),
  account: z.union([z.boolean(),z.lazy(() => AccountArgsSchema)]).optional(),
  category: z.union([z.boolean(),z.lazy(() => CategoryArgsSchema)]).optional(),
}).strict()

// FIXED EXPENSES
//------------------------------------------------------

export const FixedExpensesSelectSchema: z.ZodType<Prisma.FixedExpensesSelect> = z.object({
  id: z.boolean().optional(),
  description: z.boolean().optional(),
  amount: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
}).strict()

// INCOMES
//------------------------------------------------------

export const IncomesSelectSchema: z.ZodType<Prisma.IncomesSelect> = z.object({
  id: z.boolean().optional(),
  description: z.boolean().optional(),
  amount: z.boolean().optional(),
  everyMonth: z.boolean().optional(),
  month: z.boolean().optional(),
  year: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
}).strict()

// INVOICES
//------------------------------------------------------

export const InvoicesIncludeSchema: z.ZodType<Prisma.InvoicesInclude> = z.object({
  account: z.union([z.boolean(),z.lazy(() => AccountArgsSchema)]).optional(),
  Transaction: z.union([z.boolean(),z.lazy(() => TransactionFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => InvoicesCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const InvoicesArgsSchema: z.ZodType<Prisma.InvoicesDefaultArgs> = z.object({
  select: z.lazy(() => InvoicesSelectSchema).optional(),
  include: z.lazy(() => InvoicesIncludeSchema).optional(),
}).strict();

export const InvoicesCountOutputTypeArgsSchema: z.ZodType<Prisma.InvoicesCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => InvoicesCountOutputTypeSelectSchema).nullish(),
}).strict();

export const InvoicesCountOutputTypeSelectSchema: z.ZodType<Prisma.InvoicesCountOutputTypeSelect> = z.object({
  Transaction: z.boolean().optional(),
}).strict();

export const InvoicesSelectSchema: z.ZodType<Prisma.InvoicesSelect> = z.object({
  id: z.boolean().optional(),
  amount: z.boolean().optional(),
  month: z.boolean().optional(),
  year: z.boolean().optional(),
  accountId: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  account: z.union([z.boolean(),z.lazy(() => AccountArgsSchema)]).optional(),
  Transaction: z.union([z.boolean(),z.lazy(() => TransactionFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => InvoicesCountOutputTypeArgsSchema)]).optional(),
}).strict()


/////////////////////////////////////////
// INPUT TYPES
/////////////////////////////////////////

export const CategoryWhereInputSchema: z.ZodType<Prisma.CategoryWhereInput> = z.object({
  AND: z.union([ z.lazy(() => CategoryWhereInputSchema),z.lazy(() => CategoryWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => CategoryWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CategoryWhereInputSchema),z.lazy(() => CategoryWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  descriptionTranslated: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  parentId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  parentDescription: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  Transaction: z.lazy(() => TransactionListRelationFilterSchema).optional()
}).strict();

export const CategoryOrderByWithRelationInputSchema: z.ZodType<Prisma.CategoryOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  descriptionTranslated: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  parentId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  parentDescription: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  Transaction: z.lazy(() => TransactionOrderByRelationAggregateInputSchema).optional()
}).strict();

export const CategoryWhereUniqueInputSchema: z.ZodType<Prisma.CategoryWhereUniqueInput> = z.object({
  id: z.string()
})
.and(z.object({
  id: z.string().optional(),
  AND: z.union([ z.lazy(() => CategoryWhereInputSchema),z.lazy(() => CategoryWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => CategoryWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CategoryWhereInputSchema),z.lazy(() => CategoryWhereInputSchema).array() ]).optional(),
  description: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  descriptionTranslated: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  parentId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  parentDescription: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  Transaction: z.lazy(() => TransactionListRelationFilterSchema).optional()
}).strict());

export const CategoryOrderByWithAggregationInputSchema: z.ZodType<Prisma.CategoryOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  descriptionTranslated: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  parentId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  parentDescription: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  _count: z.lazy(() => CategoryCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => CategoryMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => CategoryMinOrderByAggregateInputSchema).optional()
}).strict();

export const CategoryScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.CategoryScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => CategoryScalarWhereWithAggregatesInputSchema),z.lazy(() => CategoryScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => CategoryScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CategoryScalarWhereWithAggregatesInputSchema),z.lazy(() => CategoryScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  descriptionTranslated: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  parentId: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  parentDescription: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
}).strict();

export const AccountWhereInputSchema: z.ZodType<Prisma.AccountWhereInput> = z.object({
  AND: z.union([ z.lazy(() => AccountWhereInputSchema),z.lazy(() => AccountWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => AccountWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AccountWhereInputSchema),z.lazy(() => AccountWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  itemId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  finalNumber: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  balance: z.union([ z.lazy(() => FloatNullableFilterSchema),z.number() ]).optional().nullable(),
  availableCreditLimit: z.union([ z.lazy(() => FloatNullableFilterSchema),z.number() ]).optional().nullable(),
  balanceCloseDate: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  balanceDueDate: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  brand: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  creditLimit: z.union([ z.lazy(() => FloatNullableFilterSchema),z.number() ]).optional().nullable(),
  Transaction: z.lazy(() => TransactionListRelationFilterSchema).optional(),
  Invoices: z.lazy(() => InvoicesListRelationFilterSchema).optional()
}).strict();

export const AccountOrderByWithRelationInputSchema: z.ZodType<Prisma.AccountOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  itemId: z.lazy(() => SortOrderSchema).optional(),
  name: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  finalNumber: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  balance: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  availableCreditLimit: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  balanceCloseDate: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  balanceDueDate: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  brand: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  creditLimit: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  Transaction: z.lazy(() => TransactionOrderByRelationAggregateInputSchema).optional(),
  Invoices: z.lazy(() => InvoicesOrderByRelationAggregateInputSchema).optional()
}).strict();

export const AccountWhereUniqueInputSchema: z.ZodType<Prisma.AccountWhereUniqueInput> = z.object({
  id: z.string()
})
.and(z.object({
  id: z.string().optional(),
  AND: z.union([ z.lazy(() => AccountWhereInputSchema),z.lazy(() => AccountWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => AccountWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AccountWhereInputSchema),z.lazy(() => AccountWhereInputSchema).array() ]).optional(),
  itemId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  finalNumber: z.union([ z.lazy(() => IntNullableFilterSchema),z.number().int() ]).optional().nullable(),
  balance: z.union([ z.lazy(() => FloatNullableFilterSchema),z.number() ]).optional().nullable(),
  availableCreditLimit: z.union([ z.lazy(() => FloatNullableFilterSchema),z.number() ]).optional().nullable(),
  balanceCloseDate: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  balanceDueDate: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  brand: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  creditLimit: z.union([ z.lazy(() => FloatNullableFilterSchema),z.number() ]).optional().nullable(),
  Transaction: z.lazy(() => TransactionListRelationFilterSchema).optional(),
  Invoices: z.lazy(() => InvoicesListRelationFilterSchema).optional()
}).strict());

export const AccountOrderByWithAggregationInputSchema: z.ZodType<Prisma.AccountOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  itemId: z.lazy(() => SortOrderSchema).optional(),
  name: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  finalNumber: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  balance: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  availableCreditLimit: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  balanceCloseDate: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  balanceDueDate: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  brand: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  creditLimit: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  _count: z.lazy(() => AccountCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => AccountAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => AccountMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => AccountMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => AccountSumOrderByAggregateInputSchema).optional()
}).strict();

export const AccountScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.AccountScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => AccountScalarWhereWithAggregatesInputSchema),z.lazy(() => AccountScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => AccountScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AccountScalarWhereWithAggregatesInputSchema),z.lazy(() => AccountScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  itemId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  finalNumber: z.union([ z.lazy(() => IntNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
  balance: z.union([ z.lazy(() => FloatNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
  availableCreditLimit: z.union([ z.lazy(() => FloatNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
  balanceCloseDate: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
  balanceDueDate: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
  brand: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  creditLimit: z.union([ z.lazy(() => FloatNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
}).strict();

export const TransactionWhereInputSchema: z.ZodType<Prisma.TransactionWhereInput> = z.object({
  AND: z.union([ z.lazy(() => TransactionWhereInputSchema),z.lazy(() => TransactionWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => TransactionWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => TransactionWhereInputSchema),z.lazy(() => TransactionWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  date: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  description: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  amount: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  type: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  invoiceId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  accountId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  categoryId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  invoice: z.union([ z.lazy(() => InvoicesNullableRelationFilterSchema),z.lazy(() => InvoicesWhereInputSchema) ]).optional().nullable(),
  account: z.union([ z.lazy(() => AccountRelationFilterSchema),z.lazy(() => AccountWhereInputSchema) ]).optional(),
  category: z.union([ z.lazy(() => CategoryNullableRelationFilterSchema),z.lazy(() => CategoryWhereInputSchema) ]).optional().nullable(),
}).strict();

export const TransactionOrderByWithRelationInputSchema: z.ZodType<Prisma.TransactionOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  date: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  amount: z.lazy(() => SortOrderSchema).optional(),
  type: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  invoiceId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  accountId: z.lazy(() => SortOrderSchema).optional(),
  categoryId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  invoice: z.lazy(() => InvoicesOrderByWithRelationInputSchema).optional(),
  account: z.lazy(() => AccountOrderByWithRelationInputSchema).optional(),
  category: z.lazy(() => CategoryOrderByWithRelationInputSchema).optional()
}).strict();

export const TransactionWhereUniqueInputSchema: z.ZodType<Prisma.TransactionWhereUniqueInput> = z.object({
  id: z.string()
})
.and(z.object({
  id: z.string().optional(),
  AND: z.union([ z.lazy(() => TransactionWhereInputSchema),z.lazy(() => TransactionWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => TransactionWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => TransactionWhereInputSchema),z.lazy(() => TransactionWhereInputSchema).array() ]).optional(),
  date: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  description: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  amount: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  type: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  invoiceId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  accountId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  categoryId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  invoice: z.union([ z.lazy(() => InvoicesNullableRelationFilterSchema),z.lazy(() => InvoicesWhereInputSchema) ]).optional().nullable(),
  account: z.union([ z.lazy(() => AccountRelationFilterSchema),z.lazy(() => AccountWhereInputSchema) ]).optional(),
  category: z.union([ z.lazy(() => CategoryNullableRelationFilterSchema),z.lazy(() => CategoryWhereInputSchema) ]).optional().nullable(),
}).strict());

export const TransactionOrderByWithAggregationInputSchema: z.ZodType<Prisma.TransactionOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  date: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  amount: z.lazy(() => SortOrderSchema).optional(),
  type: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  invoiceId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  accountId: z.lazy(() => SortOrderSchema).optional(),
  categoryId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => TransactionCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => TransactionMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => TransactionMinOrderByAggregateInputSchema).optional()
}).strict();

export const TransactionScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.TransactionScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => TransactionScalarWhereWithAggregatesInputSchema),z.lazy(() => TransactionScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => TransactionScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => TransactionScalarWhereWithAggregatesInputSchema),z.lazy(() => TransactionScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  date: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  description: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  amount: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  type: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  invoiceId: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  accountId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  categoryId: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const FixedExpensesWhereInputSchema: z.ZodType<Prisma.FixedExpensesWhereInput> = z.object({
  AND: z.union([ z.lazy(() => FixedExpensesWhereInputSchema),z.lazy(() => FixedExpensesWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => FixedExpensesWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => FixedExpensesWhereInputSchema),z.lazy(() => FixedExpensesWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  amount: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const FixedExpensesOrderByWithRelationInputSchema: z.ZodType<Prisma.FixedExpensesOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  amount: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const FixedExpensesWhereUniqueInputSchema: z.ZodType<Prisma.FixedExpensesWhereUniqueInput> = z.object({
  id: z.string().uuid()
})
.and(z.object({
  id: z.string().uuid().optional(),
  AND: z.union([ z.lazy(() => FixedExpensesWhereInputSchema),z.lazy(() => FixedExpensesWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => FixedExpensesWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => FixedExpensesWhereInputSchema),z.lazy(() => FixedExpensesWhereInputSchema).array() ]).optional(),
  description: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  amount: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict());

export const FixedExpensesOrderByWithAggregationInputSchema: z.ZodType<Prisma.FixedExpensesOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  amount: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => FixedExpensesCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => FixedExpensesMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => FixedExpensesMinOrderByAggregateInputSchema).optional()
}).strict();

export const FixedExpensesScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.FixedExpensesScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => FixedExpensesScalarWhereWithAggregatesInputSchema),z.lazy(() => FixedExpensesScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => FixedExpensesScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => FixedExpensesScalarWhereWithAggregatesInputSchema),z.lazy(() => FixedExpensesScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  amount: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const IncomesWhereInputSchema: z.ZodType<Prisma.IncomesWhereInput> = z.object({
  AND: z.union([ z.lazy(() => IncomesWhereInputSchema),z.lazy(() => IncomesWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => IncomesWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => IncomesWhereInputSchema),z.lazy(() => IncomesWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  amount: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  everyMonth: z.union([ z.lazy(() => BoolNullableFilterSchema),z.boolean() ]).optional().nullable(),
  month: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  year: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const IncomesOrderByWithRelationInputSchema: z.ZodType<Prisma.IncomesOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  amount: z.lazy(() => SortOrderSchema).optional(),
  everyMonth: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  month: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  year: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const IncomesWhereUniqueInputSchema: z.ZodType<Prisma.IncomesWhereUniqueInput> = z.object({
  id: z.string().uuid()
})
.and(z.object({
  id: z.string().uuid().optional(),
  AND: z.union([ z.lazy(() => IncomesWhereInputSchema),z.lazy(() => IncomesWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => IncomesWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => IncomesWhereInputSchema),z.lazy(() => IncomesWhereInputSchema).array() ]).optional(),
  description: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  amount: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  everyMonth: z.union([ z.lazy(() => BoolNullableFilterSchema),z.boolean() ]).optional().nullable(),
  month: z.union([ z.lazy(() => IntNullableFilterSchema),z.number().int() ]).optional().nullable(),
  year: z.union([ z.lazy(() => IntNullableFilterSchema),z.number().int() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict());

export const IncomesOrderByWithAggregationInputSchema: z.ZodType<Prisma.IncomesOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  amount: z.lazy(() => SortOrderSchema).optional(),
  everyMonth: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  month: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  year: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => IncomesCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => IncomesAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => IncomesMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => IncomesMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => IncomesSumOrderByAggregateInputSchema).optional()
}).strict();

export const IncomesScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.IncomesScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => IncomesScalarWhereWithAggregatesInputSchema),z.lazy(() => IncomesScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => IncomesScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => IncomesScalarWhereWithAggregatesInputSchema),z.lazy(() => IncomesScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  amount: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  everyMonth: z.union([ z.lazy(() => BoolNullableWithAggregatesFilterSchema),z.boolean() ]).optional().nullable(),
  month: z.union([ z.lazy(() => IntNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
  year: z.union([ z.lazy(() => IntNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const InvoicesWhereInputSchema: z.ZodType<Prisma.InvoicesWhereInput> = z.object({
  AND: z.union([ z.lazy(() => InvoicesWhereInputSchema),z.lazy(() => InvoicesWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => InvoicesWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => InvoicesWhereInputSchema),z.lazy(() => InvoicesWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  amount: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  month: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  year: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  accountId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  account: z.union([ z.lazy(() => AccountRelationFilterSchema),z.lazy(() => AccountWhereInputSchema) ]).optional(),
  Transaction: z.lazy(() => TransactionListRelationFilterSchema).optional()
}).strict();

export const InvoicesOrderByWithRelationInputSchema: z.ZodType<Prisma.InvoicesOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  amount: z.lazy(() => SortOrderSchema).optional(),
  month: z.lazy(() => SortOrderSchema).optional(),
  year: z.lazy(() => SortOrderSchema).optional(),
  accountId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  account: z.lazy(() => AccountOrderByWithRelationInputSchema).optional(),
  Transaction: z.lazy(() => TransactionOrderByRelationAggregateInputSchema).optional()
}).strict();

export const InvoicesWhereUniqueInputSchema: z.ZodType<Prisma.InvoicesWhereUniqueInput> = z.object({
  id: z.string().uuid()
})
.and(z.object({
  id: z.string().uuid().optional(),
  AND: z.union([ z.lazy(() => InvoicesWhereInputSchema),z.lazy(() => InvoicesWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => InvoicesWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => InvoicesWhereInputSchema),z.lazy(() => InvoicesWhereInputSchema).array() ]).optional(),
  amount: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  month: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  year: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  accountId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  account: z.union([ z.lazy(() => AccountRelationFilterSchema),z.lazy(() => AccountWhereInputSchema) ]).optional(),
  Transaction: z.lazy(() => TransactionListRelationFilterSchema).optional()
}).strict());

export const InvoicesOrderByWithAggregationInputSchema: z.ZodType<Prisma.InvoicesOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  amount: z.lazy(() => SortOrderSchema).optional(),
  month: z.lazy(() => SortOrderSchema).optional(),
  year: z.lazy(() => SortOrderSchema).optional(),
  accountId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => InvoicesCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => InvoicesAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => InvoicesMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => InvoicesMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => InvoicesSumOrderByAggregateInputSchema).optional()
}).strict();

export const InvoicesScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.InvoicesScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => InvoicesScalarWhereWithAggregatesInputSchema),z.lazy(() => InvoicesScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => InvoicesScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => InvoicesScalarWhereWithAggregatesInputSchema),z.lazy(() => InvoicesScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  amount: z.union([ z.lazy(() => FloatWithAggregatesFilterSchema),z.number() ]).optional(),
  month: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  year: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  accountId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const CategoryCreateInputSchema: z.ZodType<Prisma.CategoryCreateInput> = z.object({
  id: z.string(),
  description: z.string(),
  descriptionTranslated: z.string().optional().nullable(),
  parentId: z.string().optional().nullable(),
  parentDescription: z.string().optional().nullable(),
  Transaction: z.lazy(() => TransactionCreateNestedManyWithoutCategoryInputSchema).optional()
}).strict();

export const CategoryUncheckedCreateInputSchema: z.ZodType<Prisma.CategoryUncheckedCreateInput> = z.object({
  id: z.string(),
  description: z.string(),
  descriptionTranslated: z.string().optional().nullable(),
  parentId: z.string().optional().nullable(),
  parentDescription: z.string().optional().nullable(),
  Transaction: z.lazy(() => TransactionUncheckedCreateNestedManyWithoutCategoryInputSchema).optional()
}).strict();

export const CategoryUpdateInputSchema: z.ZodType<Prisma.CategoryUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  descriptionTranslated: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  parentId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  parentDescription: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  Transaction: z.lazy(() => TransactionUpdateManyWithoutCategoryNestedInputSchema).optional()
}).strict();

export const CategoryUncheckedUpdateInputSchema: z.ZodType<Prisma.CategoryUncheckedUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  descriptionTranslated: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  parentId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  parentDescription: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  Transaction: z.lazy(() => TransactionUncheckedUpdateManyWithoutCategoryNestedInputSchema).optional()
}).strict();

export const CategoryCreateManyInputSchema: z.ZodType<Prisma.CategoryCreateManyInput> = z.object({
  id: z.string(),
  description: z.string(),
  descriptionTranslated: z.string().optional().nullable(),
  parentId: z.string().optional().nullable(),
  parentDescription: z.string().optional().nullable()
}).strict();

export const CategoryUpdateManyMutationInputSchema: z.ZodType<Prisma.CategoryUpdateManyMutationInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  descriptionTranslated: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  parentId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  parentDescription: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const CategoryUncheckedUpdateManyInputSchema: z.ZodType<Prisma.CategoryUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  descriptionTranslated: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  parentId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  parentDescription: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const AccountCreateInputSchema: z.ZodType<Prisma.AccountCreateInput> = z.object({
  id: z.string(),
  itemId: z.string(),
  name: z.string().optional().nullable(),
  finalNumber: z.number().int().optional().nullable(),
  balance: z.number().optional().nullable(),
  availableCreditLimit: z.number().optional().nullable(),
  balanceCloseDate: z.coerce.date().optional().nullable(),
  balanceDueDate: z.coerce.date().optional().nullable(),
  brand: z.string().optional().nullable(),
  creditLimit: z.number().optional().nullable(),
  Transaction: z.lazy(() => TransactionCreateNestedManyWithoutAccountInputSchema).optional(),
  Invoices: z.lazy(() => InvoicesCreateNestedManyWithoutAccountInputSchema).optional()
}).strict();

export const AccountUncheckedCreateInputSchema: z.ZodType<Prisma.AccountUncheckedCreateInput> = z.object({
  id: z.string(),
  itemId: z.string(),
  name: z.string().optional().nullable(),
  finalNumber: z.number().int().optional().nullable(),
  balance: z.number().optional().nullable(),
  availableCreditLimit: z.number().optional().nullable(),
  balanceCloseDate: z.coerce.date().optional().nullable(),
  balanceDueDate: z.coerce.date().optional().nullable(),
  brand: z.string().optional().nullable(),
  creditLimit: z.number().optional().nullable(),
  Transaction: z.lazy(() => TransactionUncheckedCreateNestedManyWithoutAccountInputSchema).optional(),
  Invoices: z.lazy(() => InvoicesUncheckedCreateNestedManyWithoutAccountInputSchema).optional()
}).strict();

export const AccountUpdateInputSchema: z.ZodType<Prisma.AccountUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  itemId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  finalNumber: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  balance: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  availableCreditLimit: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  balanceCloseDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  balanceDueDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  brand: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  creditLimit: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  Transaction: z.lazy(() => TransactionUpdateManyWithoutAccountNestedInputSchema).optional(),
  Invoices: z.lazy(() => InvoicesUpdateManyWithoutAccountNestedInputSchema).optional()
}).strict();

export const AccountUncheckedUpdateInputSchema: z.ZodType<Prisma.AccountUncheckedUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  itemId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  finalNumber: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  balance: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  availableCreditLimit: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  balanceCloseDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  balanceDueDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  brand: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  creditLimit: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  Transaction: z.lazy(() => TransactionUncheckedUpdateManyWithoutAccountNestedInputSchema).optional(),
  Invoices: z.lazy(() => InvoicesUncheckedUpdateManyWithoutAccountNestedInputSchema).optional()
}).strict();

export const AccountCreateManyInputSchema: z.ZodType<Prisma.AccountCreateManyInput> = z.object({
  id: z.string(),
  itemId: z.string(),
  name: z.string().optional().nullable(),
  finalNumber: z.number().int().optional().nullable(),
  balance: z.number().optional().nullable(),
  availableCreditLimit: z.number().optional().nullable(),
  balanceCloseDate: z.coerce.date().optional().nullable(),
  balanceDueDate: z.coerce.date().optional().nullable(),
  brand: z.string().optional().nullable(),
  creditLimit: z.number().optional().nullable()
}).strict();

export const AccountUpdateManyMutationInputSchema: z.ZodType<Prisma.AccountUpdateManyMutationInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  itemId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  finalNumber: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  balance: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  availableCreditLimit: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  balanceCloseDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  balanceDueDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  brand: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  creditLimit: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const AccountUncheckedUpdateManyInputSchema: z.ZodType<Prisma.AccountUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  itemId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  finalNumber: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  balance: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  availableCreditLimit: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  balanceCloseDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  balanceDueDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  brand: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  creditLimit: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const TransactionCreateInputSchema: z.ZodType<Prisma.TransactionCreateInput> = z.object({
  id: z.string(),
  date: z.coerce.date(),
  description: z.string(),
  amount: z.string(),
  type: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  invoice: z.lazy(() => InvoicesCreateNestedOneWithoutTransactionInputSchema).optional(),
  account: z.lazy(() => AccountCreateNestedOneWithoutTransactionInputSchema),
  category: z.lazy(() => CategoryCreateNestedOneWithoutTransactionInputSchema).optional()
}).strict();

export const TransactionUncheckedCreateInputSchema: z.ZodType<Prisma.TransactionUncheckedCreateInput> = z.object({
  id: z.string(),
  date: z.coerce.date(),
  description: z.string(),
  amount: z.string(),
  type: z.string().optional().nullable(),
  invoiceId: z.string().optional().nullable(),
  accountId: z.string(),
  categoryId: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const TransactionUpdateInputSchema: z.ZodType<Prisma.TransactionUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  amount: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  invoice: z.lazy(() => InvoicesUpdateOneWithoutTransactionNestedInputSchema).optional(),
  account: z.lazy(() => AccountUpdateOneRequiredWithoutTransactionNestedInputSchema).optional(),
  category: z.lazy(() => CategoryUpdateOneWithoutTransactionNestedInputSchema).optional()
}).strict();

export const TransactionUncheckedUpdateInputSchema: z.ZodType<Prisma.TransactionUncheckedUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  amount: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  invoiceId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  accountId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  categoryId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const TransactionCreateManyInputSchema: z.ZodType<Prisma.TransactionCreateManyInput> = z.object({
  id: z.string(),
  date: z.coerce.date(),
  description: z.string(),
  amount: z.string(),
  type: z.string().optional().nullable(),
  invoiceId: z.string().optional().nullable(),
  accountId: z.string(),
  categoryId: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const TransactionUpdateManyMutationInputSchema: z.ZodType<Prisma.TransactionUpdateManyMutationInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  amount: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const TransactionUncheckedUpdateManyInputSchema: z.ZodType<Prisma.TransactionUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  amount: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  invoiceId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  accountId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  categoryId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const FixedExpensesCreateInputSchema: z.ZodType<Prisma.FixedExpensesCreateInput> = z.object({
  id: z.string().uuid().optional(),
  description: z.string(),
  amount: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const FixedExpensesUncheckedCreateInputSchema: z.ZodType<Prisma.FixedExpensesUncheckedCreateInput> = z.object({
  id: z.string().uuid().optional(),
  description: z.string(),
  amount: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const FixedExpensesUpdateInputSchema: z.ZodType<Prisma.FixedExpensesUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  amount: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const FixedExpensesUncheckedUpdateInputSchema: z.ZodType<Prisma.FixedExpensesUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  amount: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const FixedExpensesCreateManyInputSchema: z.ZodType<Prisma.FixedExpensesCreateManyInput> = z.object({
  id: z.string().uuid().optional(),
  description: z.string(),
  amount: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const FixedExpensesUpdateManyMutationInputSchema: z.ZodType<Prisma.FixedExpensesUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  amount: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const FixedExpensesUncheckedUpdateManyInputSchema: z.ZodType<Prisma.FixedExpensesUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  amount: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const IncomesCreateInputSchema: z.ZodType<Prisma.IncomesCreateInput> = z.object({
  id: z.string().uuid().optional(),
  description: z.string(),
  amount: z.string(),
  everyMonth: z.boolean().optional().nullable(),
  month: z.number().int().optional().nullable(),
  year: z.number().int().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const IncomesUncheckedCreateInputSchema: z.ZodType<Prisma.IncomesUncheckedCreateInput> = z.object({
  id: z.string().uuid().optional(),
  description: z.string(),
  amount: z.string(),
  everyMonth: z.boolean().optional().nullable(),
  month: z.number().int().optional().nullable(),
  year: z.number().int().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const IncomesUpdateInputSchema: z.ZodType<Prisma.IncomesUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  amount: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  everyMonth: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  month: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  year: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const IncomesUncheckedUpdateInputSchema: z.ZodType<Prisma.IncomesUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  amount: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  everyMonth: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  month: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  year: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const IncomesCreateManyInputSchema: z.ZodType<Prisma.IncomesCreateManyInput> = z.object({
  id: z.string().uuid().optional(),
  description: z.string(),
  amount: z.string(),
  everyMonth: z.boolean().optional().nullable(),
  month: z.number().int().optional().nullable(),
  year: z.number().int().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const IncomesUpdateManyMutationInputSchema: z.ZodType<Prisma.IncomesUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  amount: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  everyMonth: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  month: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  year: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const IncomesUncheckedUpdateManyInputSchema: z.ZodType<Prisma.IncomesUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  amount: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  everyMonth: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  month: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  year: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const InvoicesCreateInputSchema: z.ZodType<Prisma.InvoicesCreateInput> = z.object({
  id: z.string().uuid().optional(),
  amount: z.number(),
  month: z.number().int(),
  year: z.number().int(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  account: z.lazy(() => AccountCreateNestedOneWithoutInvoicesInputSchema),
  Transaction: z.lazy(() => TransactionCreateNestedManyWithoutInvoiceInputSchema).optional()
}).strict();

export const InvoicesUncheckedCreateInputSchema: z.ZodType<Prisma.InvoicesUncheckedCreateInput> = z.object({
  id: z.string().uuid().optional(),
  amount: z.number(),
  month: z.number().int(),
  year: z.number().int(),
  accountId: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  Transaction: z.lazy(() => TransactionUncheckedCreateNestedManyWithoutInvoiceInputSchema).optional()
}).strict();

export const InvoicesUpdateInputSchema: z.ZodType<Prisma.InvoicesUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  amount: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  month: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  year: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  account: z.lazy(() => AccountUpdateOneRequiredWithoutInvoicesNestedInputSchema).optional(),
  Transaction: z.lazy(() => TransactionUpdateManyWithoutInvoiceNestedInputSchema).optional()
}).strict();

export const InvoicesUncheckedUpdateInputSchema: z.ZodType<Prisma.InvoicesUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  amount: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  month: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  year: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  accountId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  Transaction: z.lazy(() => TransactionUncheckedUpdateManyWithoutInvoiceNestedInputSchema).optional()
}).strict();

export const InvoicesCreateManyInputSchema: z.ZodType<Prisma.InvoicesCreateManyInput> = z.object({
  id: z.string().uuid().optional(),
  amount: z.number(),
  month: z.number().int(),
  year: z.number().int(),
  accountId: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const InvoicesUpdateManyMutationInputSchema: z.ZodType<Prisma.InvoicesUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  amount: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  month: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  year: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const InvoicesUncheckedUpdateManyInputSchema: z.ZodType<Prisma.InvoicesUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  amount: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  month: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  year: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  accountId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const StringFilterSchema: z.ZodType<Prisma.StringFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringFilterSchema) ]).optional(),
}).strict();

export const StringNullableFilterSchema: z.ZodType<Prisma.StringNullableFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const TransactionListRelationFilterSchema: z.ZodType<Prisma.TransactionListRelationFilter> = z.object({
  every: z.lazy(() => TransactionWhereInputSchema).optional(),
  some: z.lazy(() => TransactionWhereInputSchema).optional(),
  none: z.lazy(() => TransactionWhereInputSchema).optional()
}).strict();

export const SortOrderInputSchema: z.ZodType<Prisma.SortOrderInput> = z.object({
  sort: z.lazy(() => SortOrderSchema),
  nulls: z.lazy(() => NullsOrderSchema).optional()
}).strict();

export const TransactionOrderByRelationAggregateInputSchema: z.ZodType<Prisma.TransactionOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const CategoryCountOrderByAggregateInputSchema: z.ZodType<Prisma.CategoryCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  descriptionTranslated: z.lazy(() => SortOrderSchema).optional(),
  parentId: z.lazy(() => SortOrderSchema).optional(),
  parentDescription: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const CategoryMaxOrderByAggregateInputSchema: z.ZodType<Prisma.CategoryMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  descriptionTranslated: z.lazy(() => SortOrderSchema).optional(),
  parentId: z.lazy(() => SortOrderSchema).optional(),
  parentDescription: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const CategoryMinOrderByAggregateInputSchema: z.ZodType<Prisma.CategoryMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  descriptionTranslated: z.lazy(() => SortOrderSchema).optional(),
  parentId: z.lazy(() => SortOrderSchema).optional(),
  parentDescription: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const StringWithAggregatesFilterSchema: z.ZodType<Prisma.StringWithAggregatesFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional()
}).strict();

export const StringNullableWithAggregatesFilterSchema: z.ZodType<Prisma.StringNullableWithAggregatesFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedStringNullableFilterSchema).optional()
}).strict();

export const IntNullableFilterSchema: z.ZodType<Prisma.IntNullableFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const FloatNullableFilterSchema: z.ZodType<Prisma.FloatNullableFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const DateTimeNullableFilterSchema: z.ZodType<Prisma.DateTimeNullableFilter> = z.object({
  equals: z.coerce.date().optional().nullable(),
  in: z.coerce.date().array().optional().nullable(),
  notIn: z.coerce.date().array().optional().nullable(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const InvoicesListRelationFilterSchema: z.ZodType<Prisma.InvoicesListRelationFilter> = z.object({
  every: z.lazy(() => InvoicesWhereInputSchema).optional(),
  some: z.lazy(() => InvoicesWhereInputSchema).optional(),
  none: z.lazy(() => InvoicesWhereInputSchema).optional()
}).strict();

export const InvoicesOrderByRelationAggregateInputSchema: z.ZodType<Prisma.InvoicesOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AccountCountOrderByAggregateInputSchema: z.ZodType<Prisma.AccountCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  itemId: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  finalNumber: z.lazy(() => SortOrderSchema).optional(),
  balance: z.lazy(() => SortOrderSchema).optional(),
  availableCreditLimit: z.lazy(() => SortOrderSchema).optional(),
  balanceCloseDate: z.lazy(() => SortOrderSchema).optional(),
  balanceDueDate: z.lazy(() => SortOrderSchema).optional(),
  brand: z.lazy(() => SortOrderSchema).optional(),
  creditLimit: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AccountAvgOrderByAggregateInputSchema: z.ZodType<Prisma.AccountAvgOrderByAggregateInput> = z.object({
  finalNumber: z.lazy(() => SortOrderSchema).optional(),
  balance: z.lazy(() => SortOrderSchema).optional(),
  availableCreditLimit: z.lazy(() => SortOrderSchema).optional(),
  creditLimit: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AccountMaxOrderByAggregateInputSchema: z.ZodType<Prisma.AccountMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  itemId: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  finalNumber: z.lazy(() => SortOrderSchema).optional(),
  balance: z.lazy(() => SortOrderSchema).optional(),
  availableCreditLimit: z.lazy(() => SortOrderSchema).optional(),
  balanceCloseDate: z.lazy(() => SortOrderSchema).optional(),
  balanceDueDate: z.lazy(() => SortOrderSchema).optional(),
  brand: z.lazy(() => SortOrderSchema).optional(),
  creditLimit: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AccountMinOrderByAggregateInputSchema: z.ZodType<Prisma.AccountMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  itemId: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  finalNumber: z.lazy(() => SortOrderSchema).optional(),
  balance: z.lazy(() => SortOrderSchema).optional(),
  availableCreditLimit: z.lazy(() => SortOrderSchema).optional(),
  balanceCloseDate: z.lazy(() => SortOrderSchema).optional(),
  balanceDueDate: z.lazy(() => SortOrderSchema).optional(),
  brand: z.lazy(() => SortOrderSchema).optional(),
  creditLimit: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AccountSumOrderByAggregateInputSchema: z.ZodType<Prisma.AccountSumOrderByAggregateInput> = z.object({
  finalNumber: z.lazy(() => SortOrderSchema).optional(),
  balance: z.lazy(() => SortOrderSchema).optional(),
  availableCreditLimit: z.lazy(() => SortOrderSchema).optional(),
  creditLimit: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const IntNullableWithAggregatesFilterSchema: z.ZodType<Prisma.IntNullableWithAggregatesFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedIntNullableFilterSchema).optional()
}).strict();

export const FloatNullableWithAggregatesFilterSchema: z.ZodType<Prisma.FloatNullableWithAggregatesFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _sum: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedFloatNullableFilterSchema).optional()
}).strict();

export const DateTimeNullableWithAggregatesFilterSchema: z.ZodType<Prisma.DateTimeNullableWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional().nullable(),
  in: z.coerce.date().array().optional().nullable(),
  notIn: z.coerce.date().array().optional().nullable(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeNullableFilterSchema).optional()
}).strict();

export const DateTimeFilterSchema: z.ZodType<Prisma.DateTimeFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeFilterSchema) ]).optional(),
}).strict();

export const InvoicesNullableRelationFilterSchema: z.ZodType<Prisma.InvoicesNullableRelationFilter> = z.object({
  is: z.lazy(() => InvoicesWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => InvoicesWhereInputSchema).optional().nullable()
}).strict();

export const AccountRelationFilterSchema: z.ZodType<Prisma.AccountRelationFilter> = z.object({
  is: z.lazy(() => AccountWhereInputSchema).optional(),
  isNot: z.lazy(() => AccountWhereInputSchema).optional()
}).strict();

export const CategoryNullableRelationFilterSchema: z.ZodType<Prisma.CategoryNullableRelationFilter> = z.object({
  is: z.lazy(() => CategoryWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => CategoryWhereInputSchema).optional().nullable()
}).strict();

export const TransactionCountOrderByAggregateInputSchema: z.ZodType<Prisma.TransactionCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  date: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  amount: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  invoiceId: z.lazy(() => SortOrderSchema).optional(),
  accountId: z.lazy(() => SortOrderSchema).optional(),
  categoryId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const TransactionMaxOrderByAggregateInputSchema: z.ZodType<Prisma.TransactionMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  date: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  amount: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  invoiceId: z.lazy(() => SortOrderSchema).optional(),
  accountId: z.lazy(() => SortOrderSchema).optional(),
  categoryId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const TransactionMinOrderByAggregateInputSchema: z.ZodType<Prisma.TransactionMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  date: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  amount: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  invoiceId: z.lazy(() => SortOrderSchema).optional(),
  accountId: z.lazy(() => SortOrderSchema).optional(),
  categoryId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const DateTimeWithAggregatesFilterSchema: z.ZodType<Prisma.DateTimeWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeFilterSchema).optional()
}).strict();

export const FixedExpensesCountOrderByAggregateInputSchema: z.ZodType<Prisma.FixedExpensesCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  amount: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const FixedExpensesMaxOrderByAggregateInputSchema: z.ZodType<Prisma.FixedExpensesMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  amount: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const FixedExpensesMinOrderByAggregateInputSchema: z.ZodType<Prisma.FixedExpensesMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  amount: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const BoolNullableFilterSchema: z.ZodType<Prisma.BoolNullableFilter> = z.object({
  equals: z.boolean().optional().nullable(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const IncomesCountOrderByAggregateInputSchema: z.ZodType<Prisma.IncomesCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  amount: z.lazy(() => SortOrderSchema).optional(),
  everyMonth: z.lazy(() => SortOrderSchema).optional(),
  month: z.lazy(() => SortOrderSchema).optional(),
  year: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const IncomesAvgOrderByAggregateInputSchema: z.ZodType<Prisma.IncomesAvgOrderByAggregateInput> = z.object({
  month: z.lazy(() => SortOrderSchema).optional(),
  year: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const IncomesMaxOrderByAggregateInputSchema: z.ZodType<Prisma.IncomesMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  amount: z.lazy(() => SortOrderSchema).optional(),
  everyMonth: z.lazy(() => SortOrderSchema).optional(),
  month: z.lazy(() => SortOrderSchema).optional(),
  year: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const IncomesMinOrderByAggregateInputSchema: z.ZodType<Prisma.IncomesMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  amount: z.lazy(() => SortOrderSchema).optional(),
  everyMonth: z.lazy(() => SortOrderSchema).optional(),
  month: z.lazy(() => SortOrderSchema).optional(),
  year: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const IncomesSumOrderByAggregateInputSchema: z.ZodType<Prisma.IncomesSumOrderByAggregateInput> = z.object({
  month: z.lazy(() => SortOrderSchema).optional(),
  year: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const BoolNullableWithAggregatesFilterSchema: z.ZodType<Prisma.BoolNullableWithAggregatesFilter> = z.object({
  equals: z.boolean().optional().nullable(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedBoolNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedBoolNullableFilterSchema).optional()
}).strict();

export const FloatFilterSchema: z.ZodType<Prisma.FloatFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatFilterSchema) ]).optional(),
}).strict();

export const IntFilterSchema: z.ZodType<Prisma.IntFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntFilterSchema) ]).optional(),
}).strict();

export const InvoicesCountOrderByAggregateInputSchema: z.ZodType<Prisma.InvoicesCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  amount: z.lazy(() => SortOrderSchema).optional(),
  month: z.lazy(() => SortOrderSchema).optional(),
  year: z.lazy(() => SortOrderSchema).optional(),
  accountId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const InvoicesAvgOrderByAggregateInputSchema: z.ZodType<Prisma.InvoicesAvgOrderByAggregateInput> = z.object({
  amount: z.lazy(() => SortOrderSchema).optional(),
  month: z.lazy(() => SortOrderSchema).optional(),
  year: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const InvoicesMaxOrderByAggregateInputSchema: z.ZodType<Prisma.InvoicesMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  amount: z.lazy(() => SortOrderSchema).optional(),
  month: z.lazy(() => SortOrderSchema).optional(),
  year: z.lazy(() => SortOrderSchema).optional(),
  accountId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const InvoicesMinOrderByAggregateInputSchema: z.ZodType<Prisma.InvoicesMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  amount: z.lazy(() => SortOrderSchema).optional(),
  month: z.lazy(() => SortOrderSchema).optional(),
  year: z.lazy(() => SortOrderSchema).optional(),
  accountId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const InvoicesSumOrderByAggregateInputSchema: z.ZodType<Prisma.InvoicesSumOrderByAggregateInput> = z.object({
  amount: z.lazy(() => SortOrderSchema).optional(),
  month: z.lazy(() => SortOrderSchema).optional(),
  year: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const FloatWithAggregatesFilterSchema: z.ZodType<Prisma.FloatWithAggregatesFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedFloatFilterSchema).optional(),
  _min: z.lazy(() => NestedFloatFilterSchema).optional(),
  _max: z.lazy(() => NestedFloatFilterSchema).optional()
}).strict();

export const IntWithAggregatesFilterSchema: z.ZodType<Prisma.IntWithAggregatesFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedIntFilterSchema).optional(),
  _max: z.lazy(() => NestedIntFilterSchema).optional()
}).strict();

export const TransactionCreateNestedManyWithoutCategoryInputSchema: z.ZodType<Prisma.TransactionCreateNestedManyWithoutCategoryInput> = z.object({
  create: z.union([ z.lazy(() => TransactionCreateWithoutCategoryInputSchema),z.lazy(() => TransactionCreateWithoutCategoryInputSchema).array(),z.lazy(() => TransactionUncheckedCreateWithoutCategoryInputSchema),z.lazy(() => TransactionUncheckedCreateWithoutCategoryInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => TransactionCreateOrConnectWithoutCategoryInputSchema),z.lazy(() => TransactionCreateOrConnectWithoutCategoryInputSchema).array() ]).optional(),
  createMany: z.lazy(() => TransactionCreateManyCategoryInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => TransactionWhereUniqueInputSchema),z.lazy(() => TransactionWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const TransactionUncheckedCreateNestedManyWithoutCategoryInputSchema: z.ZodType<Prisma.TransactionUncheckedCreateNestedManyWithoutCategoryInput> = z.object({
  create: z.union([ z.lazy(() => TransactionCreateWithoutCategoryInputSchema),z.lazy(() => TransactionCreateWithoutCategoryInputSchema).array(),z.lazy(() => TransactionUncheckedCreateWithoutCategoryInputSchema),z.lazy(() => TransactionUncheckedCreateWithoutCategoryInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => TransactionCreateOrConnectWithoutCategoryInputSchema),z.lazy(() => TransactionCreateOrConnectWithoutCategoryInputSchema).array() ]).optional(),
  createMany: z.lazy(() => TransactionCreateManyCategoryInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => TransactionWhereUniqueInputSchema),z.lazy(() => TransactionWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const StringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.StringFieldUpdateOperationsInput> = z.object({
  set: z.string().optional()
}).strict();

export const NullableStringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableStringFieldUpdateOperationsInput> = z.object({
  set: z.string().optional().nullable()
}).strict();

export const TransactionUpdateManyWithoutCategoryNestedInputSchema: z.ZodType<Prisma.TransactionUpdateManyWithoutCategoryNestedInput> = z.object({
  create: z.union([ z.lazy(() => TransactionCreateWithoutCategoryInputSchema),z.lazy(() => TransactionCreateWithoutCategoryInputSchema).array(),z.lazy(() => TransactionUncheckedCreateWithoutCategoryInputSchema),z.lazy(() => TransactionUncheckedCreateWithoutCategoryInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => TransactionCreateOrConnectWithoutCategoryInputSchema),z.lazy(() => TransactionCreateOrConnectWithoutCategoryInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => TransactionUpsertWithWhereUniqueWithoutCategoryInputSchema),z.lazy(() => TransactionUpsertWithWhereUniqueWithoutCategoryInputSchema).array() ]).optional(),
  createMany: z.lazy(() => TransactionCreateManyCategoryInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => TransactionWhereUniqueInputSchema),z.lazy(() => TransactionWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => TransactionWhereUniqueInputSchema),z.lazy(() => TransactionWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => TransactionWhereUniqueInputSchema),z.lazy(() => TransactionWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => TransactionWhereUniqueInputSchema),z.lazy(() => TransactionWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => TransactionUpdateWithWhereUniqueWithoutCategoryInputSchema),z.lazy(() => TransactionUpdateWithWhereUniqueWithoutCategoryInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => TransactionUpdateManyWithWhereWithoutCategoryInputSchema),z.lazy(() => TransactionUpdateManyWithWhereWithoutCategoryInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => TransactionScalarWhereInputSchema),z.lazy(() => TransactionScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const TransactionUncheckedUpdateManyWithoutCategoryNestedInputSchema: z.ZodType<Prisma.TransactionUncheckedUpdateManyWithoutCategoryNestedInput> = z.object({
  create: z.union([ z.lazy(() => TransactionCreateWithoutCategoryInputSchema),z.lazy(() => TransactionCreateWithoutCategoryInputSchema).array(),z.lazy(() => TransactionUncheckedCreateWithoutCategoryInputSchema),z.lazy(() => TransactionUncheckedCreateWithoutCategoryInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => TransactionCreateOrConnectWithoutCategoryInputSchema),z.lazy(() => TransactionCreateOrConnectWithoutCategoryInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => TransactionUpsertWithWhereUniqueWithoutCategoryInputSchema),z.lazy(() => TransactionUpsertWithWhereUniqueWithoutCategoryInputSchema).array() ]).optional(),
  createMany: z.lazy(() => TransactionCreateManyCategoryInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => TransactionWhereUniqueInputSchema),z.lazy(() => TransactionWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => TransactionWhereUniqueInputSchema),z.lazy(() => TransactionWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => TransactionWhereUniqueInputSchema),z.lazy(() => TransactionWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => TransactionWhereUniqueInputSchema),z.lazy(() => TransactionWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => TransactionUpdateWithWhereUniqueWithoutCategoryInputSchema),z.lazy(() => TransactionUpdateWithWhereUniqueWithoutCategoryInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => TransactionUpdateManyWithWhereWithoutCategoryInputSchema),z.lazy(() => TransactionUpdateManyWithWhereWithoutCategoryInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => TransactionScalarWhereInputSchema),z.lazy(() => TransactionScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const TransactionCreateNestedManyWithoutAccountInputSchema: z.ZodType<Prisma.TransactionCreateNestedManyWithoutAccountInput> = z.object({
  create: z.union([ z.lazy(() => TransactionCreateWithoutAccountInputSchema),z.lazy(() => TransactionCreateWithoutAccountInputSchema).array(),z.lazy(() => TransactionUncheckedCreateWithoutAccountInputSchema),z.lazy(() => TransactionUncheckedCreateWithoutAccountInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => TransactionCreateOrConnectWithoutAccountInputSchema),z.lazy(() => TransactionCreateOrConnectWithoutAccountInputSchema).array() ]).optional(),
  createMany: z.lazy(() => TransactionCreateManyAccountInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => TransactionWhereUniqueInputSchema),z.lazy(() => TransactionWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const InvoicesCreateNestedManyWithoutAccountInputSchema: z.ZodType<Prisma.InvoicesCreateNestedManyWithoutAccountInput> = z.object({
  create: z.union([ z.lazy(() => InvoicesCreateWithoutAccountInputSchema),z.lazy(() => InvoicesCreateWithoutAccountInputSchema).array(),z.lazy(() => InvoicesUncheckedCreateWithoutAccountInputSchema),z.lazy(() => InvoicesUncheckedCreateWithoutAccountInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => InvoicesCreateOrConnectWithoutAccountInputSchema),z.lazy(() => InvoicesCreateOrConnectWithoutAccountInputSchema).array() ]).optional(),
  createMany: z.lazy(() => InvoicesCreateManyAccountInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => InvoicesWhereUniqueInputSchema),z.lazy(() => InvoicesWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const TransactionUncheckedCreateNestedManyWithoutAccountInputSchema: z.ZodType<Prisma.TransactionUncheckedCreateNestedManyWithoutAccountInput> = z.object({
  create: z.union([ z.lazy(() => TransactionCreateWithoutAccountInputSchema),z.lazy(() => TransactionCreateWithoutAccountInputSchema).array(),z.lazy(() => TransactionUncheckedCreateWithoutAccountInputSchema),z.lazy(() => TransactionUncheckedCreateWithoutAccountInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => TransactionCreateOrConnectWithoutAccountInputSchema),z.lazy(() => TransactionCreateOrConnectWithoutAccountInputSchema).array() ]).optional(),
  createMany: z.lazy(() => TransactionCreateManyAccountInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => TransactionWhereUniqueInputSchema),z.lazy(() => TransactionWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const InvoicesUncheckedCreateNestedManyWithoutAccountInputSchema: z.ZodType<Prisma.InvoicesUncheckedCreateNestedManyWithoutAccountInput> = z.object({
  create: z.union([ z.lazy(() => InvoicesCreateWithoutAccountInputSchema),z.lazy(() => InvoicesCreateWithoutAccountInputSchema).array(),z.lazy(() => InvoicesUncheckedCreateWithoutAccountInputSchema),z.lazy(() => InvoicesUncheckedCreateWithoutAccountInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => InvoicesCreateOrConnectWithoutAccountInputSchema),z.lazy(() => InvoicesCreateOrConnectWithoutAccountInputSchema).array() ]).optional(),
  createMany: z.lazy(() => InvoicesCreateManyAccountInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => InvoicesWhereUniqueInputSchema),z.lazy(() => InvoicesWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const NullableIntFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableIntFieldUpdateOperationsInput> = z.object({
  set: z.number().optional().nullable(),
  increment: z.number().optional(),
  decrement: z.number().optional(),
  multiply: z.number().optional(),
  divide: z.number().optional()
}).strict();

export const NullableFloatFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableFloatFieldUpdateOperationsInput> = z.object({
  set: z.number().optional().nullable(),
  increment: z.number().optional(),
  decrement: z.number().optional(),
  multiply: z.number().optional(),
  divide: z.number().optional()
}).strict();

export const NullableDateTimeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableDateTimeFieldUpdateOperationsInput> = z.object({
  set: z.coerce.date().optional().nullable()
}).strict();

export const TransactionUpdateManyWithoutAccountNestedInputSchema: z.ZodType<Prisma.TransactionUpdateManyWithoutAccountNestedInput> = z.object({
  create: z.union([ z.lazy(() => TransactionCreateWithoutAccountInputSchema),z.lazy(() => TransactionCreateWithoutAccountInputSchema).array(),z.lazy(() => TransactionUncheckedCreateWithoutAccountInputSchema),z.lazy(() => TransactionUncheckedCreateWithoutAccountInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => TransactionCreateOrConnectWithoutAccountInputSchema),z.lazy(() => TransactionCreateOrConnectWithoutAccountInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => TransactionUpsertWithWhereUniqueWithoutAccountInputSchema),z.lazy(() => TransactionUpsertWithWhereUniqueWithoutAccountInputSchema).array() ]).optional(),
  createMany: z.lazy(() => TransactionCreateManyAccountInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => TransactionWhereUniqueInputSchema),z.lazy(() => TransactionWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => TransactionWhereUniqueInputSchema),z.lazy(() => TransactionWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => TransactionWhereUniqueInputSchema),z.lazy(() => TransactionWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => TransactionWhereUniqueInputSchema),z.lazy(() => TransactionWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => TransactionUpdateWithWhereUniqueWithoutAccountInputSchema),z.lazy(() => TransactionUpdateWithWhereUniqueWithoutAccountInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => TransactionUpdateManyWithWhereWithoutAccountInputSchema),z.lazy(() => TransactionUpdateManyWithWhereWithoutAccountInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => TransactionScalarWhereInputSchema),z.lazy(() => TransactionScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const InvoicesUpdateManyWithoutAccountNestedInputSchema: z.ZodType<Prisma.InvoicesUpdateManyWithoutAccountNestedInput> = z.object({
  create: z.union([ z.lazy(() => InvoicesCreateWithoutAccountInputSchema),z.lazy(() => InvoicesCreateWithoutAccountInputSchema).array(),z.lazy(() => InvoicesUncheckedCreateWithoutAccountInputSchema),z.lazy(() => InvoicesUncheckedCreateWithoutAccountInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => InvoicesCreateOrConnectWithoutAccountInputSchema),z.lazy(() => InvoicesCreateOrConnectWithoutAccountInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => InvoicesUpsertWithWhereUniqueWithoutAccountInputSchema),z.lazy(() => InvoicesUpsertWithWhereUniqueWithoutAccountInputSchema).array() ]).optional(),
  createMany: z.lazy(() => InvoicesCreateManyAccountInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => InvoicesWhereUniqueInputSchema),z.lazy(() => InvoicesWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => InvoicesWhereUniqueInputSchema),z.lazy(() => InvoicesWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => InvoicesWhereUniqueInputSchema),z.lazy(() => InvoicesWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => InvoicesWhereUniqueInputSchema),z.lazy(() => InvoicesWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => InvoicesUpdateWithWhereUniqueWithoutAccountInputSchema),z.lazy(() => InvoicesUpdateWithWhereUniqueWithoutAccountInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => InvoicesUpdateManyWithWhereWithoutAccountInputSchema),z.lazy(() => InvoicesUpdateManyWithWhereWithoutAccountInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => InvoicesScalarWhereInputSchema),z.lazy(() => InvoicesScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const TransactionUncheckedUpdateManyWithoutAccountNestedInputSchema: z.ZodType<Prisma.TransactionUncheckedUpdateManyWithoutAccountNestedInput> = z.object({
  create: z.union([ z.lazy(() => TransactionCreateWithoutAccountInputSchema),z.lazy(() => TransactionCreateWithoutAccountInputSchema).array(),z.lazy(() => TransactionUncheckedCreateWithoutAccountInputSchema),z.lazy(() => TransactionUncheckedCreateWithoutAccountInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => TransactionCreateOrConnectWithoutAccountInputSchema),z.lazy(() => TransactionCreateOrConnectWithoutAccountInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => TransactionUpsertWithWhereUniqueWithoutAccountInputSchema),z.lazy(() => TransactionUpsertWithWhereUniqueWithoutAccountInputSchema).array() ]).optional(),
  createMany: z.lazy(() => TransactionCreateManyAccountInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => TransactionWhereUniqueInputSchema),z.lazy(() => TransactionWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => TransactionWhereUniqueInputSchema),z.lazy(() => TransactionWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => TransactionWhereUniqueInputSchema),z.lazy(() => TransactionWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => TransactionWhereUniqueInputSchema),z.lazy(() => TransactionWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => TransactionUpdateWithWhereUniqueWithoutAccountInputSchema),z.lazy(() => TransactionUpdateWithWhereUniqueWithoutAccountInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => TransactionUpdateManyWithWhereWithoutAccountInputSchema),z.lazy(() => TransactionUpdateManyWithWhereWithoutAccountInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => TransactionScalarWhereInputSchema),z.lazy(() => TransactionScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const InvoicesUncheckedUpdateManyWithoutAccountNestedInputSchema: z.ZodType<Prisma.InvoicesUncheckedUpdateManyWithoutAccountNestedInput> = z.object({
  create: z.union([ z.lazy(() => InvoicesCreateWithoutAccountInputSchema),z.lazy(() => InvoicesCreateWithoutAccountInputSchema).array(),z.lazy(() => InvoicesUncheckedCreateWithoutAccountInputSchema),z.lazy(() => InvoicesUncheckedCreateWithoutAccountInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => InvoicesCreateOrConnectWithoutAccountInputSchema),z.lazy(() => InvoicesCreateOrConnectWithoutAccountInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => InvoicesUpsertWithWhereUniqueWithoutAccountInputSchema),z.lazy(() => InvoicesUpsertWithWhereUniqueWithoutAccountInputSchema).array() ]).optional(),
  createMany: z.lazy(() => InvoicesCreateManyAccountInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => InvoicesWhereUniqueInputSchema),z.lazy(() => InvoicesWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => InvoicesWhereUniqueInputSchema),z.lazy(() => InvoicesWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => InvoicesWhereUniqueInputSchema),z.lazy(() => InvoicesWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => InvoicesWhereUniqueInputSchema),z.lazy(() => InvoicesWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => InvoicesUpdateWithWhereUniqueWithoutAccountInputSchema),z.lazy(() => InvoicesUpdateWithWhereUniqueWithoutAccountInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => InvoicesUpdateManyWithWhereWithoutAccountInputSchema),z.lazy(() => InvoicesUpdateManyWithWhereWithoutAccountInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => InvoicesScalarWhereInputSchema),z.lazy(() => InvoicesScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const InvoicesCreateNestedOneWithoutTransactionInputSchema: z.ZodType<Prisma.InvoicesCreateNestedOneWithoutTransactionInput> = z.object({
  create: z.union([ z.lazy(() => InvoicesCreateWithoutTransactionInputSchema),z.lazy(() => InvoicesUncheckedCreateWithoutTransactionInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => InvoicesCreateOrConnectWithoutTransactionInputSchema).optional(),
  connect: z.lazy(() => InvoicesWhereUniqueInputSchema).optional()
}).strict();

export const AccountCreateNestedOneWithoutTransactionInputSchema: z.ZodType<Prisma.AccountCreateNestedOneWithoutTransactionInput> = z.object({
  create: z.union([ z.lazy(() => AccountCreateWithoutTransactionInputSchema),z.lazy(() => AccountUncheckedCreateWithoutTransactionInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => AccountCreateOrConnectWithoutTransactionInputSchema).optional(),
  connect: z.lazy(() => AccountWhereUniqueInputSchema).optional()
}).strict();

export const CategoryCreateNestedOneWithoutTransactionInputSchema: z.ZodType<Prisma.CategoryCreateNestedOneWithoutTransactionInput> = z.object({
  create: z.union([ z.lazy(() => CategoryCreateWithoutTransactionInputSchema),z.lazy(() => CategoryUncheckedCreateWithoutTransactionInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => CategoryCreateOrConnectWithoutTransactionInputSchema).optional(),
  connect: z.lazy(() => CategoryWhereUniqueInputSchema).optional()
}).strict();

export const DateTimeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.DateTimeFieldUpdateOperationsInput> = z.object({
  set: z.coerce.date().optional()
}).strict();

export const InvoicesUpdateOneWithoutTransactionNestedInputSchema: z.ZodType<Prisma.InvoicesUpdateOneWithoutTransactionNestedInput> = z.object({
  create: z.union([ z.lazy(() => InvoicesCreateWithoutTransactionInputSchema),z.lazy(() => InvoicesUncheckedCreateWithoutTransactionInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => InvoicesCreateOrConnectWithoutTransactionInputSchema).optional(),
  upsert: z.lazy(() => InvoicesUpsertWithoutTransactionInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => InvoicesWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => InvoicesWhereInputSchema) ]).optional(),
  connect: z.lazy(() => InvoicesWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => InvoicesUpdateToOneWithWhereWithoutTransactionInputSchema),z.lazy(() => InvoicesUpdateWithoutTransactionInputSchema),z.lazy(() => InvoicesUncheckedUpdateWithoutTransactionInputSchema) ]).optional(),
}).strict();

export const AccountUpdateOneRequiredWithoutTransactionNestedInputSchema: z.ZodType<Prisma.AccountUpdateOneRequiredWithoutTransactionNestedInput> = z.object({
  create: z.union([ z.lazy(() => AccountCreateWithoutTransactionInputSchema),z.lazy(() => AccountUncheckedCreateWithoutTransactionInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => AccountCreateOrConnectWithoutTransactionInputSchema).optional(),
  upsert: z.lazy(() => AccountUpsertWithoutTransactionInputSchema).optional(),
  connect: z.lazy(() => AccountWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => AccountUpdateToOneWithWhereWithoutTransactionInputSchema),z.lazy(() => AccountUpdateWithoutTransactionInputSchema),z.lazy(() => AccountUncheckedUpdateWithoutTransactionInputSchema) ]).optional(),
}).strict();

export const CategoryUpdateOneWithoutTransactionNestedInputSchema: z.ZodType<Prisma.CategoryUpdateOneWithoutTransactionNestedInput> = z.object({
  create: z.union([ z.lazy(() => CategoryCreateWithoutTransactionInputSchema),z.lazy(() => CategoryUncheckedCreateWithoutTransactionInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => CategoryCreateOrConnectWithoutTransactionInputSchema).optional(),
  upsert: z.lazy(() => CategoryUpsertWithoutTransactionInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => CategoryWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => CategoryWhereInputSchema) ]).optional(),
  connect: z.lazy(() => CategoryWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => CategoryUpdateToOneWithWhereWithoutTransactionInputSchema),z.lazy(() => CategoryUpdateWithoutTransactionInputSchema),z.lazy(() => CategoryUncheckedUpdateWithoutTransactionInputSchema) ]).optional(),
}).strict();

export const NullableBoolFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableBoolFieldUpdateOperationsInput> = z.object({
  set: z.boolean().optional().nullable()
}).strict();

export const AccountCreateNestedOneWithoutInvoicesInputSchema: z.ZodType<Prisma.AccountCreateNestedOneWithoutInvoicesInput> = z.object({
  create: z.union([ z.lazy(() => AccountCreateWithoutInvoicesInputSchema),z.lazy(() => AccountUncheckedCreateWithoutInvoicesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => AccountCreateOrConnectWithoutInvoicesInputSchema).optional(),
  connect: z.lazy(() => AccountWhereUniqueInputSchema).optional()
}).strict();

export const TransactionCreateNestedManyWithoutInvoiceInputSchema: z.ZodType<Prisma.TransactionCreateNestedManyWithoutInvoiceInput> = z.object({
  create: z.union([ z.lazy(() => TransactionCreateWithoutInvoiceInputSchema),z.lazy(() => TransactionCreateWithoutInvoiceInputSchema).array(),z.lazy(() => TransactionUncheckedCreateWithoutInvoiceInputSchema),z.lazy(() => TransactionUncheckedCreateWithoutInvoiceInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => TransactionCreateOrConnectWithoutInvoiceInputSchema),z.lazy(() => TransactionCreateOrConnectWithoutInvoiceInputSchema).array() ]).optional(),
  createMany: z.lazy(() => TransactionCreateManyInvoiceInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => TransactionWhereUniqueInputSchema),z.lazy(() => TransactionWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const TransactionUncheckedCreateNestedManyWithoutInvoiceInputSchema: z.ZodType<Prisma.TransactionUncheckedCreateNestedManyWithoutInvoiceInput> = z.object({
  create: z.union([ z.lazy(() => TransactionCreateWithoutInvoiceInputSchema),z.lazy(() => TransactionCreateWithoutInvoiceInputSchema).array(),z.lazy(() => TransactionUncheckedCreateWithoutInvoiceInputSchema),z.lazy(() => TransactionUncheckedCreateWithoutInvoiceInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => TransactionCreateOrConnectWithoutInvoiceInputSchema),z.lazy(() => TransactionCreateOrConnectWithoutInvoiceInputSchema).array() ]).optional(),
  createMany: z.lazy(() => TransactionCreateManyInvoiceInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => TransactionWhereUniqueInputSchema),z.lazy(() => TransactionWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const FloatFieldUpdateOperationsInputSchema: z.ZodType<Prisma.FloatFieldUpdateOperationsInput> = z.object({
  set: z.number().optional(),
  increment: z.number().optional(),
  decrement: z.number().optional(),
  multiply: z.number().optional(),
  divide: z.number().optional()
}).strict();

export const IntFieldUpdateOperationsInputSchema: z.ZodType<Prisma.IntFieldUpdateOperationsInput> = z.object({
  set: z.number().optional(),
  increment: z.number().optional(),
  decrement: z.number().optional(),
  multiply: z.number().optional(),
  divide: z.number().optional()
}).strict();

export const AccountUpdateOneRequiredWithoutInvoicesNestedInputSchema: z.ZodType<Prisma.AccountUpdateOneRequiredWithoutInvoicesNestedInput> = z.object({
  create: z.union([ z.lazy(() => AccountCreateWithoutInvoicesInputSchema),z.lazy(() => AccountUncheckedCreateWithoutInvoicesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => AccountCreateOrConnectWithoutInvoicesInputSchema).optional(),
  upsert: z.lazy(() => AccountUpsertWithoutInvoicesInputSchema).optional(),
  connect: z.lazy(() => AccountWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => AccountUpdateToOneWithWhereWithoutInvoicesInputSchema),z.lazy(() => AccountUpdateWithoutInvoicesInputSchema),z.lazy(() => AccountUncheckedUpdateWithoutInvoicesInputSchema) ]).optional(),
}).strict();

export const TransactionUpdateManyWithoutInvoiceNestedInputSchema: z.ZodType<Prisma.TransactionUpdateManyWithoutInvoiceNestedInput> = z.object({
  create: z.union([ z.lazy(() => TransactionCreateWithoutInvoiceInputSchema),z.lazy(() => TransactionCreateWithoutInvoiceInputSchema).array(),z.lazy(() => TransactionUncheckedCreateWithoutInvoiceInputSchema),z.lazy(() => TransactionUncheckedCreateWithoutInvoiceInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => TransactionCreateOrConnectWithoutInvoiceInputSchema),z.lazy(() => TransactionCreateOrConnectWithoutInvoiceInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => TransactionUpsertWithWhereUniqueWithoutInvoiceInputSchema),z.lazy(() => TransactionUpsertWithWhereUniqueWithoutInvoiceInputSchema).array() ]).optional(),
  createMany: z.lazy(() => TransactionCreateManyInvoiceInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => TransactionWhereUniqueInputSchema),z.lazy(() => TransactionWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => TransactionWhereUniqueInputSchema),z.lazy(() => TransactionWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => TransactionWhereUniqueInputSchema),z.lazy(() => TransactionWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => TransactionWhereUniqueInputSchema),z.lazy(() => TransactionWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => TransactionUpdateWithWhereUniqueWithoutInvoiceInputSchema),z.lazy(() => TransactionUpdateWithWhereUniqueWithoutInvoiceInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => TransactionUpdateManyWithWhereWithoutInvoiceInputSchema),z.lazy(() => TransactionUpdateManyWithWhereWithoutInvoiceInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => TransactionScalarWhereInputSchema),z.lazy(() => TransactionScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const TransactionUncheckedUpdateManyWithoutInvoiceNestedInputSchema: z.ZodType<Prisma.TransactionUncheckedUpdateManyWithoutInvoiceNestedInput> = z.object({
  create: z.union([ z.lazy(() => TransactionCreateWithoutInvoiceInputSchema),z.lazy(() => TransactionCreateWithoutInvoiceInputSchema).array(),z.lazy(() => TransactionUncheckedCreateWithoutInvoiceInputSchema),z.lazy(() => TransactionUncheckedCreateWithoutInvoiceInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => TransactionCreateOrConnectWithoutInvoiceInputSchema),z.lazy(() => TransactionCreateOrConnectWithoutInvoiceInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => TransactionUpsertWithWhereUniqueWithoutInvoiceInputSchema),z.lazy(() => TransactionUpsertWithWhereUniqueWithoutInvoiceInputSchema).array() ]).optional(),
  createMany: z.lazy(() => TransactionCreateManyInvoiceInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => TransactionWhereUniqueInputSchema),z.lazy(() => TransactionWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => TransactionWhereUniqueInputSchema),z.lazy(() => TransactionWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => TransactionWhereUniqueInputSchema),z.lazy(() => TransactionWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => TransactionWhereUniqueInputSchema),z.lazy(() => TransactionWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => TransactionUpdateWithWhereUniqueWithoutInvoiceInputSchema),z.lazy(() => TransactionUpdateWithWhereUniqueWithoutInvoiceInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => TransactionUpdateManyWithWhereWithoutInvoiceInputSchema),z.lazy(() => TransactionUpdateManyWithWhereWithoutInvoiceInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => TransactionScalarWhereInputSchema),z.lazy(() => TransactionScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const NestedStringFilterSchema: z.ZodType<Prisma.NestedStringFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringFilterSchema) ]).optional(),
}).strict();

export const NestedStringNullableFilterSchema: z.ZodType<Prisma.NestedStringNullableFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedStringWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringWithAggregatesFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional()
}).strict();

export const NestedIntFilterSchema: z.ZodType<Prisma.NestedIntFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntFilterSchema) ]).optional(),
}).strict();

export const NestedStringNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringNullableWithAggregatesFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedStringNullableFilterSchema).optional()
}).strict();

export const NestedIntNullableFilterSchema: z.ZodType<Prisma.NestedIntNullableFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedFloatNullableFilterSchema: z.ZodType<Prisma.NestedFloatNullableFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedDateTimeNullableFilterSchema: z.ZodType<Prisma.NestedDateTimeNullableFilter> = z.object({
  equals: z.coerce.date().optional().nullable(),
  in: z.coerce.date().array().optional().nullable(),
  notIn: z.coerce.date().array().optional().nullable(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedIntNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedIntNullableWithAggregatesFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedIntNullableFilterSchema).optional()
}).strict();

export const NestedFloatNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedFloatNullableWithAggregatesFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _sum: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedFloatNullableFilterSchema).optional()
}).strict();

export const NestedDateTimeNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedDateTimeNullableWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional().nullable(),
  in: z.coerce.date().array().optional().nullable(),
  notIn: z.coerce.date().array().optional().nullable(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeNullableFilterSchema).optional()
}).strict();

export const NestedDateTimeFilterSchema: z.ZodType<Prisma.NestedDateTimeFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeFilterSchema) ]).optional(),
}).strict();

export const NestedDateTimeWithAggregatesFilterSchema: z.ZodType<Prisma.NestedDateTimeWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeFilterSchema).optional()
}).strict();

export const NestedBoolNullableFilterSchema: z.ZodType<Prisma.NestedBoolNullableFilter> = z.object({
  equals: z.boolean().optional().nullable(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedBoolNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedBoolNullableWithAggregatesFilter> = z.object({
  equals: z.boolean().optional().nullable(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedBoolNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedBoolNullableFilterSchema).optional()
}).strict();

export const NestedFloatFilterSchema: z.ZodType<Prisma.NestedFloatFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatFilterSchema) ]).optional(),
}).strict();

export const NestedFloatWithAggregatesFilterSchema: z.ZodType<Prisma.NestedFloatWithAggregatesFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedFloatFilterSchema).optional(),
  _min: z.lazy(() => NestedFloatFilterSchema).optional(),
  _max: z.lazy(() => NestedFloatFilterSchema).optional()
}).strict();

export const NestedIntWithAggregatesFilterSchema: z.ZodType<Prisma.NestedIntWithAggregatesFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedIntFilterSchema).optional(),
  _max: z.lazy(() => NestedIntFilterSchema).optional()
}).strict();

export const TransactionCreateWithoutCategoryInputSchema: z.ZodType<Prisma.TransactionCreateWithoutCategoryInput> = z.object({
  id: z.string(),
  date: z.coerce.date(),
  description: z.string(),
  amount: z.string(),
  type: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  invoice: z.lazy(() => InvoicesCreateNestedOneWithoutTransactionInputSchema).optional(),
  account: z.lazy(() => AccountCreateNestedOneWithoutTransactionInputSchema)
}).strict();

export const TransactionUncheckedCreateWithoutCategoryInputSchema: z.ZodType<Prisma.TransactionUncheckedCreateWithoutCategoryInput> = z.object({
  id: z.string(),
  date: z.coerce.date(),
  description: z.string(),
  amount: z.string(),
  type: z.string().optional().nullable(),
  invoiceId: z.string().optional().nullable(),
  accountId: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const TransactionCreateOrConnectWithoutCategoryInputSchema: z.ZodType<Prisma.TransactionCreateOrConnectWithoutCategoryInput> = z.object({
  where: z.lazy(() => TransactionWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => TransactionCreateWithoutCategoryInputSchema),z.lazy(() => TransactionUncheckedCreateWithoutCategoryInputSchema) ]),
}).strict();

export const TransactionCreateManyCategoryInputEnvelopeSchema: z.ZodType<Prisma.TransactionCreateManyCategoryInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => TransactionCreateManyCategoryInputSchema),z.lazy(() => TransactionCreateManyCategoryInputSchema).array() ]),
}).strict();

export const TransactionUpsertWithWhereUniqueWithoutCategoryInputSchema: z.ZodType<Prisma.TransactionUpsertWithWhereUniqueWithoutCategoryInput> = z.object({
  where: z.lazy(() => TransactionWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => TransactionUpdateWithoutCategoryInputSchema),z.lazy(() => TransactionUncheckedUpdateWithoutCategoryInputSchema) ]),
  create: z.union([ z.lazy(() => TransactionCreateWithoutCategoryInputSchema),z.lazy(() => TransactionUncheckedCreateWithoutCategoryInputSchema) ]),
}).strict();

export const TransactionUpdateWithWhereUniqueWithoutCategoryInputSchema: z.ZodType<Prisma.TransactionUpdateWithWhereUniqueWithoutCategoryInput> = z.object({
  where: z.lazy(() => TransactionWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => TransactionUpdateWithoutCategoryInputSchema),z.lazy(() => TransactionUncheckedUpdateWithoutCategoryInputSchema) ]),
}).strict();

export const TransactionUpdateManyWithWhereWithoutCategoryInputSchema: z.ZodType<Prisma.TransactionUpdateManyWithWhereWithoutCategoryInput> = z.object({
  where: z.lazy(() => TransactionScalarWhereInputSchema),
  data: z.union([ z.lazy(() => TransactionUpdateManyMutationInputSchema),z.lazy(() => TransactionUncheckedUpdateManyWithoutCategoryInputSchema) ]),
}).strict();

export const TransactionScalarWhereInputSchema: z.ZodType<Prisma.TransactionScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => TransactionScalarWhereInputSchema),z.lazy(() => TransactionScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => TransactionScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => TransactionScalarWhereInputSchema),z.lazy(() => TransactionScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  date: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  description: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  amount: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  type: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  invoiceId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  accountId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  categoryId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const TransactionCreateWithoutAccountInputSchema: z.ZodType<Prisma.TransactionCreateWithoutAccountInput> = z.object({
  id: z.string(),
  date: z.coerce.date(),
  description: z.string(),
  amount: z.string(),
  type: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  invoice: z.lazy(() => InvoicesCreateNestedOneWithoutTransactionInputSchema).optional(),
  category: z.lazy(() => CategoryCreateNestedOneWithoutTransactionInputSchema).optional()
}).strict();

export const TransactionUncheckedCreateWithoutAccountInputSchema: z.ZodType<Prisma.TransactionUncheckedCreateWithoutAccountInput> = z.object({
  id: z.string(),
  date: z.coerce.date(),
  description: z.string(),
  amount: z.string(),
  type: z.string().optional().nullable(),
  invoiceId: z.string().optional().nullable(),
  categoryId: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const TransactionCreateOrConnectWithoutAccountInputSchema: z.ZodType<Prisma.TransactionCreateOrConnectWithoutAccountInput> = z.object({
  where: z.lazy(() => TransactionWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => TransactionCreateWithoutAccountInputSchema),z.lazy(() => TransactionUncheckedCreateWithoutAccountInputSchema) ]),
}).strict();

export const TransactionCreateManyAccountInputEnvelopeSchema: z.ZodType<Prisma.TransactionCreateManyAccountInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => TransactionCreateManyAccountInputSchema),z.lazy(() => TransactionCreateManyAccountInputSchema).array() ]),
}).strict();

export const InvoicesCreateWithoutAccountInputSchema: z.ZodType<Prisma.InvoicesCreateWithoutAccountInput> = z.object({
  id: z.string().uuid().optional(),
  amount: z.number(),
  month: z.number().int(),
  year: z.number().int(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  Transaction: z.lazy(() => TransactionCreateNestedManyWithoutInvoiceInputSchema).optional()
}).strict();

export const InvoicesUncheckedCreateWithoutAccountInputSchema: z.ZodType<Prisma.InvoicesUncheckedCreateWithoutAccountInput> = z.object({
  id: z.string().uuid().optional(),
  amount: z.number(),
  month: z.number().int(),
  year: z.number().int(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  Transaction: z.lazy(() => TransactionUncheckedCreateNestedManyWithoutInvoiceInputSchema).optional()
}).strict();

export const InvoicesCreateOrConnectWithoutAccountInputSchema: z.ZodType<Prisma.InvoicesCreateOrConnectWithoutAccountInput> = z.object({
  where: z.lazy(() => InvoicesWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => InvoicesCreateWithoutAccountInputSchema),z.lazy(() => InvoicesUncheckedCreateWithoutAccountInputSchema) ]),
}).strict();

export const InvoicesCreateManyAccountInputEnvelopeSchema: z.ZodType<Prisma.InvoicesCreateManyAccountInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => InvoicesCreateManyAccountInputSchema),z.lazy(() => InvoicesCreateManyAccountInputSchema).array() ]),
}).strict();

export const TransactionUpsertWithWhereUniqueWithoutAccountInputSchema: z.ZodType<Prisma.TransactionUpsertWithWhereUniqueWithoutAccountInput> = z.object({
  where: z.lazy(() => TransactionWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => TransactionUpdateWithoutAccountInputSchema),z.lazy(() => TransactionUncheckedUpdateWithoutAccountInputSchema) ]),
  create: z.union([ z.lazy(() => TransactionCreateWithoutAccountInputSchema),z.lazy(() => TransactionUncheckedCreateWithoutAccountInputSchema) ]),
}).strict();

export const TransactionUpdateWithWhereUniqueWithoutAccountInputSchema: z.ZodType<Prisma.TransactionUpdateWithWhereUniqueWithoutAccountInput> = z.object({
  where: z.lazy(() => TransactionWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => TransactionUpdateWithoutAccountInputSchema),z.lazy(() => TransactionUncheckedUpdateWithoutAccountInputSchema) ]),
}).strict();

export const TransactionUpdateManyWithWhereWithoutAccountInputSchema: z.ZodType<Prisma.TransactionUpdateManyWithWhereWithoutAccountInput> = z.object({
  where: z.lazy(() => TransactionScalarWhereInputSchema),
  data: z.union([ z.lazy(() => TransactionUpdateManyMutationInputSchema),z.lazy(() => TransactionUncheckedUpdateManyWithoutAccountInputSchema) ]),
}).strict();

export const InvoicesUpsertWithWhereUniqueWithoutAccountInputSchema: z.ZodType<Prisma.InvoicesUpsertWithWhereUniqueWithoutAccountInput> = z.object({
  where: z.lazy(() => InvoicesWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => InvoicesUpdateWithoutAccountInputSchema),z.lazy(() => InvoicesUncheckedUpdateWithoutAccountInputSchema) ]),
  create: z.union([ z.lazy(() => InvoicesCreateWithoutAccountInputSchema),z.lazy(() => InvoicesUncheckedCreateWithoutAccountInputSchema) ]),
}).strict();

export const InvoicesUpdateWithWhereUniqueWithoutAccountInputSchema: z.ZodType<Prisma.InvoicesUpdateWithWhereUniqueWithoutAccountInput> = z.object({
  where: z.lazy(() => InvoicesWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => InvoicesUpdateWithoutAccountInputSchema),z.lazy(() => InvoicesUncheckedUpdateWithoutAccountInputSchema) ]),
}).strict();

export const InvoicesUpdateManyWithWhereWithoutAccountInputSchema: z.ZodType<Prisma.InvoicesUpdateManyWithWhereWithoutAccountInput> = z.object({
  where: z.lazy(() => InvoicesScalarWhereInputSchema),
  data: z.union([ z.lazy(() => InvoicesUpdateManyMutationInputSchema),z.lazy(() => InvoicesUncheckedUpdateManyWithoutAccountInputSchema) ]),
}).strict();

export const InvoicesScalarWhereInputSchema: z.ZodType<Prisma.InvoicesScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => InvoicesScalarWhereInputSchema),z.lazy(() => InvoicesScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => InvoicesScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => InvoicesScalarWhereInputSchema),z.lazy(() => InvoicesScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  amount: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  month: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  year: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  accountId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const InvoicesCreateWithoutTransactionInputSchema: z.ZodType<Prisma.InvoicesCreateWithoutTransactionInput> = z.object({
  id: z.string().uuid().optional(),
  amount: z.number(),
  month: z.number().int(),
  year: z.number().int(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  account: z.lazy(() => AccountCreateNestedOneWithoutInvoicesInputSchema)
}).strict();

export const InvoicesUncheckedCreateWithoutTransactionInputSchema: z.ZodType<Prisma.InvoicesUncheckedCreateWithoutTransactionInput> = z.object({
  id: z.string().uuid().optional(),
  amount: z.number(),
  month: z.number().int(),
  year: z.number().int(),
  accountId: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const InvoicesCreateOrConnectWithoutTransactionInputSchema: z.ZodType<Prisma.InvoicesCreateOrConnectWithoutTransactionInput> = z.object({
  where: z.lazy(() => InvoicesWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => InvoicesCreateWithoutTransactionInputSchema),z.lazy(() => InvoicesUncheckedCreateWithoutTransactionInputSchema) ]),
}).strict();

export const AccountCreateWithoutTransactionInputSchema: z.ZodType<Prisma.AccountCreateWithoutTransactionInput> = z.object({
  id: z.string(),
  itemId: z.string(),
  name: z.string().optional().nullable(),
  finalNumber: z.number().int().optional().nullable(),
  balance: z.number().optional().nullable(),
  availableCreditLimit: z.number().optional().nullable(),
  balanceCloseDate: z.coerce.date().optional().nullable(),
  balanceDueDate: z.coerce.date().optional().nullable(),
  brand: z.string().optional().nullable(),
  creditLimit: z.number().optional().nullable(),
  Invoices: z.lazy(() => InvoicesCreateNestedManyWithoutAccountInputSchema).optional()
}).strict();

export const AccountUncheckedCreateWithoutTransactionInputSchema: z.ZodType<Prisma.AccountUncheckedCreateWithoutTransactionInput> = z.object({
  id: z.string(),
  itemId: z.string(),
  name: z.string().optional().nullable(),
  finalNumber: z.number().int().optional().nullable(),
  balance: z.number().optional().nullable(),
  availableCreditLimit: z.number().optional().nullable(),
  balanceCloseDate: z.coerce.date().optional().nullable(),
  balanceDueDate: z.coerce.date().optional().nullable(),
  brand: z.string().optional().nullable(),
  creditLimit: z.number().optional().nullable(),
  Invoices: z.lazy(() => InvoicesUncheckedCreateNestedManyWithoutAccountInputSchema).optional()
}).strict();

export const AccountCreateOrConnectWithoutTransactionInputSchema: z.ZodType<Prisma.AccountCreateOrConnectWithoutTransactionInput> = z.object({
  where: z.lazy(() => AccountWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => AccountCreateWithoutTransactionInputSchema),z.lazy(() => AccountUncheckedCreateWithoutTransactionInputSchema) ]),
}).strict();

export const CategoryCreateWithoutTransactionInputSchema: z.ZodType<Prisma.CategoryCreateWithoutTransactionInput> = z.object({
  id: z.string(),
  description: z.string(),
  descriptionTranslated: z.string().optional().nullable(),
  parentId: z.string().optional().nullable(),
  parentDescription: z.string().optional().nullable()
}).strict();

export const CategoryUncheckedCreateWithoutTransactionInputSchema: z.ZodType<Prisma.CategoryUncheckedCreateWithoutTransactionInput> = z.object({
  id: z.string(),
  description: z.string(),
  descriptionTranslated: z.string().optional().nullable(),
  parentId: z.string().optional().nullable(),
  parentDescription: z.string().optional().nullable()
}).strict();

export const CategoryCreateOrConnectWithoutTransactionInputSchema: z.ZodType<Prisma.CategoryCreateOrConnectWithoutTransactionInput> = z.object({
  where: z.lazy(() => CategoryWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => CategoryCreateWithoutTransactionInputSchema),z.lazy(() => CategoryUncheckedCreateWithoutTransactionInputSchema) ]),
}).strict();

export const InvoicesUpsertWithoutTransactionInputSchema: z.ZodType<Prisma.InvoicesUpsertWithoutTransactionInput> = z.object({
  update: z.union([ z.lazy(() => InvoicesUpdateWithoutTransactionInputSchema),z.lazy(() => InvoicesUncheckedUpdateWithoutTransactionInputSchema) ]),
  create: z.union([ z.lazy(() => InvoicesCreateWithoutTransactionInputSchema),z.lazy(() => InvoicesUncheckedCreateWithoutTransactionInputSchema) ]),
  where: z.lazy(() => InvoicesWhereInputSchema).optional()
}).strict();

export const InvoicesUpdateToOneWithWhereWithoutTransactionInputSchema: z.ZodType<Prisma.InvoicesUpdateToOneWithWhereWithoutTransactionInput> = z.object({
  where: z.lazy(() => InvoicesWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => InvoicesUpdateWithoutTransactionInputSchema),z.lazy(() => InvoicesUncheckedUpdateWithoutTransactionInputSchema) ]),
}).strict();

export const InvoicesUpdateWithoutTransactionInputSchema: z.ZodType<Prisma.InvoicesUpdateWithoutTransactionInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  amount: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  month: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  year: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  account: z.lazy(() => AccountUpdateOneRequiredWithoutInvoicesNestedInputSchema).optional()
}).strict();

export const InvoicesUncheckedUpdateWithoutTransactionInputSchema: z.ZodType<Prisma.InvoicesUncheckedUpdateWithoutTransactionInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  amount: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  month: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  year: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  accountId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const AccountUpsertWithoutTransactionInputSchema: z.ZodType<Prisma.AccountUpsertWithoutTransactionInput> = z.object({
  update: z.union([ z.lazy(() => AccountUpdateWithoutTransactionInputSchema),z.lazy(() => AccountUncheckedUpdateWithoutTransactionInputSchema) ]),
  create: z.union([ z.lazy(() => AccountCreateWithoutTransactionInputSchema),z.lazy(() => AccountUncheckedCreateWithoutTransactionInputSchema) ]),
  where: z.lazy(() => AccountWhereInputSchema).optional()
}).strict();

export const AccountUpdateToOneWithWhereWithoutTransactionInputSchema: z.ZodType<Prisma.AccountUpdateToOneWithWhereWithoutTransactionInput> = z.object({
  where: z.lazy(() => AccountWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => AccountUpdateWithoutTransactionInputSchema),z.lazy(() => AccountUncheckedUpdateWithoutTransactionInputSchema) ]),
}).strict();

export const AccountUpdateWithoutTransactionInputSchema: z.ZodType<Prisma.AccountUpdateWithoutTransactionInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  itemId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  finalNumber: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  balance: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  availableCreditLimit: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  balanceCloseDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  balanceDueDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  brand: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  creditLimit: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  Invoices: z.lazy(() => InvoicesUpdateManyWithoutAccountNestedInputSchema).optional()
}).strict();

export const AccountUncheckedUpdateWithoutTransactionInputSchema: z.ZodType<Prisma.AccountUncheckedUpdateWithoutTransactionInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  itemId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  finalNumber: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  balance: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  availableCreditLimit: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  balanceCloseDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  balanceDueDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  brand: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  creditLimit: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  Invoices: z.lazy(() => InvoicesUncheckedUpdateManyWithoutAccountNestedInputSchema).optional()
}).strict();

export const CategoryUpsertWithoutTransactionInputSchema: z.ZodType<Prisma.CategoryUpsertWithoutTransactionInput> = z.object({
  update: z.union([ z.lazy(() => CategoryUpdateWithoutTransactionInputSchema),z.lazy(() => CategoryUncheckedUpdateWithoutTransactionInputSchema) ]),
  create: z.union([ z.lazy(() => CategoryCreateWithoutTransactionInputSchema),z.lazy(() => CategoryUncheckedCreateWithoutTransactionInputSchema) ]),
  where: z.lazy(() => CategoryWhereInputSchema).optional()
}).strict();

export const CategoryUpdateToOneWithWhereWithoutTransactionInputSchema: z.ZodType<Prisma.CategoryUpdateToOneWithWhereWithoutTransactionInput> = z.object({
  where: z.lazy(() => CategoryWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => CategoryUpdateWithoutTransactionInputSchema),z.lazy(() => CategoryUncheckedUpdateWithoutTransactionInputSchema) ]),
}).strict();

export const CategoryUpdateWithoutTransactionInputSchema: z.ZodType<Prisma.CategoryUpdateWithoutTransactionInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  descriptionTranslated: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  parentId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  parentDescription: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const CategoryUncheckedUpdateWithoutTransactionInputSchema: z.ZodType<Prisma.CategoryUncheckedUpdateWithoutTransactionInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  descriptionTranslated: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  parentId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  parentDescription: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const AccountCreateWithoutInvoicesInputSchema: z.ZodType<Prisma.AccountCreateWithoutInvoicesInput> = z.object({
  id: z.string(),
  itemId: z.string(),
  name: z.string().optional().nullable(),
  finalNumber: z.number().int().optional().nullable(),
  balance: z.number().optional().nullable(),
  availableCreditLimit: z.number().optional().nullable(),
  balanceCloseDate: z.coerce.date().optional().nullable(),
  balanceDueDate: z.coerce.date().optional().nullable(),
  brand: z.string().optional().nullable(),
  creditLimit: z.number().optional().nullable(),
  Transaction: z.lazy(() => TransactionCreateNestedManyWithoutAccountInputSchema).optional()
}).strict();

export const AccountUncheckedCreateWithoutInvoicesInputSchema: z.ZodType<Prisma.AccountUncheckedCreateWithoutInvoicesInput> = z.object({
  id: z.string(),
  itemId: z.string(),
  name: z.string().optional().nullable(),
  finalNumber: z.number().int().optional().nullable(),
  balance: z.number().optional().nullable(),
  availableCreditLimit: z.number().optional().nullable(),
  balanceCloseDate: z.coerce.date().optional().nullable(),
  balanceDueDate: z.coerce.date().optional().nullable(),
  brand: z.string().optional().nullable(),
  creditLimit: z.number().optional().nullable(),
  Transaction: z.lazy(() => TransactionUncheckedCreateNestedManyWithoutAccountInputSchema).optional()
}).strict();

export const AccountCreateOrConnectWithoutInvoicesInputSchema: z.ZodType<Prisma.AccountCreateOrConnectWithoutInvoicesInput> = z.object({
  where: z.lazy(() => AccountWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => AccountCreateWithoutInvoicesInputSchema),z.lazy(() => AccountUncheckedCreateWithoutInvoicesInputSchema) ]),
}).strict();

export const TransactionCreateWithoutInvoiceInputSchema: z.ZodType<Prisma.TransactionCreateWithoutInvoiceInput> = z.object({
  id: z.string(),
  date: z.coerce.date(),
  description: z.string(),
  amount: z.string(),
  type: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  account: z.lazy(() => AccountCreateNestedOneWithoutTransactionInputSchema),
  category: z.lazy(() => CategoryCreateNestedOneWithoutTransactionInputSchema).optional()
}).strict();

export const TransactionUncheckedCreateWithoutInvoiceInputSchema: z.ZodType<Prisma.TransactionUncheckedCreateWithoutInvoiceInput> = z.object({
  id: z.string(),
  date: z.coerce.date(),
  description: z.string(),
  amount: z.string(),
  type: z.string().optional().nullable(),
  accountId: z.string(),
  categoryId: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const TransactionCreateOrConnectWithoutInvoiceInputSchema: z.ZodType<Prisma.TransactionCreateOrConnectWithoutInvoiceInput> = z.object({
  where: z.lazy(() => TransactionWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => TransactionCreateWithoutInvoiceInputSchema),z.lazy(() => TransactionUncheckedCreateWithoutInvoiceInputSchema) ]),
}).strict();

export const TransactionCreateManyInvoiceInputEnvelopeSchema: z.ZodType<Prisma.TransactionCreateManyInvoiceInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => TransactionCreateManyInvoiceInputSchema),z.lazy(() => TransactionCreateManyInvoiceInputSchema).array() ]),
}).strict();

export const AccountUpsertWithoutInvoicesInputSchema: z.ZodType<Prisma.AccountUpsertWithoutInvoicesInput> = z.object({
  update: z.union([ z.lazy(() => AccountUpdateWithoutInvoicesInputSchema),z.lazy(() => AccountUncheckedUpdateWithoutInvoicesInputSchema) ]),
  create: z.union([ z.lazy(() => AccountCreateWithoutInvoicesInputSchema),z.lazy(() => AccountUncheckedCreateWithoutInvoicesInputSchema) ]),
  where: z.lazy(() => AccountWhereInputSchema).optional()
}).strict();

export const AccountUpdateToOneWithWhereWithoutInvoicesInputSchema: z.ZodType<Prisma.AccountUpdateToOneWithWhereWithoutInvoicesInput> = z.object({
  where: z.lazy(() => AccountWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => AccountUpdateWithoutInvoicesInputSchema),z.lazy(() => AccountUncheckedUpdateWithoutInvoicesInputSchema) ]),
}).strict();

export const AccountUpdateWithoutInvoicesInputSchema: z.ZodType<Prisma.AccountUpdateWithoutInvoicesInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  itemId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  finalNumber: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  balance: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  availableCreditLimit: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  balanceCloseDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  balanceDueDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  brand: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  creditLimit: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  Transaction: z.lazy(() => TransactionUpdateManyWithoutAccountNestedInputSchema).optional()
}).strict();

export const AccountUncheckedUpdateWithoutInvoicesInputSchema: z.ZodType<Prisma.AccountUncheckedUpdateWithoutInvoicesInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  itemId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  finalNumber: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  balance: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  availableCreditLimit: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  balanceCloseDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  balanceDueDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  brand: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  creditLimit: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  Transaction: z.lazy(() => TransactionUncheckedUpdateManyWithoutAccountNestedInputSchema).optional()
}).strict();

export const TransactionUpsertWithWhereUniqueWithoutInvoiceInputSchema: z.ZodType<Prisma.TransactionUpsertWithWhereUniqueWithoutInvoiceInput> = z.object({
  where: z.lazy(() => TransactionWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => TransactionUpdateWithoutInvoiceInputSchema),z.lazy(() => TransactionUncheckedUpdateWithoutInvoiceInputSchema) ]),
  create: z.union([ z.lazy(() => TransactionCreateWithoutInvoiceInputSchema),z.lazy(() => TransactionUncheckedCreateWithoutInvoiceInputSchema) ]),
}).strict();

export const TransactionUpdateWithWhereUniqueWithoutInvoiceInputSchema: z.ZodType<Prisma.TransactionUpdateWithWhereUniqueWithoutInvoiceInput> = z.object({
  where: z.lazy(() => TransactionWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => TransactionUpdateWithoutInvoiceInputSchema),z.lazy(() => TransactionUncheckedUpdateWithoutInvoiceInputSchema) ]),
}).strict();

export const TransactionUpdateManyWithWhereWithoutInvoiceInputSchema: z.ZodType<Prisma.TransactionUpdateManyWithWhereWithoutInvoiceInput> = z.object({
  where: z.lazy(() => TransactionScalarWhereInputSchema),
  data: z.union([ z.lazy(() => TransactionUpdateManyMutationInputSchema),z.lazy(() => TransactionUncheckedUpdateManyWithoutInvoiceInputSchema) ]),
}).strict();

export const TransactionCreateManyCategoryInputSchema: z.ZodType<Prisma.TransactionCreateManyCategoryInput> = z.object({
  id: z.string(),
  date: z.coerce.date(),
  description: z.string(),
  amount: z.string(),
  type: z.string().optional().nullable(),
  invoiceId: z.string().optional().nullable(),
  accountId: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const TransactionUpdateWithoutCategoryInputSchema: z.ZodType<Prisma.TransactionUpdateWithoutCategoryInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  amount: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  invoice: z.lazy(() => InvoicesUpdateOneWithoutTransactionNestedInputSchema).optional(),
  account: z.lazy(() => AccountUpdateOneRequiredWithoutTransactionNestedInputSchema).optional()
}).strict();

export const TransactionUncheckedUpdateWithoutCategoryInputSchema: z.ZodType<Prisma.TransactionUncheckedUpdateWithoutCategoryInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  amount: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  invoiceId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  accountId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const TransactionUncheckedUpdateManyWithoutCategoryInputSchema: z.ZodType<Prisma.TransactionUncheckedUpdateManyWithoutCategoryInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  amount: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  invoiceId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  accountId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const TransactionCreateManyAccountInputSchema: z.ZodType<Prisma.TransactionCreateManyAccountInput> = z.object({
  id: z.string(),
  date: z.coerce.date(),
  description: z.string(),
  amount: z.string(),
  type: z.string().optional().nullable(),
  invoiceId: z.string().optional().nullable(),
  categoryId: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const InvoicesCreateManyAccountInputSchema: z.ZodType<Prisma.InvoicesCreateManyAccountInput> = z.object({
  id: z.string().uuid().optional(),
  amount: z.number(),
  month: z.number().int(),
  year: z.number().int(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const TransactionUpdateWithoutAccountInputSchema: z.ZodType<Prisma.TransactionUpdateWithoutAccountInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  amount: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  invoice: z.lazy(() => InvoicesUpdateOneWithoutTransactionNestedInputSchema).optional(),
  category: z.lazy(() => CategoryUpdateOneWithoutTransactionNestedInputSchema).optional()
}).strict();

export const TransactionUncheckedUpdateWithoutAccountInputSchema: z.ZodType<Prisma.TransactionUncheckedUpdateWithoutAccountInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  amount: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  invoiceId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  categoryId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const TransactionUncheckedUpdateManyWithoutAccountInputSchema: z.ZodType<Prisma.TransactionUncheckedUpdateManyWithoutAccountInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  amount: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  invoiceId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  categoryId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const InvoicesUpdateWithoutAccountInputSchema: z.ZodType<Prisma.InvoicesUpdateWithoutAccountInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  amount: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  month: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  year: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  Transaction: z.lazy(() => TransactionUpdateManyWithoutInvoiceNestedInputSchema).optional()
}).strict();

export const InvoicesUncheckedUpdateWithoutAccountInputSchema: z.ZodType<Prisma.InvoicesUncheckedUpdateWithoutAccountInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  amount: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  month: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  year: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  Transaction: z.lazy(() => TransactionUncheckedUpdateManyWithoutInvoiceNestedInputSchema).optional()
}).strict();

export const InvoicesUncheckedUpdateManyWithoutAccountInputSchema: z.ZodType<Prisma.InvoicesUncheckedUpdateManyWithoutAccountInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  amount: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  month: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  year: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const TransactionCreateManyInvoiceInputSchema: z.ZodType<Prisma.TransactionCreateManyInvoiceInput> = z.object({
  id: z.string(),
  date: z.coerce.date(),
  description: z.string(),
  amount: z.string(),
  type: z.string().optional().nullable(),
  accountId: z.string(),
  categoryId: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const TransactionUpdateWithoutInvoiceInputSchema: z.ZodType<Prisma.TransactionUpdateWithoutInvoiceInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  amount: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  account: z.lazy(() => AccountUpdateOneRequiredWithoutTransactionNestedInputSchema).optional(),
  category: z.lazy(() => CategoryUpdateOneWithoutTransactionNestedInputSchema).optional()
}).strict();

export const TransactionUncheckedUpdateWithoutInvoiceInputSchema: z.ZodType<Prisma.TransactionUncheckedUpdateWithoutInvoiceInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  amount: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  accountId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  categoryId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const TransactionUncheckedUpdateManyWithoutInvoiceInputSchema: z.ZodType<Prisma.TransactionUncheckedUpdateManyWithoutInvoiceInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  amount: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  accountId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  categoryId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

/////////////////////////////////////////
// ARGS
/////////////////////////////////////////

export const CategoryFindFirstArgsSchema: z.ZodType<Prisma.CategoryFindFirstArgs> = z.object({
  select: CategorySelectSchema.optional(),
  include: CategoryIncludeSchema.optional(),
  where: CategoryWhereInputSchema.optional(),
  orderBy: z.union([ CategoryOrderByWithRelationInputSchema.array(),CategoryOrderByWithRelationInputSchema ]).optional(),
  cursor: CategoryWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ CategoryScalarFieldEnumSchema,CategoryScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const CategoryFindFirstOrThrowArgsSchema: z.ZodType<Prisma.CategoryFindFirstOrThrowArgs> = z.object({
  select: CategorySelectSchema.optional(),
  include: CategoryIncludeSchema.optional(),
  where: CategoryWhereInputSchema.optional(),
  orderBy: z.union([ CategoryOrderByWithRelationInputSchema.array(),CategoryOrderByWithRelationInputSchema ]).optional(),
  cursor: CategoryWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ CategoryScalarFieldEnumSchema,CategoryScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const CategoryFindManyArgsSchema: z.ZodType<Prisma.CategoryFindManyArgs> = z.object({
  select: CategorySelectSchema.optional(),
  include: CategoryIncludeSchema.optional(),
  where: CategoryWhereInputSchema.optional(),
  orderBy: z.union([ CategoryOrderByWithRelationInputSchema.array(),CategoryOrderByWithRelationInputSchema ]).optional(),
  cursor: CategoryWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ CategoryScalarFieldEnumSchema,CategoryScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const CategoryAggregateArgsSchema: z.ZodType<Prisma.CategoryAggregateArgs> = z.object({
  where: CategoryWhereInputSchema.optional(),
  orderBy: z.union([ CategoryOrderByWithRelationInputSchema.array(),CategoryOrderByWithRelationInputSchema ]).optional(),
  cursor: CategoryWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const CategoryGroupByArgsSchema: z.ZodType<Prisma.CategoryGroupByArgs> = z.object({
  where: CategoryWhereInputSchema.optional(),
  orderBy: z.union([ CategoryOrderByWithAggregationInputSchema.array(),CategoryOrderByWithAggregationInputSchema ]).optional(),
  by: CategoryScalarFieldEnumSchema.array(),
  having: CategoryScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const CategoryFindUniqueArgsSchema: z.ZodType<Prisma.CategoryFindUniqueArgs> = z.object({
  select: CategorySelectSchema.optional(),
  include: CategoryIncludeSchema.optional(),
  where: CategoryWhereUniqueInputSchema,
}).strict() ;

export const CategoryFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.CategoryFindUniqueOrThrowArgs> = z.object({
  select: CategorySelectSchema.optional(),
  include: CategoryIncludeSchema.optional(),
  where: CategoryWhereUniqueInputSchema,
}).strict() ;

export const AccountFindFirstArgsSchema: z.ZodType<Prisma.AccountFindFirstArgs> = z.object({
  select: AccountSelectSchema.optional(),
  include: AccountIncludeSchema.optional(),
  where: AccountWhereInputSchema.optional(),
  orderBy: z.union([ AccountOrderByWithRelationInputSchema.array(),AccountOrderByWithRelationInputSchema ]).optional(),
  cursor: AccountWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ AccountScalarFieldEnumSchema,AccountScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const AccountFindFirstOrThrowArgsSchema: z.ZodType<Prisma.AccountFindFirstOrThrowArgs> = z.object({
  select: AccountSelectSchema.optional(),
  include: AccountIncludeSchema.optional(),
  where: AccountWhereInputSchema.optional(),
  orderBy: z.union([ AccountOrderByWithRelationInputSchema.array(),AccountOrderByWithRelationInputSchema ]).optional(),
  cursor: AccountWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ AccountScalarFieldEnumSchema,AccountScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const AccountFindManyArgsSchema: z.ZodType<Prisma.AccountFindManyArgs> = z.object({
  select: AccountSelectSchema.optional(),
  include: AccountIncludeSchema.optional(),
  where: AccountWhereInputSchema.optional(),
  orderBy: z.union([ AccountOrderByWithRelationInputSchema.array(),AccountOrderByWithRelationInputSchema ]).optional(),
  cursor: AccountWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ AccountScalarFieldEnumSchema,AccountScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const AccountAggregateArgsSchema: z.ZodType<Prisma.AccountAggregateArgs> = z.object({
  where: AccountWhereInputSchema.optional(),
  orderBy: z.union([ AccountOrderByWithRelationInputSchema.array(),AccountOrderByWithRelationInputSchema ]).optional(),
  cursor: AccountWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const AccountGroupByArgsSchema: z.ZodType<Prisma.AccountGroupByArgs> = z.object({
  where: AccountWhereInputSchema.optional(),
  orderBy: z.union([ AccountOrderByWithAggregationInputSchema.array(),AccountOrderByWithAggregationInputSchema ]).optional(),
  by: AccountScalarFieldEnumSchema.array(),
  having: AccountScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const AccountFindUniqueArgsSchema: z.ZodType<Prisma.AccountFindUniqueArgs> = z.object({
  select: AccountSelectSchema.optional(),
  include: AccountIncludeSchema.optional(),
  where: AccountWhereUniqueInputSchema,
}).strict() ;

export const AccountFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.AccountFindUniqueOrThrowArgs> = z.object({
  select: AccountSelectSchema.optional(),
  include: AccountIncludeSchema.optional(),
  where: AccountWhereUniqueInputSchema,
}).strict() ;

export const TransactionFindFirstArgsSchema: z.ZodType<Prisma.TransactionFindFirstArgs> = z.object({
  select: TransactionSelectSchema.optional(),
  include: TransactionIncludeSchema.optional(),
  where: TransactionWhereInputSchema.optional(),
  orderBy: z.union([ TransactionOrderByWithRelationInputSchema.array(),TransactionOrderByWithRelationInputSchema ]).optional(),
  cursor: TransactionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ TransactionScalarFieldEnumSchema,TransactionScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const TransactionFindFirstOrThrowArgsSchema: z.ZodType<Prisma.TransactionFindFirstOrThrowArgs> = z.object({
  select: TransactionSelectSchema.optional(),
  include: TransactionIncludeSchema.optional(),
  where: TransactionWhereInputSchema.optional(),
  orderBy: z.union([ TransactionOrderByWithRelationInputSchema.array(),TransactionOrderByWithRelationInputSchema ]).optional(),
  cursor: TransactionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ TransactionScalarFieldEnumSchema,TransactionScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const TransactionFindManyArgsSchema: z.ZodType<Prisma.TransactionFindManyArgs> = z.object({
  select: TransactionSelectSchema.optional(),
  include: TransactionIncludeSchema.optional(),
  where: TransactionWhereInputSchema.optional(),
  orderBy: z.union([ TransactionOrderByWithRelationInputSchema.array(),TransactionOrderByWithRelationInputSchema ]).optional(),
  cursor: TransactionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ TransactionScalarFieldEnumSchema,TransactionScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const TransactionAggregateArgsSchema: z.ZodType<Prisma.TransactionAggregateArgs> = z.object({
  where: TransactionWhereInputSchema.optional(),
  orderBy: z.union([ TransactionOrderByWithRelationInputSchema.array(),TransactionOrderByWithRelationInputSchema ]).optional(),
  cursor: TransactionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const TransactionGroupByArgsSchema: z.ZodType<Prisma.TransactionGroupByArgs> = z.object({
  where: TransactionWhereInputSchema.optional(),
  orderBy: z.union([ TransactionOrderByWithAggregationInputSchema.array(),TransactionOrderByWithAggregationInputSchema ]).optional(),
  by: TransactionScalarFieldEnumSchema.array(),
  having: TransactionScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const TransactionFindUniqueArgsSchema: z.ZodType<Prisma.TransactionFindUniqueArgs> = z.object({
  select: TransactionSelectSchema.optional(),
  include: TransactionIncludeSchema.optional(),
  where: TransactionWhereUniqueInputSchema,
}).strict() ;

export const TransactionFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.TransactionFindUniqueOrThrowArgs> = z.object({
  select: TransactionSelectSchema.optional(),
  include: TransactionIncludeSchema.optional(),
  where: TransactionWhereUniqueInputSchema,
}).strict() ;

export const FixedExpensesFindFirstArgsSchema: z.ZodType<Prisma.FixedExpensesFindFirstArgs> = z.object({
  select: FixedExpensesSelectSchema.optional(),
  where: FixedExpensesWhereInputSchema.optional(),
  orderBy: z.union([ FixedExpensesOrderByWithRelationInputSchema.array(),FixedExpensesOrderByWithRelationInputSchema ]).optional(),
  cursor: FixedExpensesWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ FixedExpensesScalarFieldEnumSchema,FixedExpensesScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const FixedExpensesFindFirstOrThrowArgsSchema: z.ZodType<Prisma.FixedExpensesFindFirstOrThrowArgs> = z.object({
  select: FixedExpensesSelectSchema.optional(),
  where: FixedExpensesWhereInputSchema.optional(),
  orderBy: z.union([ FixedExpensesOrderByWithRelationInputSchema.array(),FixedExpensesOrderByWithRelationInputSchema ]).optional(),
  cursor: FixedExpensesWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ FixedExpensesScalarFieldEnumSchema,FixedExpensesScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const FixedExpensesFindManyArgsSchema: z.ZodType<Prisma.FixedExpensesFindManyArgs> = z.object({
  select: FixedExpensesSelectSchema.optional(),
  where: FixedExpensesWhereInputSchema.optional(),
  orderBy: z.union([ FixedExpensesOrderByWithRelationInputSchema.array(),FixedExpensesOrderByWithRelationInputSchema ]).optional(),
  cursor: FixedExpensesWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ FixedExpensesScalarFieldEnumSchema,FixedExpensesScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const FixedExpensesAggregateArgsSchema: z.ZodType<Prisma.FixedExpensesAggregateArgs> = z.object({
  where: FixedExpensesWhereInputSchema.optional(),
  orderBy: z.union([ FixedExpensesOrderByWithRelationInputSchema.array(),FixedExpensesOrderByWithRelationInputSchema ]).optional(),
  cursor: FixedExpensesWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const FixedExpensesGroupByArgsSchema: z.ZodType<Prisma.FixedExpensesGroupByArgs> = z.object({
  where: FixedExpensesWhereInputSchema.optional(),
  orderBy: z.union([ FixedExpensesOrderByWithAggregationInputSchema.array(),FixedExpensesOrderByWithAggregationInputSchema ]).optional(),
  by: FixedExpensesScalarFieldEnumSchema.array(),
  having: FixedExpensesScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const FixedExpensesFindUniqueArgsSchema: z.ZodType<Prisma.FixedExpensesFindUniqueArgs> = z.object({
  select: FixedExpensesSelectSchema.optional(),
  where: FixedExpensesWhereUniqueInputSchema,
}).strict() ;

export const FixedExpensesFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.FixedExpensesFindUniqueOrThrowArgs> = z.object({
  select: FixedExpensesSelectSchema.optional(),
  where: FixedExpensesWhereUniqueInputSchema,
}).strict() ;

export const IncomesFindFirstArgsSchema: z.ZodType<Prisma.IncomesFindFirstArgs> = z.object({
  select: IncomesSelectSchema.optional(),
  where: IncomesWhereInputSchema.optional(),
  orderBy: z.union([ IncomesOrderByWithRelationInputSchema.array(),IncomesOrderByWithRelationInputSchema ]).optional(),
  cursor: IncomesWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ IncomesScalarFieldEnumSchema,IncomesScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const IncomesFindFirstOrThrowArgsSchema: z.ZodType<Prisma.IncomesFindFirstOrThrowArgs> = z.object({
  select: IncomesSelectSchema.optional(),
  where: IncomesWhereInputSchema.optional(),
  orderBy: z.union([ IncomesOrderByWithRelationInputSchema.array(),IncomesOrderByWithRelationInputSchema ]).optional(),
  cursor: IncomesWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ IncomesScalarFieldEnumSchema,IncomesScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const IncomesFindManyArgsSchema: z.ZodType<Prisma.IncomesFindManyArgs> = z.object({
  select: IncomesSelectSchema.optional(),
  where: IncomesWhereInputSchema.optional(),
  orderBy: z.union([ IncomesOrderByWithRelationInputSchema.array(),IncomesOrderByWithRelationInputSchema ]).optional(),
  cursor: IncomesWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ IncomesScalarFieldEnumSchema,IncomesScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const IncomesAggregateArgsSchema: z.ZodType<Prisma.IncomesAggregateArgs> = z.object({
  where: IncomesWhereInputSchema.optional(),
  orderBy: z.union([ IncomesOrderByWithRelationInputSchema.array(),IncomesOrderByWithRelationInputSchema ]).optional(),
  cursor: IncomesWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const IncomesGroupByArgsSchema: z.ZodType<Prisma.IncomesGroupByArgs> = z.object({
  where: IncomesWhereInputSchema.optional(),
  orderBy: z.union([ IncomesOrderByWithAggregationInputSchema.array(),IncomesOrderByWithAggregationInputSchema ]).optional(),
  by: IncomesScalarFieldEnumSchema.array(),
  having: IncomesScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const IncomesFindUniqueArgsSchema: z.ZodType<Prisma.IncomesFindUniqueArgs> = z.object({
  select: IncomesSelectSchema.optional(),
  where: IncomesWhereUniqueInputSchema,
}).strict() ;

export const IncomesFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.IncomesFindUniqueOrThrowArgs> = z.object({
  select: IncomesSelectSchema.optional(),
  where: IncomesWhereUniqueInputSchema,
}).strict() ;

export const InvoicesFindFirstArgsSchema: z.ZodType<Prisma.InvoicesFindFirstArgs> = z.object({
  select: InvoicesSelectSchema.optional(),
  include: InvoicesIncludeSchema.optional(),
  where: InvoicesWhereInputSchema.optional(),
  orderBy: z.union([ InvoicesOrderByWithRelationInputSchema.array(),InvoicesOrderByWithRelationInputSchema ]).optional(),
  cursor: InvoicesWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ InvoicesScalarFieldEnumSchema,InvoicesScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const InvoicesFindFirstOrThrowArgsSchema: z.ZodType<Prisma.InvoicesFindFirstOrThrowArgs> = z.object({
  select: InvoicesSelectSchema.optional(),
  include: InvoicesIncludeSchema.optional(),
  where: InvoicesWhereInputSchema.optional(),
  orderBy: z.union([ InvoicesOrderByWithRelationInputSchema.array(),InvoicesOrderByWithRelationInputSchema ]).optional(),
  cursor: InvoicesWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ InvoicesScalarFieldEnumSchema,InvoicesScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const InvoicesFindManyArgsSchema: z.ZodType<Prisma.InvoicesFindManyArgs> = z.object({
  select: InvoicesSelectSchema.optional(),
  include: InvoicesIncludeSchema.optional(),
  where: InvoicesWhereInputSchema.optional(),
  orderBy: z.union([ InvoicesOrderByWithRelationInputSchema.array(),InvoicesOrderByWithRelationInputSchema ]).optional(),
  cursor: InvoicesWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ InvoicesScalarFieldEnumSchema,InvoicesScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const InvoicesAggregateArgsSchema: z.ZodType<Prisma.InvoicesAggregateArgs> = z.object({
  where: InvoicesWhereInputSchema.optional(),
  orderBy: z.union([ InvoicesOrderByWithRelationInputSchema.array(),InvoicesOrderByWithRelationInputSchema ]).optional(),
  cursor: InvoicesWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const InvoicesGroupByArgsSchema: z.ZodType<Prisma.InvoicesGroupByArgs> = z.object({
  where: InvoicesWhereInputSchema.optional(),
  orderBy: z.union([ InvoicesOrderByWithAggregationInputSchema.array(),InvoicesOrderByWithAggregationInputSchema ]).optional(),
  by: InvoicesScalarFieldEnumSchema.array(),
  having: InvoicesScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const InvoicesFindUniqueArgsSchema: z.ZodType<Prisma.InvoicesFindUniqueArgs> = z.object({
  select: InvoicesSelectSchema.optional(),
  include: InvoicesIncludeSchema.optional(),
  where: InvoicesWhereUniqueInputSchema,
}).strict() ;

export const InvoicesFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.InvoicesFindUniqueOrThrowArgs> = z.object({
  select: InvoicesSelectSchema.optional(),
  include: InvoicesIncludeSchema.optional(),
  where: InvoicesWhereUniqueInputSchema,
}).strict() ;

export const CategoryCreateArgsSchema: z.ZodType<Prisma.CategoryCreateArgs> = z.object({
  select: CategorySelectSchema.optional(),
  include: CategoryIncludeSchema.optional(),
  data: z.union([ CategoryCreateInputSchema,CategoryUncheckedCreateInputSchema ]),
}).strict() ;

export const CategoryUpsertArgsSchema: z.ZodType<Prisma.CategoryUpsertArgs> = z.object({
  select: CategorySelectSchema.optional(),
  include: CategoryIncludeSchema.optional(),
  where: CategoryWhereUniqueInputSchema,
  create: z.union([ CategoryCreateInputSchema,CategoryUncheckedCreateInputSchema ]),
  update: z.union([ CategoryUpdateInputSchema,CategoryUncheckedUpdateInputSchema ]),
}).strict() ;

export const CategoryCreateManyArgsSchema: z.ZodType<Prisma.CategoryCreateManyArgs> = z.object({
  data: z.union([ CategoryCreateManyInputSchema,CategoryCreateManyInputSchema.array() ]),
}).strict() ;

export const CategoryCreateManyAndReturnArgsSchema: z.ZodType<Prisma.CategoryCreateManyAndReturnArgs> = z.object({
  data: z.union([ CategoryCreateManyInputSchema,CategoryCreateManyInputSchema.array() ]),
}).strict() ;

export const CategoryDeleteArgsSchema: z.ZodType<Prisma.CategoryDeleteArgs> = z.object({
  select: CategorySelectSchema.optional(),
  include: CategoryIncludeSchema.optional(),
  where: CategoryWhereUniqueInputSchema,
}).strict() ;

export const CategoryUpdateArgsSchema: z.ZodType<Prisma.CategoryUpdateArgs> = z.object({
  select: CategorySelectSchema.optional(),
  include: CategoryIncludeSchema.optional(),
  data: z.union([ CategoryUpdateInputSchema,CategoryUncheckedUpdateInputSchema ]),
  where: CategoryWhereUniqueInputSchema,
}).strict() ;

export const CategoryUpdateManyArgsSchema: z.ZodType<Prisma.CategoryUpdateManyArgs> = z.object({
  data: z.union([ CategoryUpdateManyMutationInputSchema,CategoryUncheckedUpdateManyInputSchema ]),
  where: CategoryWhereInputSchema.optional(),
}).strict() ;

export const CategoryDeleteManyArgsSchema: z.ZodType<Prisma.CategoryDeleteManyArgs> = z.object({
  where: CategoryWhereInputSchema.optional(),
}).strict() ;

export const AccountCreateArgsSchema: z.ZodType<Prisma.AccountCreateArgs> = z.object({
  select: AccountSelectSchema.optional(),
  include: AccountIncludeSchema.optional(),
  data: z.union([ AccountCreateInputSchema,AccountUncheckedCreateInputSchema ]),
}).strict() ;

export const AccountUpsertArgsSchema: z.ZodType<Prisma.AccountUpsertArgs> = z.object({
  select: AccountSelectSchema.optional(),
  include: AccountIncludeSchema.optional(),
  where: AccountWhereUniqueInputSchema,
  create: z.union([ AccountCreateInputSchema,AccountUncheckedCreateInputSchema ]),
  update: z.union([ AccountUpdateInputSchema,AccountUncheckedUpdateInputSchema ]),
}).strict() ;

export const AccountCreateManyArgsSchema: z.ZodType<Prisma.AccountCreateManyArgs> = z.object({
  data: z.union([ AccountCreateManyInputSchema,AccountCreateManyInputSchema.array() ]),
}).strict() ;

export const AccountCreateManyAndReturnArgsSchema: z.ZodType<Prisma.AccountCreateManyAndReturnArgs> = z.object({
  data: z.union([ AccountCreateManyInputSchema,AccountCreateManyInputSchema.array() ]),
}).strict() ;

export const AccountDeleteArgsSchema: z.ZodType<Prisma.AccountDeleteArgs> = z.object({
  select: AccountSelectSchema.optional(),
  include: AccountIncludeSchema.optional(),
  where: AccountWhereUniqueInputSchema,
}).strict() ;

export const AccountUpdateArgsSchema: z.ZodType<Prisma.AccountUpdateArgs> = z.object({
  select: AccountSelectSchema.optional(),
  include: AccountIncludeSchema.optional(),
  data: z.union([ AccountUpdateInputSchema,AccountUncheckedUpdateInputSchema ]),
  where: AccountWhereUniqueInputSchema,
}).strict() ;

export const AccountUpdateManyArgsSchema: z.ZodType<Prisma.AccountUpdateManyArgs> = z.object({
  data: z.union([ AccountUpdateManyMutationInputSchema,AccountUncheckedUpdateManyInputSchema ]),
  where: AccountWhereInputSchema.optional(),
}).strict() ;

export const AccountDeleteManyArgsSchema: z.ZodType<Prisma.AccountDeleteManyArgs> = z.object({
  where: AccountWhereInputSchema.optional(),
}).strict() ;

export const TransactionCreateArgsSchema: z.ZodType<Prisma.TransactionCreateArgs> = z.object({
  select: TransactionSelectSchema.optional(),
  include: TransactionIncludeSchema.optional(),
  data: z.union([ TransactionCreateInputSchema,TransactionUncheckedCreateInputSchema ]),
}).strict() ;

export const TransactionUpsertArgsSchema: z.ZodType<Prisma.TransactionUpsertArgs> = z.object({
  select: TransactionSelectSchema.optional(),
  include: TransactionIncludeSchema.optional(),
  where: TransactionWhereUniqueInputSchema,
  create: z.union([ TransactionCreateInputSchema,TransactionUncheckedCreateInputSchema ]),
  update: z.union([ TransactionUpdateInputSchema,TransactionUncheckedUpdateInputSchema ]),
}).strict() ;

export const TransactionCreateManyArgsSchema: z.ZodType<Prisma.TransactionCreateManyArgs> = z.object({
  data: z.union([ TransactionCreateManyInputSchema,TransactionCreateManyInputSchema.array() ]),
}).strict() ;

export const TransactionCreateManyAndReturnArgsSchema: z.ZodType<Prisma.TransactionCreateManyAndReturnArgs> = z.object({
  data: z.union([ TransactionCreateManyInputSchema,TransactionCreateManyInputSchema.array() ]),
}).strict() ;

export const TransactionDeleteArgsSchema: z.ZodType<Prisma.TransactionDeleteArgs> = z.object({
  select: TransactionSelectSchema.optional(),
  include: TransactionIncludeSchema.optional(),
  where: TransactionWhereUniqueInputSchema,
}).strict() ;

export const TransactionUpdateArgsSchema: z.ZodType<Prisma.TransactionUpdateArgs> = z.object({
  select: TransactionSelectSchema.optional(),
  include: TransactionIncludeSchema.optional(),
  data: z.union([ TransactionUpdateInputSchema,TransactionUncheckedUpdateInputSchema ]),
  where: TransactionWhereUniqueInputSchema,
}).strict() ;

export const TransactionUpdateManyArgsSchema: z.ZodType<Prisma.TransactionUpdateManyArgs> = z.object({
  data: z.union([ TransactionUpdateManyMutationInputSchema,TransactionUncheckedUpdateManyInputSchema ]),
  where: TransactionWhereInputSchema.optional(),
}).strict() ;

export const TransactionDeleteManyArgsSchema: z.ZodType<Prisma.TransactionDeleteManyArgs> = z.object({
  where: TransactionWhereInputSchema.optional(),
}).strict() ;

export const FixedExpensesCreateArgsSchema: z.ZodType<Prisma.FixedExpensesCreateArgs> = z.object({
  select: FixedExpensesSelectSchema.optional(),
  data: z.union([ FixedExpensesCreateInputSchema,FixedExpensesUncheckedCreateInputSchema ]),
}).strict() ;

export const FixedExpensesUpsertArgsSchema: z.ZodType<Prisma.FixedExpensesUpsertArgs> = z.object({
  select: FixedExpensesSelectSchema.optional(),
  where: FixedExpensesWhereUniqueInputSchema,
  create: z.union([ FixedExpensesCreateInputSchema,FixedExpensesUncheckedCreateInputSchema ]),
  update: z.union([ FixedExpensesUpdateInputSchema,FixedExpensesUncheckedUpdateInputSchema ]),
}).strict() ;

export const FixedExpensesCreateManyArgsSchema: z.ZodType<Prisma.FixedExpensesCreateManyArgs> = z.object({
  data: z.union([ FixedExpensesCreateManyInputSchema,FixedExpensesCreateManyInputSchema.array() ]),
}).strict() ;

export const FixedExpensesCreateManyAndReturnArgsSchema: z.ZodType<Prisma.FixedExpensesCreateManyAndReturnArgs> = z.object({
  data: z.union([ FixedExpensesCreateManyInputSchema,FixedExpensesCreateManyInputSchema.array() ]),
}).strict() ;

export const FixedExpensesDeleteArgsSchema: z.ZodType<Prisma.FixedExpensesDeleteArgs> = z.object({
  select: FixedExpensesSelectSchema.optional(),
  where: FixedExpensesWhereUniqueInputSchema,
}).strict() ;

export const FixedExpensesUpdateArgsSchema: z.ZodType<Prisma.FixedExpensesUpdateArgs> = z.object({
  select: FixedExpensesSelectSchema.optional(),
  data: z.union([ FixedExpensesUpdateInputSchema,FixedExpensesUncheckedUpdateInputSchema ]),
  where: FixedExpensesWhereUniqueInputSchema,
}).strict() ;

export const FixedExpensesUpdateManyArgsSchema: z.ZodType<Prisma.FixedExpensesUpdateManyArgs> = z.object({
  data: z.union([ FixedExpensesUpdateManyMutationInputSchema,FixedExpensesUncheckedUpdateManyInputSchema ]),
  where: FixedExpensesWhereInputSchema.optional(),
}).strict() ;

export const FixedExpensesDeleteManyArgsSchema: z.ZodType<Prisma.FixedExpensesDeleteManyArgs> = z.object({
  where: FixedExpensesWhereInputSchema.optional(),
}).strict() ;

export const IncomesCreateArgsSchema: z.ZodType<Prisma.IncomesCreateArgs> = z.object({
  select: IncomesSelectSchema.optional(),
  data: z.union([ IncomesCreateInputSchema,IncomesUncheckedCreateInputSchema ]),
}).strict() ;

export const IncomesUpsertArgsSchema: z.ZodType<Prisma.IncomesUpsertArgs> = z.object({
  select: IncomesSelectSchema.optional(),
  where: IncomesWhereUniqueInputSchema,
  create: z.union([ IncomesCreateInputSchema,IncomesUncheckedCreateInputSchema ]),
  update: z.union([ IncomesUpdateInputSchema,IncomesUncheckedUpdateInputSchema ]),
}).strict() ;

export const IncomesCreateManyArgsSchema: z.ZodType<Prisma.IncomesCreateManyArgs> = z.object({
  data: z.union([ IncomesCreateManyInputSchema,IncomesCreateManyInputSchema.array() ]),
}).strict() ;

export const IncomesCreateManyAndReturnArgsSchema: z.ZodType<Prisma.IncomesCreateManyAndReturnArgs> = z.object({
  data: z.union([ IncomesCreateManyInputSchema,IncomesCreateManyInputSchema.array() ]),
}).strict() ;

export const IncomesDeleteArgsSchema: z.ZodType<Prisma.IncomesDeleteArgs> = z.object({
  select: IncomesSelectSchema.optional(),
  where: IncomesWhereUniqueInputSchema,
}).strict() ;

export const IncomesUpdateArgsSchema: z.ZodType<Prisma.IncomesUpdateArgs> = z.object({
  select: IncomesSelectSchema.optional(),
  data: z.union([ IncomesUpdateInputSchema,IncomesUncheckedUpdateInputSchema ]),
  where: IncomesWhereUniqueInputSchema,
}).strict() ;

export const IncomesUpdateManyArgsSchema: z.ZodType<Prisma.IncomesUpdateManyArgs> = z.object({
  data: z.union([ IncomesUpdateManyMutationInputSchema,IncomesUncheckedUpdateManyInputSchema ]),
  where: IncomesWhereInputSchema.optional(),
}).strict() ;

export const IncomesDeleteManyArgsSchema: z.ZodType<Prisma.IncomesDeleteManyArgs> = z.object({
  where: IncomesWhereInputSchema.optional(),
}).strict() ;

export const InvoicesCreateArgsSchema: z.ZodType<Prisma.InvoicesCreateArgs> = z.object({
  select: InvoicesSelectSchema.optional(),
  include: InvoicesIncludeSchema.optional(),
  data: z.union([ InvoicesCreateInputSchema,InvoicesUncheckedCreateInputSchema ]),
}).strict() ;

export const InvoicesUpsertArgsSchema: z.ZodType<Prisma.InvoicesUpsertArgs> = z.object({
  select: InvoicesSelectSchema.optional(),
  include: InvoicesIncludeSchema.optional(),
  where: InvoicesWhereUniqueInputSchema,
  create: z.union([ InvoicesCreateInputSchema,InvoicesUncheckedCreateInputSchema ]),
  update: z.union([ InvoicesUpdateInputSchema,InvoicesUncheckedUpdateInputSchema ]),
}).strict() ;

export const InvoicesCreateManyArgsSchema: z.ZodType<Prisma.InvoicesCreateManyArgs> = z.object({
  data: z.union([ InvoicesCreateManyInputSchema,InvoicesCreateManyInputSchema.array() ]),
}).strict() ;

export const InvoicesCreateManyAndReturnArgsSchema: z.ZodType<Prisma.InvoicesCreateManyAndReturnArgs> = z.object({
  data: z.union([ InvoicesCreateManyInputSchema,InvoicesCreateManyInputSchema.array() ]),
}).strict() ;

export const InvoicesDeleteArgsSchema: z.ZodType<Prisma.InvoicesDeleteArgs> = z.object({
  select: InvoicesSelectSchema.optional(),
  include: InvoicesIncludeSchema.optional(),
  where: InvoicesWhereUniqueInputSchema,
}).strict() ;

export const InvoicesUpdateArgsSchema: z.ZodType<Prisma.InvoicesUpdateArgs> = z.object({
  select: InvoicesSelectSchema.optional(),
  include: InvoicesIncludeSchema.optional(),
  data: z.union([ InvoicesUpdateInputSchema,InvoicesUncheckedUpdateInputSchema ]),
  where: InvoicesWhereUniqueInputSchema,
}).strict() ;

export const InvoicesUpdateManyArgsSchema: z.ZodType<Prisma.InvoicesUpdateManyArgs> = z.object({
  data: z.union([ InvoicesUpdateManyMutationInputSchema,InvoicesUncheckedUpdateManyInputSchema ]),
  where: InvoicesWhereInputSchema.optional(),
}).strict() ;

export const InvoicesDeleteManyArgsSchema: z.ZodType<Prisma.InvoicesDeleteManyArgs> = z.object({
  where: InvoicesWhereInputSchema.optional(),
}).strict() ;