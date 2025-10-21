export type SignInType = {
  login: string;
  password: string;
};

export type SignUpType = {
  first_name: string;
  second_name: string;
  login: string;
  email: string;
  password: string;
  phone: string;
};

export type UserType = {
  id: number;
  first_name: string;
  second_name: string;
  display_name: string;
  phone: string;
  login: string;
  avatar: string;
  email: string;
};

export type PasswordType = {
  oldPassword: string;
  newPassword: string;
};

export type ChatUserType = {
  avatar: string;
  display_name: string;
  first_name: string;
  id: number;
  login: string;
  role: string;
  second_name: string;
};
