import { Button, Form } from 'react-bootstrap';
import React from 'react';

export const RegistrationPage = () => {
  React.useEffect(() => {
    document.title = 'Регистрация';
  }, []);

  return (
    <div className='form'>
      <Form>
        <Form.Group className='mb-3' controlId='formBasicEmail'>
          <Form.Label>Email адрес</Form.Label>
          <Form.Control type='email' placeholder='Введите email' />
        </Form.Group>

        <Form.Group className='mb-3' controlId='formBasicPassword'>
          <Form.Label>Пароль</Form.Label>
          <Form.Control type='password' placeholder='Пароль' />
        </Form.Group>

        <Form.Group className='mb-3' controlId='formBasicPhone'>
          <Form.Label>Номер телефона</Form.Label>
          <Form.Control type='number' placeholder='Номер телефона' />
        </Form.Group>

        <Form.Group className='mb-3' controlId='formBasicCredentials'>
          <Form.Label>Имя и фамилия</Form.Label>
          <Form.Control type='text' placeholder='Имя и фамилия' />
        </Form.Group>

        <Form.Group className='mb-3' controlId='formBasicDate'>
          <Form.Label>Дата рождения</Form.Label>
          <Form.Control type='date' />
        </Form.Group>

        <Form.Group controlId='formFile' className='mb-3'>
          <Form.Label>Аватар</Form.Label>
          <Form.Control type='file' />
        </Form.Group>

        <Button variant='primary' type='submit'>
          Зарегистрироваться
        </Button>
      </Form>
    </div>
  );
};
