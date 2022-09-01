import Cookies from 'universal-cookie';

const cookies = new Cookies();

export const getItem = name => cookies.get(name);

export const setItem = (name, value, expireDays) => {
  const now = new Date();
  now.setDate(now.getDate() + expireDays);
  cookies.set(name, value, {
    expires: now,
  });
};

export const removeItem = name => cookies.remove(name);
