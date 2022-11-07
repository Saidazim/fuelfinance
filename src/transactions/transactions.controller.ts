import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { createReadStream } from 'fs';
import { diskStorage } from 'multer';
import { TransactionsService } from './transactions.service';

const csvParser = require("csv-parser");

@Controller('transactions')
export class TransactionsController {
    constructor(private transactionsService: TransactionsService) { }

    @Post('upload')
    @UseInterceptors(FileInterceptor('transactionsFile', {
        storage: diskStorage({
            destination: './uploads/csv',
        }),
    }))
    uploadFile(@UploadedFile() transactionsFile: Express.Multer.File) {
        const result = [];
        createReadStream(`./${transactionsFile.path}`)
            .pipe(csvParser())
            .on("data", (data) => {
                result.push(data);
            })
            .on("end", () => {
                this.transactionsService.insertAll(result);
            });
        const response = {
            message: "File uploaded successfully!",
            data: {
                originalname: transactionsFile.originalname,
                filename: transactionsFile.filename,
            }
        };
        return response;
    }
}
