import * as bcrypt from 'bcrypt';

export function encryptPassword(rawPassword: string): string {
  const SALT = bcrypt.genSaltSync();

  return bcrypt.hashSync(rawPassword, SALT);
}

export function comparePassword(rawPassword: string, hash: string): boolean {
  return bcrypt.compareSync(rawPassword, hash);
}
