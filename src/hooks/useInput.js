import React from 'react';

const useValidation = (value, validations) => {
  const [isEmail, setIsEmail] = React.useState(false);
  const [isEmpty, setIsEmpty] = React.useState(false);
  const [isPhone, setIsPhone] = React.useState(false);
  const [isUsername, setIsUsername] = React.useState(false);

  React.useEffect(() => {
    for (let validation in validations) {
      switch (validation) {
        case 'isEmail': {
          const re =
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          setIsEmail(re.test(value));
          break;
        }
        case 'isEmpty': {
          setIsEmpty(value.length);
          break;
        }
        case 'isPhone': {
          const re = /^[+]7\d{10}$/;
          setIsPhone(re.test(value));
          break;
        }
      }
    }
  }, [value]);

  return {
    isEmail,
    isEmpty,
    isPhone,
  };
};

const useInput = (initialValue, validations) => {
  const [value, setValue] = React.useState(initialValue);
  const valid = useValidation(value, validations);
  const onChange = e => {
    console.log();
    setValue(e.target.value);
  };
  return { value, onChange, valid };
};

export default useInput;
