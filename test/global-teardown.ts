import { existsSync, renameSync } from 'fs';

export default async () => {
  if (existsSync('.env.temp')) {
    renameSync('.env.temp', '.env');
  }
};
