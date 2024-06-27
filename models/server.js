const express = require('express');
const cors = require('cors');

const { dbConnections } = require('../database/config');

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.usuariosPath = '/api/usuarios';

    // conectar a BD
    this.conectarDB();

    //Middlewares
    this.middlewares();

    // Rutas APP
    this.routes();
  }

  async conectarDB() {
    await dbConnections();
  }

  middlewares() {
    // cors
    this.app.use(cors());
    // Lectura y parseo de body
    this.app.use(express.json());
    this.app.use(express.static('public'));
  }

  routes() {
    this.app.use(this.usuariosPath, require('../routes/user'));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Se esta usando el puerto ${this.port}`);
    });
  }
}

module.exports = Server;
