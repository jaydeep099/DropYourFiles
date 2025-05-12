import * as dotenv from 'dotenv'
import { defineConfig } from 'drizzle-kit';

dotenv.config({path:".env"})

if(!process.env.DATABASE_URL){
    throw new Error("DATABASE URL is not set in .env")
}
export default defineConfig({
  out: './drizzle',
  schema: '.lib/db/schema.ts',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
  migrations:{
    table:"__drizzle_migration",
    schema:"public"
  },
  verbose:true, // all things and migration gonna show you
  strict:true,
});
