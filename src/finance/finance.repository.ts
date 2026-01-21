import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { FinanceDocument } from "./schema/finance.mongooschema";
import { Model } from "mongoose";
import { CreateFinanceDto } from "./schema/finance.schema";
@Injectable()
export class FinanceRepository {
    constructor(
        @InjectModel('Finance', 'PrimaryConnection')
        private financeModel: Model<FinanceDocument>) { }

    async createFinance(finance: CreateFinanceDto): Promise<FinanceDocument> {
        const createdFinance = new this.financeModel(finance);
        return createdFinance.save();
    }
    async findAll(): Promise<FinanceDocument[]> {
        return this.financeModel.find().exec();
    }
    async update(id: string, finance: FinanceDocument): Promise<FinanceDocument | null> {
        return this.financeModel.findByIdAndUpdate(id, finance, { new: true }).exec();
    }
    async remove(id: string): Promise<FinanceDocument | null> {
        return this.financeModel.findByIdAndDelete(id).exec();
    }
}
