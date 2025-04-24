import jwt from 'jsonwebtoken';

export function generateAccessToken(userId: string): string {
  return jwt.sign({ userId }, process.env.JWT_SECRET as string, { expiresIn: '1h' });
}