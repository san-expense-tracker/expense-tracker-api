import { Document, Schema } from 'mongoose';

export const FinanceSchema = new Schema({
    title: { type: String, required: true },
    amount: { type: Number, required: true },
    category: { type: String, required: true },
    date: { type: Date, required: true },
    createdAt: { type: Date, default: Date.now },
    type: { type: String, enum: ['INCOME', 'EXPENSE'], required: true },
});

export interface FinanceDocument extends Document {
    title: string;
    amount: number;
    category: string;
    date: Date;
    createdAt: Date;
    type: 'INCOME' | 'EXPENSE'
}