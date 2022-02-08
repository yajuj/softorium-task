import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { Context } from './context/context';
import { LoginPage } from './pages/LoginPage';
import { RegistrationPage } from './pages/RegistrationPage';
import UserPage from './pages/UserPage';

function App() {
  const { route, setRoute } = React.useContext(Context);
  React.useEffect(() => {
    if (localStorage.getItem('id')) {
      setRoute('login');
    }
  }, []);
  return (
    <div className='app'>
      {route === 'registration' ? (
        <RegistrationPage />
      ) : route === 'login' ? (
        <LoginPage />
      ) : (
        <UserPage />
      )}
    </div>
  );
}

export default App;
