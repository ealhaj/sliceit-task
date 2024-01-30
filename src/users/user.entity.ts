import { IsNotEmpty, IsString } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @IsString()
  @IsNotEmpty()
  @Column()
  fullname: string;

  @IsString()
  @Column()
  email: string;

  @IsString()
  @IsNotEmpty()
  @Column()
  password: string;
}
