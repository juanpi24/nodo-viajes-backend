import mongoose from 'mongoose';
import { connectDB } from '../config/dbConfig.js';
import { User } from '../models/User.js';
import { hashPassword } from '../utils/bcrypt.js';

const run = async () => {
  await connectDB();
  const email = 'admin@nodoviajes.com';
  const existe = await User.findOne({ email });
  if (existe) {
    console.log('ℹ️ Admin ya existe:', email);
  } else {
    await User.create({
      nombre: 'Admin',
      email,
      password: await hashPassword('admin123'),
      rol: 'admin',
    });
    console.log('✅ Admin creado:', email, '| password: admin123');
  }
  await mongoose.disconnect();
  process.exit(0);
};

run();
