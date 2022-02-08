import React from 'react';
import { Button, Form } from 'react-bootstrap';
import { Context } from '../context/context';
import useInput from '../hooks/useInput';

export const LoginPage = () => {
  React.useEffect(() => {
    document.title = 'Войти';
  }, []);

  const { signin, loading, error } = React.useContext(Context);

  const username = useInput('', { isEmail: true, isPhone: true });
  const password = useInput('', { isEmpty: true });

  const isValidCredentials =
    (username.valid.isEmail || username.valid.isPhone) &&
    password.valid.isEmpty &&
    !loading;

  const handleSubmit = e => {
    e.preventDefault();
    const params = new URLSearchParams();
    params.append('username', username.value);
    params.append('password', password.value);
    signin(params);
  };
  return (
    <div className='container'>
      <div className='row justify-content-center'>
        <div className='col-6 '>
          <Form onSubmit={handleSubmit}>
            <Form.Group className='mb-3' controlId='username'>
              <Form.Label>Email адрес или номер телефона</Form.Label>
              <Form.Control
                isValid={username.valid.isEmail || username.valid.isPhone}
                value={username.value}
                onChange={username.onChange}
                type='text'
                placeholder='Введите email'
              />
            </Form.Group>

            <Form.Group className='mb-3' controlId='password'>
              <Form.Label>Парооль</Form.Label>
              <Form.Control
                isValid={password.valid.isEmpty}
                value={password.value}
                onChange={password.onChange}
                type='password'
                placeholder='Пароль'
              />
            </Form.Group>
            <Button
              disabled={!isValidCredentials}
              variant='primary'
              type='submit'
            >
              Войти
            </Button>
          </Form>
          {error && <p className='text-danger'>{error}</p>}
        </div>
      </div>
    </div>
  );
};
