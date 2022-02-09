import React from 'react';
import { Button, Form } from 'react-bootstrap';
import { Context } from '../context/context';
import useInput from '../hooks/useInput';
import timezone from '../utils/timezone';

export const RegistrationPage = () => {
  React.useEffect(() => {
    document.title = 'Регистрация';
  }, []);

  const { signup, loading, error } = React.useContext(Context);

  const email = useInput('', { isEmail: true });
  const password = useInput('', { isEmpty: true });
  const phone = useInput('', { isPhone: true });
  const name = useInput('', { isEmpty: true });
  const date = useInput('', { isEmpty: true });
  const [image, setImage] = React.useState(null);

  const isFormValid =
    email.valid.isEmail &&
    password.valid.isEmpty &&
    phone.valid.isPhone &&
    name.valid.isEmpty &&
    date.valid.isEmpty &&
    !!image &&
    !loading;

  const handleFileUpload = e => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = function () {
      setImage(reader.result.replace('data:image/jpeg;base64,', ''));
    };
  };

  const handleSubmit = e => {
    e.preventDefault();
    const credentials = {
      phone: phone.value,
      password: password.value,
      name: name.value,
      email: email.value,
      birthday: date.value,
      time_zone: timezone(),
      avatar_img: image,
    };
    signup(credentials);
  };

  return (
    <div className='container'>
      <div className='row justify-content-center'>
        <div className='col-md-6 col-sm-1'>
          <Form onSubmit={handleSubmit}>
            <Form.Group className='mb-3' controlId='email'>
              <Form.Label>Email адрес</Form.Label>
              <Form.Control
                isValid={email.valid.isEmail}
                value={email.value}
                onChange={email.onChange}
                type='email'
                placeholder='Введите email'
              />
            </Form.Group>

            <Form.Group className='mb-3' controlId='password'>
              <Form.Label>Пароль</Form.Label>
              <Form.Control
                isValid={password.valid.isEmpty}
                value={password.value}
                onChange={password.onChange}
                type='password'
                placeholder='Пароль'
              />
            </Form.Group>

            <Form.Group className='mb-3' controlId='phone'>
              <Form.Label>Номер телефона</Form.Label>
              <Form.Control
                isValid={phone.valid.isPhone}
                value={phone.value}
                onChange={phone.onChange}
                type='text'
                maxLength={12}
                placeholder='Номер телефона'
              />
              <Form.Text className='text-muted'>
                В формате +7 XXX XXX XX XX
              </Form.Text>
            </Form.Group>

            <Form.Group className='mb-3' controlId='name'>
              <Form.Label>Имя и фамилия</Form.Label>
              <Form.Control
                isValid={name.valid.isEmpty}
                value={name.value}
                onChange={name.onChange}
                type='text'
                placeholder='Имя и фамилия'
              />
            </Form.Group>

            <Form.Group className='mb-3' controlId='birthday'>
              <Form.Label>Дата рождения</Form.Label>
              <Form.Control
                isValid={date.valid.isEmpty}
                value={date.value}
                onChange={date.onChange}
                as='input'
                type='date'
              />
            </Form.Group>

            <Form.Group controlId='formFile' className='mb-3'>
              <Form.Label>Аватар</Form.Label>
              <Form.Control
                isValid={!!image}
                onChange={handleFileUpload}
                accept='image/*'
                type='file'
              />
            </Form.Group>

            <Button disabled={!isFormValid} variant='primary' type='submit'>
              Зарегистрироваться
            </Button>
          </Form>
          {error && <p className='text-danger'>{error}</p>}
        </div>
      </div>
    </div>
  );
};
