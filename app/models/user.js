var mongoose = require("mongoose");
var Schema = mongoose.Schema;
// define teammate schema
var UserSchema = new Schema({
  username: {type: String, required: true},
  gender: {type: String, required: true},
  age: {type: Number, required: true},
  favlang: {type: String, required: true},
  location: {type: [Number], required: true}, // [Long, Lat]!
  htmlverified: String, // not required
  created_at: {type: Date, default: Date.now},
  updated_at: {type: Date, default: Date.now}
}, {
  collection: "users"
});
// set created_at equal to the current time on save data
UserSchema.pre("save", function(next) {
  now = new Date();
  this.updated_at = now;
  if (!this.created_at) {
    this.created_at = now;
  }
  next();
})
// indexes this schema in 2dsphere format (critical for proximity search)
UserSchema.index({location: "2dsphere"})
module.exports = mongoose.model("User", UserSchema);
