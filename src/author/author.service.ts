import { NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Author } from './author.entity';
import { Quote } from './quote.entity';

export class AuthorService {
  constructor(
    @InjectRepository(Author) private authorRepository: Repository<Author>,
    @InjectRepository(Quote) private quoteRepository: Repository<Quote>,
  ) {}

  async findRandomAuthor(): Promise<Author> {
    const author = await this.authorRepository.findOneOrFail({
      where: { id: Math.ceil(Math.random() * 3) },
    });

    return author;
  }

  async findQuotes(authorId: number): Promise<Quote[]> {
    const quotes = await this.quoteRepository
      .createQueryBuilder('quote')
      .where('quote.authorId = :authorId', { authorId })
      .getMany();

    if (!quotes.length) {
      throw new NotFoundException();
    }

    return quotes;
  }
}
