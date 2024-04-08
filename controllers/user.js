const { response } = require('express');

const usuariosGet = (req, res = response) => {
  const { q, edad, nombre = null } = req.query;

  res.json({
    data: 'GET-Controlado',
    q,
    edad,
    nombre
  });
};

const usuariosPut = (req, res = response) => {
  const id = req.params.id;
  res.json({
    data: 'PUT-Controlado',
    id
  });
};

const usuariosPost = (req, res = response) => {
  const body = req.body;

  res.json({
    data: 'POST-Controlado',
    body
  });
};

const usuariosDelete = (req, res = response) => {
  res.json({
    data: 'DELETE-Controlado'
  });
};

module.exports = {
  usuariosGet,
  usuariosPut,
  usuariosPost,
  usuariosDelete
};
