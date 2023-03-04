import * as yup from 'yup';

export const validationSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup
    .string()
    .required('Password is required')
    .min(8, 'Password should be at least 8 characters')
    .max(16, 'Password is too long')
    .matches(/(?=.*[0-9])/, 'Password must contain at least one number')
    .matches(/(?=.*[a-z])/i, 'Password must contain at least one latin letter'),
});
