import { mythicAccounts } from './mythicAccounts';
import { legendaryAccounts } from './legendaryAccounts';
import { epicAccounts } from './epicAccounts';
import { rareAccounts } from './rareAccounts';
import { uncommonAccounts } from './uncommonAccounts';
import { commonAccounts } from './commonAccounts';

export const steamAccounts = [
  ...mythicAccounts,
  ...legendaryAccounts,
  ...epicAccounts,
  ...rareAccounts,
  ...uncommonAccounts,
  ...commonAccounts
];