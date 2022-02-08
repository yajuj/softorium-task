import React from 'react';
import { Card, ListGroup, ListGroupItem } from 'react-bootstrap';
import { Context } from '../context/context';

const UserPage = () => {
  const { fetchMe, userData, loading } = React.useContext(Context);
  React.useEffect(() => {
    document.title = 'Профиль пользователя';
    fetchMe();
  }, []);
  if (loading) return <p>Загрузка...</p>;
  const date = new Date(userData.dt_create);
  return (
    <div>
      <Card style={{ width: '18rem' }}>
        <Card.Img variant='top' src={userData.avatar} />
        <Card.Body>
          <Card.Title>{userData.name}</Card.Title>
        </Card.Body>
        <ListGroup className='list-group-flush'>
          <ListGroupItem>Номер телефона {userData.phone}</ListGroupItem>
          <ListGroupItem>
            Адрес электронной почты {userData.email}
          </ListGroupItem>
          <ListGroupItem>Дата рождения {userData.birthday}</ListGroupItem>
          <ListGroupItem>
            Дата регистрации{' '}
            {date.getDate() + '/' + date.getMonth() + '/' + date.getFullYear()}
          </ListGroupItem>
          <ListGroupItem>Часовой пояс {userData.time_zone}</ListGroupItem>
        </ListGroup>
      </Card>
    </div>
  );
};

export default UserPage;

// "id": "UUID пользователя",
// "phone": "номер телефона в международном формате",
// "name": "имя",
// "email": "адрес email",
// "birthday": "дата рождения",
// "avatar": "ссылка на фото",
// "dt_create": "время регистрации",
// "enabled": "флаг активности",
// "time_zone": "+03"
