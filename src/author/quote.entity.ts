import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Author } from './author.entity';

@Entity('quotes')
export class Quote {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Author, (author: Author) => author.quotes, {
    nullable: false,
    eager: true,
  })
  author: Author;

  @Column()
  quote: string;
}
