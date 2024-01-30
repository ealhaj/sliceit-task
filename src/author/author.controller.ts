import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LocalAuthGuard } from 'auth/auth.guard';
import { Repository } from 'typeorm';
import { Author } from './author.entity';
import { Quote } from './quote.entity';

@UseGuards(LocalAuthGuard)
@Controller()
export class AuthorController {
  constructor(
    @InjectRepository(Author) private authorRepository: Repository<Author>,
    @InjectRepository(Quote) private quoteRepository: Repository<Quote>,
  ) {}

  @Get('author')
  async author() {
    const author = await this.authorRepository.findOne({
      where: { id: Math.ceil(Math.random() * 3) },
    });

    return {
      success: true,
      data: {
        authorId: author.id,
        name: author.name,
      },
    };
  }

  @Get('quote')
  async quote(@Query('authorId') authorId: number) {
    const quotes = await this.quoteRepository.find({
      where: { author: { id: authorId } },
    });

    return {
      success: true,
      data: {
        authorId,
        quoteId: quotes[0].id,
        quote: quotes[0].quote,
      },
    };
  }
}
