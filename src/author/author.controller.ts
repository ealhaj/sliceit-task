import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from 'auth/auth.guard';
import { AuthorService } from './author.service';

@UseGuards(LocalAuthGuard)
@Controller()
export class AuthorController {
  constructor(private readonly authorService: AuthorService) {}

  @Get('author')
  async author() {
    const author = await this.authorService.findOne();

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
    const quotes = await this.authorService.findQuotes(authorId);

    const quoteIndex = Math.floor(Math.random() * quotes.length);

    return {
      success: true,
      data: {
        authorId,
        quoteId: quotes[quoteIndex].id,
        quote: quotes[quoteIndex].quote,
      },
    };
  }
}
