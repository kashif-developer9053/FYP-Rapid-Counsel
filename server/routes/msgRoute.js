
import express from "express";
const router = express.Router();
import Message from "../models/Message.js";

router.post('/messages', async (req, res) => {
  try {
    const { text, sender, lawyerId, clientId } = req.body;
    const message = new Message({ text, sender, lawyerId, clientId });
    await message.save();
    res.status(201).json(message);
  } catch (error) {
    res.status(400).json({ error: 'Failed to send message' });
  }
});

export default router;