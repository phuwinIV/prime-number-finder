import express from 'express';
import History from '../model/history.js';

const router = express.Router();

router.get('/', async (req, res) => {
   const histories = await History.find({});
   res.status(200).send(histories);
});

router.post('/', async (req, res) => {
   const histories = new History(req.body);

   const createHistory = await histories.save();
   res.status(201).json(createHistory);
});

export default router;
