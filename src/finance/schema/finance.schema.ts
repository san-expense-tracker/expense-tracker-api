import z from "zod";

export class FinanceSchema {
    title: string;
    amount: number;
    category: string;
    date: Date;
    createdAt: Date;
    type: 'INCOME' | 'EXPENSE'
}
export class CreateFinanceDto {
    title: string;
    amount: number;
    category: string;
    date: Date;
    type: 'INCOME' | 'EXPENSE'
}
export class UpdateFinanceDto {
    title: string;
    amount: number;
    category: string;
    date: Date;
    type: 'INCOME' | 'EXPENSE'
}
export type FinanceSchemaType = z.infer<typeof FinanceSchema>;
export type CreateFinanceDtoType = z.infer<typeof CreateFinanceDto>;
export type UpdateFinanceDtoType = z.infer<typeof UpdateFinanceDto>;
