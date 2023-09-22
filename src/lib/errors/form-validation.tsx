import { RegisterOptions } from 'react-hook-form';

const EMAIL_REGEX_PATTERN = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

export const Validations: {
  [x: string]: RegisterOptions;
} = {
  emailAddress: {
    required: { value: true, message: 'Email is required' },
    pattern: {
      value: EMAIL_REGEX_PATTERN,
      message: 'Email must be in the correct format (example: name@domain.com)',
    },
    minLength: {
      value: 5,
      message: 'Email must be at least 5 characters long',
    },
    maxLength: {
      value: 50,
      message: 'Email can be a maximum of 50 characters long',
    },
  },
};
