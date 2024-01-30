import * as bcrypt from 'bcrypt';

const saltRounds = 10;

export const hashPassword = async (password: string): Promise<string> => {
  return await bcrypt.hash(password, saltRounds);
};

export const generateToken = async (sessionId: string): Promise<string> => {
  return await bcrypt.hash(sessionId, saltRounds);
};
