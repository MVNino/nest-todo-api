export const jwtConstants = {
  secret: process.env.JWT_SECRET_KEY,
  expiresIn: process.env.JWT_EXPIRES_IN || '1hr',
};
