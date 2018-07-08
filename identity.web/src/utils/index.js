import { APP_CONSTANTS } from '../constants';

const emailValidator = (data) => {
  return APP_CONSTANTS.REG_EXP.EMAIL.test(data);
};

const requiredValidator = (data = '') => {
  return data.trim().length > 0;
};

export {
  emailValidator,
  requiredValidator
};
