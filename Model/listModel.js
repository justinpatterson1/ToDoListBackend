const mongoose = require( 'mongoose' );
const { Schema } = mongoose;

const listSchema = new Schema({
  name: String, // String is shorthand for {type: String}
  item: String,
  date: Date
});

const listModel = mongoose.model("list",listSchema)
module.exports = listModel;