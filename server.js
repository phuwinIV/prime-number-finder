import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import historyRoute from './routes/history.js';

const connectDB = async () => {
   try {
      const conn = await mongoose.connect(process.env.MONGO_URI, {
         useUnifiedTopology: true,
         useNewUrlParser: true,
      });

      console.log('MongoDB Connected: ' + conn.connection.host);
   } catch (error) {
      console.error(`Error: ${error.message}`);
      process.exit(1);
   }
};

dotenv.config();
connectDB();
const app = express();
app.use(express.json());

app.use('/api/history', historyRoute);

const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, '/client/build')));

app.get('*', (req, res) =>
   res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
);

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server   on ${PORT}`));
