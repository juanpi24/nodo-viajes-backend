import mongoose from 'mongoose';

const orderItemSchema = new mongoose.Schema(
  {
    package: { type: mongoose.Schema.Types.ObjectId, ref: 'Package', required: true },
    cantidad: { type: Number, required: true, min: 1 },
    precioUnitario: { type: Number, required: true, min: 0 },
  },
  { _id: false }
);

const orderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    items: { type: [orderItemSchema], required: true, validate: (v) => v.length > 0 },
    total: { type: Number, required: true, min: 0 },
    estado: {
      type: String,
      enum: ['pending', 'approved', 'rejected', 'cancelled'],
      default: 'pending',
    },
    mpPreferenceId: { type: String, default: null },
    mpPaymentId: { type: String, default: null },
  },
  { timestamps: true }
);

orderSchema.set('toJSON', {
  transform: (_doc, ret) => {
    delete ret.__v;
    return ret;
  },
});

export const Order = mongoose.model('Order', orderSchema);
