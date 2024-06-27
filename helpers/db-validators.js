const Rol = require('../models/rol');
const User = require('../models/user');

const isValidRol = async (rol = '') => {
  const isRol = await Rol.findOne({ rol });
  if (!isRol) {
    throw new Error('No es un rol permitido');
  }
};

const emailExists = async (email = '') => {
  const emailExists = await User.findOne({ email });
  if (emailExists) {
    throw new Error(`El correo ya existe ${email}`);
  }
};

const userExistsById = async id => {
  const existUSerId = await User.findById(id);
  if (!existUSerId) {
    throw new Error(`No existe un usuario con este ID ${id}`);
  }
};

module.exports = {
  isValidRol,
  emailExists,
  userExistsById
};
