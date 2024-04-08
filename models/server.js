const express = require('express');
const cors = require('cors');

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.usuariosPath = '/api/usuarios';

    //Middlewares
    this.middlewares();

    // Rutas APP
    this.routes();
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
