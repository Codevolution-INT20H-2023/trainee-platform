import * as yup from 'yup';

export const validationFieldsSchema = yup.object().shape({
  firstName: yup.string().required('First name is required'),
  lastName: yup.string().required('Last name is required'),
  email: yup.string().email().required('Email is required'),
});

export const validationPasswordSchema = yup.object().shape({
  oldPassword: yup
    .string()
    .required('Password is required')
    .min(8, 'Password should be at least 8 characters')
    .max(16, 'Password is too long')
    .matches(/(?=.*[0-9])/, 'Password must contain at least one number')
    .matches(/(?=.*[a-z])/i, 'Password must contain at least one latin letter'),
  newPassword: yup
    .string()
    .required('Password is required')
    .min(8, 'Password should be at least 8 characters')
    .max(16, 'Password is too long')
    .matches(/(?=.*[0-9])/, 'Password must contain at least one number')
    .matches(/(?=.*[a-z])/i, 'Password must contain at least one latin letter'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('newPassword'), undefined], 'Password must match')
    .required('Confirm password is required'),
});
