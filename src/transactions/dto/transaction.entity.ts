import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Transaction {
    @PrimaryGeneratedColumn('uuid')
    id: number;

    @Column()
    source: string;

    @Column()
    sum: number;

    @Column()
    description: string;

    @Column()
    date: string;
}