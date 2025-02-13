import { hash, compare } from 'bcryptjs';

export async function hashPassword(password: string): Promise<string> {
  return await hash(password, 12);
}

export async function verifyPassword(
  password: string,
  hashedPassword: string
): Promise<boolean> {
  return await compare(password, hashedPassword);
}

export function validateCompanyEmail(email: string): boolean {
  const allowedDomains = process.env.ALLOWED_DOMAINS?.split(",") || [];
  const domain = email.split('@')[1];
  return allowedDomains.includes(domain);
} 