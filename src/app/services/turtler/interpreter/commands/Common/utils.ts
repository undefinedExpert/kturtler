import { isValueNumber } from '../../../common/utils';
import { CommandValue } from '../../../types';

export const GetNumberFromValue = (value: CommandValue) => {
  return isValueNumber(value) ? value : parseInt(value);
};
