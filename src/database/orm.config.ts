import { DataSource } from 'typeorm';
import 'dotenv/config';

export const ormConfig = new DataSource({
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: Number(process.env.POSTGRES_PORT),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  synchronize: true,
  entities: ['dist/**/*.entity.js'],
  migrations: ['dist/database/migrations/*.js'],
  migrationsRun: true,
});

ormConfig
  .initialize()
  .then(() => {
    console.log('ORM Data Source has been initialized!');
  })
  .catch((err) => {
    console.error('Error during ORM Data Source initialization', err);
  });
