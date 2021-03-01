import { $host } from './index';

export const registration = async (username, password) => {
  try {
    await $host.post('/auth/registration', {
      username,
      password,
    });
    return await login(username, password);
  } catch (err) {
    throw err.response.data.message;
  }
};

export const login = async (username, password) => {
  try {
    const { data } = await $host.post('/auth/login', { username, password });
    return { ...data };
  } catch (err) {
    throw err.response.data.message;
  }
};

export const getUsers = async () => {
  const { data } = await $host.post('/auth/users');
  return data.rows;
};

export const setPassport = async (
  userId,
  firstName,
  lastName,
  passportNumber,
) => {
  try {
    await $host.post('/auth/passport', {
      userId,
      firstName,
      lastName,
      passportNumber,
    });
    return { message: 'Passport added/updated successfully' };
  } catch (err) {
    throw err.response.data.message;
  }
};

export const setFavColor = async (userId, color) => {
  try {
    await $host.post('/auth/favcolor', {
      userId,
      color,
    });
    return { message: 'Favourite color added/updated successfully' };
  } catch (err) {
    throw err.response.data.message;
  }
};
