import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateFinanceDto } from './schema/finance.schema';
import { FinanceRepository } from './finance.repository';
import { FinanceDocument } from './schema/finance.mongooschema';


@Injectable()
export class FinanceService {
  constructor(private readonly financeRepository: FinanceRepository) { }
  addFinance(finance: CreateFinanceDto): Promise<FinanceDocument> {
    return this.financeRepository.createFinance(finance);
  }

  findAll() {
    return this.financeRepository.findAll();
  }

  async update(id: string, updateFinanceDto: any): Promise<FinanceDocument> {
    const updatedFinance = await this.financeRepository.update(id, updateFinanceDto);
    if (!updatedFinance) {
      throw new NotFoundException(`Finance document with ID ${id} not found`);
    }
    return updatedFinance;
  }

  async remove(id: string): Promise<FinanceDocument> {
    const deletedFinance = await this.financeRepository.remove(id);
    if (!deletedFinance) {
      throw new NotFoundException(`Finance not found`);
    }
    return deletedFinance;
  }
}
