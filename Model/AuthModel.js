const mongoose = require( 'mongoose' );
const { Schema } = mongoose;

const AuthSchema = new Schema({
  firstName: String, 
  lastName:String,// String is shorthand for {type: String}
  email: String,
  password: String
});

const AuthModel = mongoose.model("auth",AuthSchema)
module.exports = AuthModel;