import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setError, submitForm } from '../formSlice';
import { RootState } from '../store';
import * as yup from 'yup';
import data from '../countries.json';

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
      const file = value as File;

      if (!file) return false;

      return file.size <= 2000000; 
    })
    .test('fileType', 'Недопустимый формат файла', (value) => {
      const file = value as File;

      if (!file) return false;

      const allowedTypes = ['image/jpeg', 'image/png'];
      return allowedTypes.includes(file.type);
    }),
});

const PageTwo = () => {
  const dispatch = useDispatch();
  const navigator = useNavigate();
  const formErrors = useSelector((state: RootState) => state.form.errors);
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const ageRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);
  const genderRef = useRef<HTMLSelectElement>(null);
  const termsRef = useRef<HTMLInputElement>(null);
  const countryRef = useRef<HTMLSelectElement>(null);
  const imageRef = useRef<HTMLInputElement>(null);

  const countries = data.countriesData;

  const readImageFile = (file: File) => {
    return new Promise<string | ArrayBuffer | null>((resolve, reject) => {
      if (!file) {
        resolve(null);
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const name = nameRef.current?.value || '';
    const email = emailRef.current?.value || '';
    const age = ageRef.current?.value || '';
    const password = passwordRef.current?.value || '';
    const confirmPassword = confirmPasswordRef.current?.value || '';
    const gender = genderRef.current?.value || '';
    const terms = termsRef.current?.checked || false;
    const countryId = countryRef.current?.value || '';
    const imageFile = imageRef.current?.files?.[0] || null;
    const image: string | null = imageFile
      ? ((await readImageFile(imageFile)) as string | null)
      : null;
    try {
      await schema.validate(
        {
          name,
          email,
          age,
          password,
          confirmPassword,
          gender,
          country: countryId,
          image: imageFile,
        },
        { abortEarly: false }
      );

      dispatch(
        submitForm({
          name,
          email,
          age,
          gender,
          country: countryId,
          image: image,
        })
      );

      navigator('/');
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        error.inner.forEach((validationError) => {
          const field = validationError.path || 'unknown';
          const message = validationError.message || 'Validation Error';
          dispatch(setError({ field, message }));
        });
      } else {
        console.error('Unexpected error:', error);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Name:</label>
        <input type="text" name="name" ref={nameRef} />
        {formErrors.name && <p>{formErrors.name}</p>}
      </div>
      <div>
        <label>Email:</label>
        <input type="email" name="email" ref={emailRef} />
        {formErrors.email && <p>{formErrors.email}</p>}
      </div>
      <div>
        <label>Age:</label>
        <input type="number" name="age" ref={ageRef} />
        {formErrors.age && <p>{formErrors.age}</p>}
      </div>
      <div>
        <label>Password:</label>
        <input type="password" name="password" ref={passwordRef} />
        {formErrors.password && <p>{formErrors.password}</p>}
      </div>
      <div>
        <label>Confirm Password:</label>
        <input
          type="password"
          name="confirmPassword"
          ref={confirmPasswordRef}
        />
        {formErrors.confirmPassword && <p>{formErrors.confirmPassword}</p>}
      </div>
      <div>
        <label>Gender:</label>
        <select name="gender" ref={genderRef}>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
        {formErrors.gender && <p>{formErrors.gender}</p>}
      </div>
      <div>
        <label>
          <input type="checkbox" name="terms" ref={termsRef} />
          Принимаю Условия и положения
        </label>
        {formErrors.terms && <p>{formErrors.terms}</p>}
      </div>
      <div>
        <label>Country:</label>
        <select name="country" ref={countryRef}>
          {countries.map((country) => (
            <option key={country.id} value={country.id}>
              {country.name}
            </option>
          ))}
        </select>
        {formErrors.country && <p>{formErrors.country}</p>}
      </div>
      <div>
        <label htmlFor="image">Загрузите изображение</label>
        <input
          type="file"
          id="image"
          name="image"
          accept=".jpeg, .jpg, .png"
          ref={imageRef}
        />
        {formErrors.image && <p>{formErrors.image}</p>}
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default PageTwo;
