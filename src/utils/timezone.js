const timezone = () => {
  const timezone = (new Date().getTimezoneOffset() / 60) * -1;
  return timezone > 0 ? '+' + timezone : timezone;
};

export default timezone;
