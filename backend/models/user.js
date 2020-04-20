let mongoose = require("mongoose");
let uniqueValidator = require("mongoose-unique-validator");
let passportLocalMongoose = require("passport-local-mongoose");

var UserSchema = mongoose.Schema({
  email: {
    type: String,
    index: true,
    unique: true,
    required: true
  },
  username: {
    type: String,
    index: true,
    unique: true,
    required: true
  },
  //account activated
  active: {
    type: Boolean
  }, 
  login: {
    type: Boolean
  },
  dateOfRegistration: {
    type: Date
  }
});

UserSchema.plugin(uniqueValidator);
UserSchema.plugin(passportLocalMongoose, {
  findByUsername: function(model, queryParameters) {
    queryParameters.active = true;
    return model.findOne(queryParameters);
  }
});

let User = mongoose.model("users", UserSchema);
module.exports = {
  User
};