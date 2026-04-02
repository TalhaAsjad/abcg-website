import * as migration_20260402_222322_footer_nav_columns from './20260402_222322_footer_nav_columns';

export const migrations = [
  {
    up: migration_20260402_222322_footer_nav_columns.up,
    down: migration_20260402_222322_footer_nav_columns.down,
    name: '20260402_222322_footer_nav_columns'
  },
];
