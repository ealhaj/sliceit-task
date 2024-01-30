import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthorController } from './author.controller';
import { Author } from './author.entity';
import { Quote } from './quote.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Author, Quote])],
  controllers: [AuthorController],
})
export class AuthorModule {}
