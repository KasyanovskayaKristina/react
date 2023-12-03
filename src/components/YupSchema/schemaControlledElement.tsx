import * as yup from 'yup';

export const schema = yup.object().shape({
  name: yup
    .string()
    .required('Name is required')
    .matches(/^[A-Z][a-z]*$/, 'First letter should be capital'),
  email: yup.string().email('Invalid email').required('Email is required'),
  age: yup
    .number()
    .positive('Age must be a positive number')
    .integer('Age must be an integer')
    .required('Age is required'),
  password: yup
    .string()
    .required('Password is required')
    .matches(
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      'Password must contain at least one uppercase letter, one digit, one lowercase letter, and one special character, and be at least 8 characters long'
    ),
  confirmPassword: yup
    .string()
    .required('Confirm Password is required')
    .oneOf([yup.ref('password')], 'Passwords must match'),
  gender: yup.string().required('Gender is required'),
  terms: yup.boolean().oneOf([true], 'Accept Terms & Conditions is required'),
  country: yup.string().required('Country is required'),
  image: yup
    .mixed()
    .required('Download Image')
    .test('fileSize', 'File too much size', (value) => {
      const fileList = value as FileList;
      if (!fileList || fileList.length === 0) return false;
      const file = fileList[0];
      return file.size <= 2000000;
    })
    .test('fileType', 'Dont use this image format', (value) => {
      const fileList = value as FileList;
      if (!fileList || fileList.length === 0) return false;
      const file = fileList[0];
      const allowedTypes = ['image/jpeg', 'image/png'];
      return allowedTypes.includes(file.type);
    }),
});
