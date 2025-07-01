// server/seedFlights.js
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Flight from './models/Flight.js';

dotenv.config();
await mongoose.connect(process.env.MONGO_URI);
console.log('✅ MongoDB connected');

const cities = ['Delhi', 'Mumbai', 'Chennai', 'Bangalore', 'Hyderabad', 'Kolkata', 'Goa'];
const airlines = ['IndiGo', 'Air India', 'SpiceJet', 'Vistara', 'Go First'];

function getRandomCity(exclude) {
  let city;
  do {
    city = cities[Math.floor(Math.random() * cities.length)];
  } while (city === exclude);
  return city;
}

const flights = [];

for (let d = 0; d < 10; d++) {
  const baseDate = new Date();
  baseDate.setDate(baseDate.getDate() + d);

  for (let i = 0; i < 5; i++) {
    const from = cities[Math.floor(Math.random() * cities.length)];
    const to = getRandomCity(from);
    const airline = airlines[Math.floor(Math.random() * airlines.length)];

    const departure = new Date(baseDate);
    departure.setHours(6 + i * 3); // e.g. 6AM, 9AM

    const arrival = new Date(departure);
    arrival.setHours(departure.getHours() + 2); // 2-hour flight

    flights.push({
      airline,
      from,
      to,
      departure,
      arrival,
      seatsAvailable: Math.floor(Math.random() * 50) + 50,
      price: Math.floor(Math.random() * 2000) + 3000,
    });
  }
}

await Flight.deleteMany();
await Flight.insertMany(flights);

console.log(`✅ Inserted ${flights.length} flights`);
process.exit();
