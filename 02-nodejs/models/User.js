const mongoose = require('mongoose')

// Setup database
mongoose.Promise = Promise
mongoose.connect('mongodb://127.0.0.1:27017/mediastream-challenge')
// mongoose.connect('mongodb://localhost/mediastream-challenge')

const User = mongoose.model('user', {
  name: String,
  email: String
})

module.exports = User
