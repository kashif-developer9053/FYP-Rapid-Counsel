import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  text: String,
  sender: String,
  lawyerId: mongoose.Types.ObjectId,
  clientId: mongoose.Types.ObjectId,
  chatHistory: [{ type: String }] // add this field to store the chat history
});

const Message = mongoose.model("Message", messageSchema);

export default Message;