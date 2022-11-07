import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Transaction } from './dto/transaction.entity';
import { TransactionsController } from './transactions.controller';
import { TransactionsService } from './transactions.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([Transaction]),
        MulterModule.register({
            dest: './uploads/csv',
        }),
    ],
    providers: [TransactionsService],
    controllers: [TransactionsController],
})
export class TransactionsModule { }
