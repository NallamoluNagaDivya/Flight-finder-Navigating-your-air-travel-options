import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  flightId: { type: mongoose.Schema.Types.ObjectId, ref: 'Flight' },
  seat: String,
  status: { type: String, default: 'Confirmed' },
});

export default mongoose.model('Booking', bookingSchema);
