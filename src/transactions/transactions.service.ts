import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Transaction } from './dto/transaction.entity';

@Injectable()
export class TransactionsService {
    constructor(
        @InjectRepository(Transaction)
        private transactionRepository: Repository<Transaction>,
    ) { }

    findAll(): Promise<Transaction[]> {
        return this.transactionRepository.find();
    }

    async insertAll(transaction: Transaction[]): Promise<any> {
        const insertedData = await this.transactionRepository.insert(transaction);
    }

    findOne(id: number): Promise<Transaction> {
        return this.transactionRepository.findOneBy({ id });
    }

    async remove(id: string): Promise<void> {
        await this.transactionRepository.delete(id);
    }
}