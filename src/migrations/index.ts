import * as migration_20250731_153401 from './20250731_153401';

export const migrations = [
  {
    up: migration_20250731_153401.up,
    down: migration_20250731_153401.down,
    name: '20250731_153401'
  },
];
