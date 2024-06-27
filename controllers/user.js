const { response } = require('express');
const bcryptjs = require('bcryptjs');
const User = require('../models/user');

const usuariosGet = async (req, res = response) => {
  const { limit = 1, from = 0 } = req.query;

  const [count, users] = await Promise.all([
    User.countDocuments({ status: true }),
    User.find({ status: true }).skip(from).limit(limit)
  ]);

  res.json({ count, users });
};

const usuariosPut = async (req, res = response) => {
  const id = req.params.id;
  const { _id, password, google, email, ...rest } = req.body;

  if (password) {
    // Encriptar contrasena
    const salt = bcryptjs.genSaltSync();
    rest.password = bcryptjs.hashSync(password, salt);
  }

  const user = await User.findByIdAndUpdate(id, rest);

  res.json(user);
};

const usuariosPost = async (req, res = response) => {
  const { name, email, password, rol } = req.body;
  const user = new User({ name, email, password, rol });

  // Encriptar contrasena
  const salt = bcryptjs.genSaltSync();
  user.password = bcryptjs.hashSync(password, salt);

  // Guardar en BD
  await user.save();

  res.json({
    data: 'POST-Controlado',
    user
  });
};

const usuariosDelete = async (req, res = response) => {
  const { id } = req.params;

  const userDeleted = await User.findByIdAndUpdate(id, { status: false });

  res.json({
    userDeleted
  });
};

module.exports = {
  usuariosGet,
  usuariosPut,
  usuariosPost,
  usuariosDelete
};
