import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    nombre: { type: String, required: true, trim: true, minlength: 2, maxlength: 80 },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true, minlength: 6 },
    rol: { type: String, enum: ['admin', 'cliente'], default: 'cliente' },
    favoritos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Package', default: [] }],
  },
  { timestamps: true }
);

userSchema.set('toJSON', {
  transform: (_doc, ret) => {
    delete ret.password;
    delete ret.__v;
    return ret;
  },
});

export const User = mongoose.model('User', userSchema);
