const Mongoose = require('mongoose');
const url = 'mongodb://127.0.0.1:27017/LojaEletronica';
Mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });;
module.exports = Mongoose;