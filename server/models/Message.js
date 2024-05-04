
import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  text: String,
  sender: String,
  lawyerId: mongoose.Types.ObjectId,
  clientId: mongoose.Types.ObjectId,
});

const Message = mongoose.model('Message', messageSchema);

export default Message;