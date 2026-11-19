import dotenv from 'dotenv';
dotenv.config();

const required = ['MONGO_URI', 'JWT_SECRET'];
for (const key of required) {
  if (!process.env[key]) {
    throw new Error(`Falta la variable de entorno: ${key}`);
  }
}

export const env = {
  port: process.env.PORT || 3000,
  mongoUri: process.env.MONGO_URI,
  jwtSecret: process.env.JWT_SECRET,
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '7d',
  nodeEnv: process.env.NODE_ENV || 'development',
  frontendUrl: process.env.FRONTEND_URL || 'http://localhost:5173',
  mpAccessToken: process.env.MP_ACCESS_TOKEN || '',
  mpPublicKey: process.env.MP_PUBLIC_KEY || '',
};
