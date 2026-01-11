export const validateEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

export const validatePhone = (phone) => {
  return /^[6-9]\d{9}$/.test(phone);
};

export const validateName = (name) => {
  return /^[a-zA-Z\s]{2,50}$/.test(name);
};