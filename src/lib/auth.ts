import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// 密码哈希
export const hashPassword = async (password: string): Promise<string> => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

// 密码验证
export const verifyPassword = async (password: string, hashedPassword: string): Promise<boolean> => {
  return bcrypt.compare(password, hashedPassword);
};

// 生成JWT token
export const generateToken = (userId: number): string => {
  // @ts-ignore
  return jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

// 验证JWT token
export const verifyToken = (token: string): { userId: number } | null => {
  try {
    // @ts-ignore
    const decoded = jwt.verify(token, process.env.JWT_SECRET) as { userId: number };
    return decoded;
  } catch (error) {
    return null;
  }
};
