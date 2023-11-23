import { existsSync, renameSync } from 'fs';

export default async () => {
  if (existsSync('.env')) {
    renameSync('.env', '.env.temp');
  }
};
