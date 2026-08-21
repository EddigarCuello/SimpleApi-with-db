import { Schema, model } from 'mongoose';

// 1. Definición del Esquema (Estructura y Reglas)
const userSchema = new Schema(
  {
    nombre: {
      type: String,
      required: [true, 'El nombre es obligatorio'],
      trim: true,
      minlength: [2, 'El nombre debe tener al menos 2 caracteres']
    },
    email: {
      type: String,
      required: [true, 'El correo electrónico es obligatorio'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        'Por favor ingresa un correo electrónico válido'
      ]
    },
    passwordHash: {
      type: String,
      required: [true, 'La contraseña es obligatoria']
    },
    rol: {
      type: String,
      enum: {
        values: ['estudiante', 'instructor', 'admin'],
        message: '{VALUE} no es un rol válido'
      },
      default: 'estudiante'
    }
  },
  {
    timestamps: true, // Agrega automáticamentecreatedAt y updatedAt
    versionKey: false // Elimina el campo __v por defecto de Mongoose
  }
);

// 2. Creación y exportación del Modelo
// Mongoose asociará este modelo con una colección llamada "users" en MongoDB
export const UserModel = model('User', userSchema);