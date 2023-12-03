import React, { useEffect, useState } from 'react';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { clearError, setError, submitForm, uploadImage } from '../formSlice';
import data from '../countries.json';
import { setCountries } from '../countriesSlice';
import { useNavigate } from 'react-router';

const schema = yup.object().shape({
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
    .required('Загрузите изображение')
    .test('fileSize', 'Файл слишком большой', (value) => {
      const fileList = value as FileList;
      if (!fileList || fileList.length === 0) return false;
      const file = fileList[0];
      return file.size <= 2000000; // Максимальный размер 2 МБ
    })
    .test('fileType', 'Недопустимый формат файла', (value) => {
      const fileList = value as FileList;
      if (!fileList || fileList.length === 0) return false;
      const file = fileList[0];
      const allowedTypes = ['image/jpeg', 'image/png'];
      return allowedTypes.includes(file.type);
    }),
});

const PageOne = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    age: '',
    password: '',
    confirmPassword: '',
    gender: '',
    terms: false,
    country: '',
    image: '',
  });

  const dispatch = useDispatch();
  const formErrors = useSelector((state: RootState) => state.form.errors);
  const countries = data.countriesData;
  const navigator = useNavigate();

  useEffect(() => {
    dispatch(setCountries(countries));
  }, [dispatch]);

  const handleChange = (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    const { name, value, type } = e.target;

    const finalValue =
      type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;

    setFormData({ ...formData, [name]: finalValue });

    schema
      .validateAt(name, { [name]: finalValue })
      .then(() => {
        dispatch(clearError(name));
      })
      .catch((error) => {
        dispatch(setError({ field: name, message: error.message }));
      });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(submitForm(formData));
    navigator('/');
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log('handleImageChange is called');
    const fileList = e.target.files;

    if (fileList) {
      const file = fileList[0];
      const reader = new FileReader();

      reader.onloadend = () => {
        if (reader.result && typeof reader.result === 'string') {
          dispatch(uploadImage(reader.result));
        } else {
          console.error('Failed to read the image file.');
        }
      };

      reader.onerror = () => {
        if (reader.error) {
          console.error('Error reading the image file:', reader.error);
        } else {
          console.error('Unknown error reading the image file.');
        }
      };

      if (file) {
        reader.readAsDataURL(file);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
      />
      {formErrors.name && <p>{formErrors.name}</p>}
      <br />
      <input
        name="email"
        placeholder="email"
        type="email"
        autoComplete="email"
        value={formData.email}
        onChange={handleChange}
      />
      {formErrors.email && <p>{formErrors.email}</p>}
      <br />
      <input
        type="number"
        name="age"
        value={formData.age}
        onChange={handleChange}
      />
      {formErrors.age && <p>{formErrors.age}</p>}
      <br />
      <input
        type="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
      />
      {formErrors.password && <p>{formErrors.password}</p>}
      <br />

      <input
        type="password"
        name="confirmPassword"
        value={formData.confirmPassword}
        onChange={handleChange}
      />
      {formErrors.confirmPassword && <p>{formErrors.confirmPassword}</p>}
      <br />
      <label>
        Male
        <input
          type="radio"
          name="gender"
          value="male"
          checked={formData.gender === 'male'}
          onChange={handleChange}
        />
      </label>
      <label>
        Female
        <input
          type="radio"
          name="gender"
          value="female"
          checked={formData.gender === 'female'}
          onChange={handleChange}
        />
      </label>
      <label>
        Other
        <input
          type="radio"
          name="gender"
          value="other"
          checked={formData.gender === 'other'}
          onChange={handleChange}
        />
      </label>
      {formErrors.gender && <p>{formErrors.gender}</p>}
      <br />
      <input
        type="checkbox"
        name="terms"
        checked={formData.terms}
        onChange={handleChange}
      />
      <label htmlFor="terms">I accept the terms and conditions</label>
      {formErrors.terms && <p>{formErrors.terms}</p>}
      <br />
      <label htmlFor="country">Страна</label>
      <select
        id="country"
        name="country"
        value={formData.country}
        onChange={handleChange}
        required
      >
        <option value="" disabled>
          Выберите страну
        </option>
        {countries.map((country) => (
          <option key={country.id} value={country.name}>
            {country.name}
          </option>
        ))}
      </select>
      {formErrors.country && <p>{formErrors.country}</p>}
      <br />
      <label htmlFor="image">Загрузите изображение</label>
      <input
        type="file"
        id="image"
        name="image"
        accept=".jpeg, .jpg, .png"
        onChange={handleImageChange}
      />
      {formErrors.image && <p>{formErrors.image}</p>}
      <br />
      <button type="submit">Submit</button>
    </form>
  );
};

export default PageOne;
