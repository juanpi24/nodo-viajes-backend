import mongoose from 'mongoose';

const packageSchema = new mongoose.Schema(
  {
    titulo: { type: String, required: true, trim: true, minlength: 3, maxlength: 80 },
    destino: { type: String, required: true, trim: true, minlength: 2, maxlength: 80 },
    descripcion: { type: String, required: true, minlength: 10, maxlength: 500 },
    precio: { type: Number, required: true, min: 1 },
    stock: { type: Number, required: true, min: 0 },
    imagen: { type: String, required: true, trim: true },
    categoria: {
      type: String,
      required: true,
      enum: ['Naturaleza', 'Lagos y Glaciares', 'MontaÃ±a', 'Aventura', 'Ciudad'],
    },
    destacado: { type: Boolean, default: false },
    coordenadas: {
      lat: { type: Number },
      lng: { type: Number },
    },
  },
  { timestamps: true }
);

packageSchema.set('toJSON', {
  transform: (_doc, ret) => {
    delete ret.__v;
    return ret;
  },
});

export const Package = mongoose.model('Package', packageSchema);
