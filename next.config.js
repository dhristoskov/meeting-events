const path = require('path');

module.exports = {
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },

  env: {
    MONGODB_URI: "mongodb+srv://dimitar_hristoskov:HO6tzQdS8WE5Rs3C@cluster0.ghk0w.mongodb.net/eventsDB?retryWrites=true&w=majority",
    JWT_SECRET: "hWmZq4t7w9z$C&F)J@NcRfUjXn2r5u8x/A%D*G-KaPdSgVkYp3s6v9y$B&E(H+Mb"
  }
}


