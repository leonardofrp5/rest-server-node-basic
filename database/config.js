const mongoose = require('mongoose');

const dbConnections = async () => {
  try {
    await mongoose.connect(process.env.MONGO_ATLAS, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('BD online');
  } catch (error) {
    console.log(error);
    throw new Error('Error en la BD');
  }
};

module.exports = {
  dbConnections
};
