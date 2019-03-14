import { isEmpty } from 'lodash';

export const required = value => (value ? undefined : 'Required');

export const emailFormat = value => {
  if (!/.+@.+\..+/i.test(value) && value !== '' && value !== undefined) {
    return 'Invalid format';
  }
};

export const minLength = (arg, value) =>
  value.length >= arg ? undefined : `The field should contain ${arg}+ symbols.`;

export const hasCapitalLetter = value =>
  value.toLowerCase() !== value
    ? undefined
    : 'The field should contain 1 capital letter at minima.';

export const hasDigit = value =>
  /[0-9]/.test(value) ? undefined : 'The field should contain 1 digit at minima.';

export const hasSpecialSymbol = value =>
  /[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(value)
    ? undefined
    : 'The field should contain 1 symbol at minima.';
export const jsonFormat = value => {
  if (value !== '' && value !== undefined) {
    try {
      JSON.parse(value);
    } catch (e) {
      return 'Invalid json format';
    }
  }
};

export const facebookLink = value => {
  if (
    !/http(s)?:\/\/(www\.)?(facebook|fb)\.com\/(A-z 0-9 _ - \.)\/?/.test(value) &&
    value !== '' &&
    value !== undefined
  ) {
    return 'Invalid link';
  }
};

export const linkedInLink = value => {
  if (
    !/http(s)?:\/\/([\w]+\.)?linkedin\.com\/pub\/[A-z 0-9 _ -]+(\/[A-z 0-9]+){3}\/?/.test(value) &&
    value !== '' &&
    value !== undefined
  ) {
    return 'Invalid link';
  }
};

export const website = value => {
  if (
    !/@^(http\:\/\/|https\:\/\/)?([a-z0-9][a-z0-9\-]*\.)+[a-z0-9][a-z0-9\-]*$@i/.test(value) &&
    value !== '' &&
    value !== undefined
  ) {
    return 'Invalid link';
  }
};

export const allValidate = {
  required,
  minLength,
  hasCapitalLetter,
  hasDigit,
  hasSpecialSymbol,
  emailFormat,
  jsonFormat,
};

export const matchingFormValidations = {
  email: [required, emailFormat],
  // gender: [required],
};
