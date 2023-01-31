import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';

dotenv.config();

const source = new DataSource({
  type: 'postgres' as const,
  url: process.env.DATABASE_URL,
  entities: ['src/server/api/**/*.entity.ts'],
  synchronize: true,
  migrations: ['src/server/migration/*.{ts,js}'],
  extra: {
    ssl:
      process.env.NODE_ENV === 'production'
        ? { rejectUnauthorized: false }
        : false,
  },
});

export default source;
