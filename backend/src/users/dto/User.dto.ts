export interface CreateUserDto {
  username: string;
  email: string;
  password: string;
  avatar: string;
}

export interface LoginUserDto {
  email: string;
  password: string;
}
