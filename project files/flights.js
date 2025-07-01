// server/routes/flights.js
import express from 'express';
import Flight from '../models/Flight.js';

const router = express.Router();

/* ----- 1️⃣  get ONE flight by id --------------- */
router.get('/:id', async (req, res) => {
  try {
    const flight = await Flight.findById(req.params.id);
    if (!flight) return res.status(404).json({ error: 'Flight not found' });
    res.json(flight);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

/* ----- 2️⃣  get ALL flights -------------------- */
router.get('/', async (_req, res) => {
  const flights = await Flight.find();
  res.json(flights);
});

/* ----- other routes (POST, DELETE, etc.) ------- */
export default router;
