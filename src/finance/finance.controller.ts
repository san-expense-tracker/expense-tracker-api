import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FinanceService } from './finance.service';
import { CreateFinanceDto } from './schema/finance.schema';
import { FinanceDocument } from './schema/finance.mongooschema';

@Controller('finance')
export class FinanceController {
  constructor(private readonly financeService: FinanceService) { }

  @Post()
  addFinance(@Body() finance: CreateFinanceDto) {
    return this.financeService.addFinance(finance);
  }

  @Get()
  findAll() {
    return this.financeService.findAll();
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateFinanceDto: any) {
    const updatedFinance = await this.financeService.update(id, updateFinanceDto);
    return {
      message: "Finance updated successfully",
      data: updatedFinance
    };
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<{ message: string, data: FinanceDocument }> {
    const deletedFinance = await this.financeService.remove(id);
    return {
      message: "Finance deleted successfully",
      data: deletedFinance
    };
  }
}
