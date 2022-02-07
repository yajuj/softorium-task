import { Button, Form } from 'react-bootstrap';
import React from 'react';

export const LoginPage = () => {
  React.useEffect(() => {
    document.title = 'Логин';
  }, []);

  return (
    <Form>
      <Form.Group className='mb-3' controlId='formBasicEmail'>
        <Form.Label>Email адрес или номер телефона</Form.Label>
        <Form.Control type='text' placeholder='Введите email' />
      </Form.Group>

      <Form.Group className='mb-3' controlId='formBasicPassword'>
        <Form.Label>Парооль</Form.Label>
        <Form.Control type='password' placeholder='Пароль' />
      </Form.Group>
      <Button variant='primary' type='submit'>
        Войти
      </Button>
    </Form>
  );
};
