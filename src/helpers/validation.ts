// Email
export const validateEmail = (value: string): string | null => {
  if (!value) {
    return "Введите E-mail";
  }
  if (!/^[A-Za-z0-9._-]+@[A-Za-z0-9_-]+\.[A-Za-z]{2,}$/.test(value)) {
    return "Некорректный формат e-mail";
  }
  return null;
};

// Login
export const validateLogin = (value: string): string | null => {
  if (!value) {
    return "Введите логин";
  }
  if (!/^[a-zA-Z0-9-_]{3,20}$/.test(value)) {
    return "От 3 до 20 символов. Только латиница, цифры, - и _ ";
  }
  if (/^[0-9]+$/.test(value)) {
    return "Логин не может состоять только из цифр";
  }
  if (!/[a-zA-Z]/.test(value)) {
    return "Логин должен содержать хотя бы одну латинскую букву";
  }
  return null;
};

// First name, second name
export const validateName = (value: string): string | null => {
  if (!value) {
    return null;
  }
  if (!/^([A-Z][a-z-]*|[А-ЯЁ][а-яё-]*)$/.test(value)) {
    return "Только буквы и дефис, первая буква заглавная";
  }
  return null;
};

// Phone
export const validatePhone = (value: string): string | null => {
  if (!value) {
    return "Введите номер телефона";
  }
  if (!/^\+?\d{10,15}$/.test(value)) {
    return "От 10 до 15 цифр, может начинаться с плюса";
  }
  return null;
};

// Password
export const validatePassword = (value: string): string | null => {
  if (!value) {
    return "Пароль не может быть пустым";
  }
  if (!/^[A-Za-z\d!@#$%^&*()_\-+=\[\]{}|\\:;"'<>,.?/~`]+$/.test(value)) {
    return "Только латинские буквы и символы";
  }
  if (value.length < 8 || value.length > 40) {
    return "Пароль должен быть от 8 до 40 символов";
  }
  if (!/[A-Z]/.test(value)) {
    return "Пароль должен содержать хотя бы одну заглавную букву";
  }
  if (!/\d/.test(value)) {
    return "Пароль должен содержать хотя бы одну цифру";
  }
  return null;
};

// Message
export const validateMessage = (value: string): string | null => {
  if (!value || !value.trim()) {
    return "Сообщение не должно быть пустым";
  }
  return null;
};
