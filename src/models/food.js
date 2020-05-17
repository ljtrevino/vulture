// import node modules
const mongoose = require('mongoose');

// define a schema
const FoodModelSchema = new mongoose.Schema({
  creator_id: String,
  creator_name: String,
  food_type: String,
  building: String,
  room: String,
  quantity: String,
  vendor: String,
  notes: String,
  posting_time: String,
  latitude: Number,
  longitude: Number,
  expire_at: {type: Date, default: Date.now, expires: 3600}, //expires after 1 hour
  food_image: String
});

// compile model from schema
module.exports = mongoose.model('FoodModel', FoodModelSchema);
