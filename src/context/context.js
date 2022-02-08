import React from 'react';
import api from '../http/api';

export const Context = React.createContext();

const ContextProvider = ({ children }) => {
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState('');
  const [userData, setUserData] = React.useState(null);
  const [route, setRoute] = React.useState('registration');

  const signup = async payload => {
    try {
      setLoading(true);
      const response = await api.post('/signup', payload);
      setRoute('login');
    } catch (error) {
      if (error.response.data.detail) {
        setError(error.response.data.detail);
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
      setRoute('userpage');
    } catch (error) {
      if (error.response.data.detail) {
        setError(error.response.data.detail);
      } else {
        setError('Произошла ошибка');
      }
    } finally {
      setLoading(false);
    }
  };

  const fetchMe = async () => {
    try {
      setLoading(true);
      const response = await api.get('/users/me');
      setUserData(response.data);
    } catch (error) {
      if (error.response.data.detail) {
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
