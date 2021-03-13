const path = require('path');

module.exports = {
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },

  env: {
    MONGODB_URI: "mongodb+srv://dimitar_hristoskov:HO6tzQdS8WE5Rs3C@cluster0.ghk0w.mongodb.net/eventsDB?retryWrites=true&w=majority"
  }
}

// module.exports = {
//   env: {
//     MONGODB_URI: "mongodb+srv://dimitar_hristoskov:HO6tzQdS8WE5Rs3C@cluster0.ghk0w.mongodb.net/eventsDB?retryWrites=true&w=majority"
//   }
// }

