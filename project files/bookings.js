import express from 'express';
import Booking from '../models/Booking.js';
import Flight  from '../models/Flight.js';
import verifyToken from '../middleware/verifyToken.js';

const router = express.Router();

/* =========================================================
   POST /api/bookings  – Create a new booking
   Body: { flightId, seatCount }
   ======================================================== */
router.post('/', verifyToken, async (req, res) => {
  try {
    const { flightId, seatCount } = req.body;

    if (!flightId || !seatCount || seatCount < 1) {
      return res.status(400).json({ error: 'Invalid booking data' });
    }

    // 1️⃣ Find the flight
    const flight = await Flight.findById(flightId);
    if (!flight) return res.status(404).json({ error: 'Flight not found' });

    // 2️⃣ Check seat availability
    if (flight.seatsAvailable < seatCount) {
      return res.status(400).json({ error: 'Not enough seats available' });
    }

    // 3️⃣ Deduct seats and save flight
    flight.seatsAvailable -= seatCount;
    await flight.save();

    // 4️⃣ Create booking
    const booking = await Booking.create({
      userId:  req.user.id,
      flightId,
      seatCount,
      pricePaid: flight.price * seatCount,
      status: 'Confirmed',
    });

    return res.json({ message: 'Booking successful', booking });
  } catch (err) {
    console.error('Booking error:', err);
    return res.status(500).json({ error: 'Booking failed' });
  }
});

/* =========================================================
   GET /api/bookings  – List current user’s bookings
   ======================================================== */
router.get('/', verifyToken, async (req, res) => {
  try {
    const bookings = await Booking.find({ userId: req.user.id })
      .populate('flightId');
    res.json(bookings);
  } catch (err) {
    console.error('Fetch bookings error:', err);
    res.status(500).json({ error: 'Failed to fetch bookings' });
  }
});

/* =========================================================
   GET /api/bookings/:id – Get a single booking (optional)
   ======================================================== */
router.get('/:id', verifyToken, async (req, res) => {
  try {
    const booking = await Booking.findOne({
      _id: req.params.id,
      userId: req.user.id,           // ensure user owns the booking
    }).populate('flightId');

    if (!booking) return res.status(404).json({ error: 'Booking not found' });

    res.json(booking);
  } catch (err) {
    console.error('Fetch booking error:', err);
    res.status(500).json({ error: 'Failed to fetch booking' });
  }
});

export default router;
