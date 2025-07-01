import mongoose from 'mongoose';

const flightSchema = new mongoose.Schema({
  airline: String,
  from: String,
  to: String,
  departure: Date,
  seatsAvailable: Number,
  price: Number,
});

export default mongoose.model('Flight', flightSchema);
