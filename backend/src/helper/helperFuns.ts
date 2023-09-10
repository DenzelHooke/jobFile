import * as bcrypt from 'bcrypt';
import Auth from 'src/auth/interfaces/auth.interfaces';
import { InvalidPassword } from 'src/exceptions/validation.exception';

interface AuthInput {
  id: string;
  email: string;
  username: string;
  jwtToken: string;
}

const hashPassword = (password: string, salt: string) => {
  return bcrypt.hash(password, salt);
};

const generateSalt = async (): Promise<string> => {
  const saltRounds = 10;
  return await bcrypt.genSalt(saltRounds);
};

export async function createPassword(password: string): Promise<string> {
  // Generate salt
  const salt = await generateSalt();

  // Return string of hashed password
  return hashPassword(password, salt);
}

export async function comparePassword(
  password: string,
  hashedPassword: string,
): Promise<boolean> {
  const isValid = await bcrypt.compare(password, hashedPassword);

  return isValid;
}

// export function generateAuthObject(user): Auth {

//   return {
//     username: username,
//     email: email,
//     id: id,
//     token: jwtToken,
//   }
// }
