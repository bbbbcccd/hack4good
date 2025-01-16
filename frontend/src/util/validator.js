export const validateCredentialsNotEmpty = (username, password) => {
  const formErrors = {
    username: '',
    password: '',
    phoneNumber: '',
  };

  if (!username) {
    formErrors.username = 'Username is required';
  }

  if (!password) {
    formErrors.password = 'Password is required';
  }

  return formErrors;
};
