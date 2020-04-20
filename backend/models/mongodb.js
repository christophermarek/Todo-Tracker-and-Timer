let MongoClient = require("mongodb").MongoClient;
let mongoose = require("mongoose");

mongoose
    .connect(process.env.mongoUrl, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        auth: {
            user: process.env.mongoUsername,
            password: process.env.mongoPassword
        }
    })
    .then(() => console.log("connection successful"))
    .catch(err => console.error(err));

mongoose.Promise = global.Promise;

module.exports = {
  mongoose
};