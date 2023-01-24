export type Login = {
  email: string;
  password: string;
};

export type LoginResponse = {
  token: string;
  userId: string;
};

export type RegistrationResponse = {
  message: string;
  userId: string;
};

export type VerifyResponse = {
  message: string;
  isVerificate: boolean;
};
