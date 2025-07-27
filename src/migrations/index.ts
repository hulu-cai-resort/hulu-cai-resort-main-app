import * as migration_20250727_160134 from './20250727_160134';

export const migrations = [
  {
    up: migration_20250727_160134.up,
    down: migration_20250727_160134.down,
    name: '20250727_160134'
  },
];
