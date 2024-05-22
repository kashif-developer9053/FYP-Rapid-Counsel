
import express from "express";
const router = express.Router();
import Message from "../models/Message.js";


router.post('/newMessage', async (req, res) => {
  try {
    const { text, sender, lawyerId, clientId } = req.body;
    const message = await Message.findOneAndUpdate(
      { lawyerId, clientId },
      { $push: { chatHistory: text } },
      { new: true }
    );
    res.status(201).json(message);
  } catch (error) {
    res.status(400).json({ error: 'Failed to send message' });
  }
});



export default router;