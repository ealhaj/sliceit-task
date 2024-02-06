import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { LocalAuthGuard } from 'auth/auth.guard';
import { AuthorService } from './author.service';

@UseGuards(LocalAuthGuard)
@Controller('authors')
export class AuthorController {
  constructor(private readonly authorService: AuthorService) {}

  @Get()
  async author() {
    const author = await this.authorService.findRandomAuthorOrFail();

    return {
      success: true,
      data: {
        authorId: author.id,
        name: author.name,
      },
    };
  }

  @Get(':id/quote')
  async quote(@Param('id', ParseIntPipe) authorId: number) {
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
