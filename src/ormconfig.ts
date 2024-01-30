import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { config } from 'dotenv';
import { join } from 'path';
import { DataSource, DataSourceOptions } from 'typeorm';

config();

export const typeOrmModuleOptions: TypeOrmModuleOptions = (() => {
  return {
    type: 'postgres',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DATABASE_PORT ?? '5432', 10),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DATABASE,
    entities: [join(__dirname, '**', '*.entity.ts')],
    migrations: [join(__dirname, 'migrations', '*.ts')],
    synchronize: false,
    migrationsRun: false,
    autoLoadEntities: true,
  };
})();

export const dataSource = new DataSource({
  ...typeOrmModuleOptions,
} as DataSourceOptions);
