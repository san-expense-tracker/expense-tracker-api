import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FinanceDocument } from './schema/finance.mongooschema';
import { Model } from 'mongoose';
import { CreateFinanceDto } from './schema/finance.schema';
@Injectable()
export class FinanceRepository {
  constructor(
    @InjectModel('Finance', 'PrimaryConnection')
    private financeModel: Model<FinanceDocument>,
  ) {}

  async createFinance(finance: CreateFinanceDto): Promise<FinanceDocument> {
    const createdFinance = new this.financeModel(finance);
    return createdFinance.save();
  }
  async getTransactions(filters: {
    search?: string;
    type?: 'INCOME' | 'EXPENSE';
    category?: string;
    page: number;
    limit: number;
    sort?: 'asc' | 'desc';
  }) {
    const query: any = {};

    // 🔍 Search
    if (filters?.search) {
      query.title = {
        $regex: filters?.search,
        $options: 'i',
      };
    }
    //type
    if (filters?.type) {
      query.type = filters?.type;
    }
    //category
    if (filters?.category) {
      query.category = filters?.category;
    }
    //pagenation
    const skip = (filters.page - 1) * filters.limit;

    // Sort
    const sortOption: any = { date: filters?.sort === 'asc' ? 1 : -1 };

    // Total count
    const total = await this.financeModel.countDocuments(query);

    // Transactions
    const transactions = await this.financeModel
      .find(query)
      .sort(sortOption)
      .skip(skip)
      .limit(filters.limit)
      .exec();

    return {
      transactions,
      meta: {
        total,
        page: filters.page,
        limit: filters.limit,
        totalPages: Math.ceil(total / filters.limit),
      },
    };
  }
  async findAll(): Promise<FinanceDocument[]> {
    return this.financeModel.find().exec();
  }
  async update(
    id: string,
    finance: FinanceDocument,
  ): Promise<FinanceDocument | null> {
    return this.financeModel
      .findByIdAndUpdate(id, finance, { new: true })
      .exec();
  }
  async remove(id: string): Promise<FinanceDocument | null> {
    return this.financeModel.findByIdAndDelete(id).exec();
  }
}
