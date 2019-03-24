export function required(value) {
  return value ? undefined : 'Required';
}

export function emailFormat(value) {
  if (!/.+@.+\..+/i.test(value) && value !== '' && value !== undefined) {
    return 'Invalid format';
  }
}

export function minLength(arg, value) {
  return value.length >= arg
    ? undefined
    : `The field should contain ${arg}+ symbols.`;
}

export function hasCapitalLetter(value) {
  return value.toLowerCase() !== value
    ? undefined
    : 'The field should contain 1 capital letter at minima.';
}

export function hasDigit(value) {
  return /[0-9]/.test(value)
    ? undefined
    : 'The field should contain 1 digit at minima.';
}

export function hasSpecialSymbol(value) {
  return /[ !@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(value)
    ? undefined
    : 'The field should contain 1 symbol at minima.';
}

export function jsonFormat(value) {
  if (value !== '' && value !== undefined) {
    try {
      JSON.parse(value);
    } catch (e) {
      return 'Invalid json format';
    }
  }
}

export function website(value) {
  if (
    !/@^(http:\/\/|https:\/\/)?([a-z0-9][a-z0-9-]*\.)+[a-z0-9][a-z0-9-]*$@i/.test(
      value,
    ) &&
    value !== '' &&
    value !== undefined
  ) {
    return 'Invalid link';
  }
}

export const matchingFormValidations = {
  email: [required, emailFormat],
  // gender: [required],
};
