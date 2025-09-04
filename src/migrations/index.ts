import * as migration_20250731_153401 from './20250731_153401';
import * as migration_20250806_163724 from './20250806_163724';
import * as migration_20250904_053702 from './20250904_053702';

export const migrations = [
  {
    up: migration_20250731_153401.up,
    down: migration_20250731_153401.down,
    name: '20250731_153401',
  },
  {
    up: migration_20250806_163724.up,
    down: migration_20250806_163724.down,
    name: '20250806_163724',
  },
  {
    up: migration_20250904_053702.up,
    down: migration_20250904_053702.down,
    name: '20250904_053702'
  },
];
