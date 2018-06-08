import { APP_CONSTANTS } from '../constants';

const emailValidator = (data) => {
  const emailRegExp = new RegExp(APP_CONSTANTS.REG_EXP.EMAIL);
  return emailRegExp.test(data);
};

const requiredValidator = (data = '') => {
  return data.trim().length > 0;
};

export {
  emailValidator,
  requiredValidator
};
