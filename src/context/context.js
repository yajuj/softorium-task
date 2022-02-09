import React from 'react';
import shortid from 'shortid';
import api from '../http/api';

export const Context = React.createContext();

const ContextProvider = ({ children }) => {
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState('');
  const [userData, setUserData] = React.useState(null);
  const [route, setRoute] = React.useState('registration');

  React.useEffect(() => {
    if (localStorage.getItem('id')) {
      if (localStorage.getItem('bearer')) {
        setLoading(true);
        setRoute('user');
      } else {
        setRoute('login');
      }
    }
  }, [setLoading, setRoute]);

  const signup = async payload => {
    localStorage.setItem('id', shortid.generate());
    try {
      setLoading(true);
      await api.post('/signup', payload);
      setError('');
      setRoute('login');
    } catch (error) {
      localStorage.removeItem('id');
      if (error.response.data.detail) {
        if (Array.isArray(error.response.data.detail)) {
          // отлавливаю ошибку с номером телефона.
          setError(error.response.data.detail[0].msg);
        } else {
          setError(error.response.data.detail);
        }
      } else {
        setError('Произошла ошибка');
      }
    } finally {
      setLoading(false);
    }
  };

  const signin = async payload => {
    try {
      setLoading(true);
      const response = await api.post('/signin', payload);
      localStorage.setItem('bearer', response.data.access_token);
      setError('');
      setRoute('userpage');
    } catch (error) {
      if (error.response.data.detail) {
        if (Array.isArray(error.response.data.detail)) {
          // отлавливаю ошибку с номером телефона.
          setError(error.response.data.detail[0].msg);
        } else {
          setError(error.response.data.detail);
        }
      } else {
        setError('Произошла ошибка');
      }
    } finally {
      setLoading(false);
    }
  };
  const logout = () => {
    localStorage.removeItem('id');
    localStorage.removeItem('bearer');
    setRoute('registration');
  };

  const fetchMe = async () => {
    try {
      setLoading(true);
      const response = await api.get('/users/me');
      setUserData(response.data);
    } catch (error) {
      if (error?.response?.data?.detail) {
        setError(error.response.data.detail);
      } else {
        setError('Произошла ошибка');
      }
      setRoute('login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Context.Provider
      value={{
        loading,
        error,
        signup,
        signin,
        logout,
        route,
        setRoute,
        fetchMe,
        userData,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default ContextProvider;
