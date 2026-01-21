import { Module } from '@nestjs/common';
import { FinanceService } from './finance.service';
import { FinanceController } from './finance.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { FinanceSchema } from './schema/finance.mongooschema';
import { FinanceRepository } from './finance.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Finance', schema: FinanceSchema }
    ], 'PrimaryConnection')
  ],
  controllers: [FinanceController],
  providers: [FinanceService, FinanceRepository],
})
export class FinanceModule { }
