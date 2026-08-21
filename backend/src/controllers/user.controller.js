import { UserModel } from '../models/user.model.js';

// GET /api/users
export const obtenerUsuarios = async (req, res, next) => {
  try {
    // .find() obtiene todos los documentos. .select('-passwordHash') oculta la contraseña
    const usuarios = await UserModel.find().select('-passwordHash');
    
    res.status(200).json({
      ok: true,
      data: usuarios
    });
  } catch (error) {
    next(error);
  }
};

// GET /api/users/:id
export const obtenerUsuarioPorId = async (req, res, next) => {
  try {
    const { id } = req.params;
    const usuario = await UserModel.findById(id).select('-passwordHash');

    if (!usuario) {
      const error = new Error('Usuario no encontrado');
      error.statusCode = 404;
      return next(error);
    }

    res.status(200).json({
      ok: true,
      data: usuario
    });
  } catch (error) {
    next(error);
  }
};

// POST /api/users
export const registrarUsuario = async (req, res, next) => {
  try {
    const { nombre, email, password, rol } = req.body;

    if (!nombre || !email || !password) {
      const error = new Error('Nombre, email y contraseña son obligatorios');
      error.statusCode = 400;
      return next(error);
    }

    // Comprobar si el email ya existe
    const usuarioExistente = await UserModel.findOne({ email });
    if (usuarioExistente) {
      const error = new Error('El correo electrónico ya está registrado');
      error.statusCode = 400;
      return next(error);
    }

    // Mongoose creará la colección y validará los campos según el Schema
    const nuevoUsuario = await UserModel.create({
      nombre,
      email,
      passwordHash: password, // Próximamente lo encriptaremos con bcrypt
      rol
    });

    // Convertimos a objeto de JS para borrar la contraseña del JSON de respuesta
    const usuarioRespuesta = nuevoUsuario.toObject();
    delete usuarioRespuesta.passwordHash;

    res.status(201).json({
      ok: true,
      message: 'Usuario registrado con éxito',
      data: usuarioRespuesta
    });
  } catch (error) {
    next(error);
  }
};

// PUT /api/users/:id
export const actualizarUsuario = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { nombre, rol } = req.body;

    // { new: true } devuelve el usuario ya actualizado
    // runValidators: true asegura que cumpla las reglas del Schema al editar
    const usuarioActualizado = await UserModel.findByIdAndUpdate(
      id,
      { nombre, rol },
      { new: true, runValidators: true }
    ).select('-passwordHash');

    if (!usuarioActualizado) {
      const error = new Error('Usuario no encontrado');
      error.statusCode = 404;
      return next(error);
    }

    res.status(200).json({
      ok: true,
      message: 'Usuario actualizado correctamente',
      data: usuarioActualizado
    });
  } catch (error) {
    next(error);
  }
};

// DELETE /api/users/:id
export const eliminarUsuario = async (req, res, next) => {
  try {
    const { id } = req.params;
    const usuarioEliminado = await UserModel.findByIdAndDelete(id);

    if (!usuarioEliminado) {
      const error = new Error('Usuario no encontrado');
      error.statusCode = 404;
      return next(error);
    }

    res.status(200).json({
      ok: true,
      message: 'Usuario eliminado correctamente'
    });
  } catch (error) {
    next(error);
  }
};