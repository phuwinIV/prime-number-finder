import mongoose from 'mongoose';

const historySchema = mongoose.Schema(
   {
      inputStart: { type: Number, require: true },
      inputEnd: { type: Number, require: true },
      primeNumber: { type: Array, require: true },
      countPrimeNumber: { type: Number, require: true },
   },
   {
      timestamps: true,
   }
);

const History = mongoose.model('History', historySchema);

export default History;
