import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { FinanceService } from './finance.service';
import { CreateFinanceDto } from './schema/finance.schema';
import { FinanceDocument } from './schema/finance.mongooschema';

@Controller('finance')
export class FinanceController {
  constructor(private readonly financeService: FinanceService) {}

  @Post()
  addFinance(@Body() finance: CreateFinanceDto) {
    return this.financeService.addFinance(finance);
  }
  @Get()
  getTransactions(
    @Query('search') search?: string,
    @Query('type') type?: 'INCOME' | 'EXPENSE',
    @Query('category') category?: string,
    @Query('page') page = 1,
    @Query('limit') limit = 10,
    @Query('sort') sort: 'asc' | 'desc' = 'desc',
    @Query('title') title?: string,
  ) {
    return this.financeService.getTransactions({
      search,
      type,
      category,
      page,
      limit,
      sort,
      title,
    });
  }
  @Get()
  findAll() {
    return this.financeService.findAll();
  }

  @Get('transactions')
  getTransactionsCursor(
    @Query('cursor') cursor?: string,
    @Query('search') search?: string,
    @Query('type') type?: 'INCOME' | 'EXPENSE',
    @Query('category') category?: string,
    @Query('sort') sort?: 'asc' | 'desc',
    @Query('limit') limit?: string,
  ) {
    return this.financeService.getTransactionsCursor({
      cursor,
      search,
      type,
      category,
      sort,
      limit: limit ? Number(limit) : undefined, // ✅ FIX
    });
  }

  @Get()
  fetchTransactions() {
    return this.financeService.findAll();
  }
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateFinanceDto: any) {
    const updatedFinance = await this.financeService.update(
      id,
      updateFinanceDto,
    );
    return {
      message: 'Finance updated successfully',
      data: updatedFinance,
    };
  }

  @Delete(':id')
  async remove(
    @Param('id') id: string,
  ): Promise<{ message: string; data: FinanceDocument }> {
    const deletedFinance = await this.financeService.remove(id);
    return {
      message: 'Finance deleted successfully',
      data: deletedFinance,
    };
  }
}
