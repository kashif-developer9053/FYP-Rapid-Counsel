
import mongoose from "mongoose";

const Contract = mongoose.model('Contract', {
  title: String,
  duration: String,
  contractType: String,
  price: Number,
  description: String,
  lawyerId: mongoose.Types.ObjectId,
  createdBy: mongoose.Types.ObjectId,
  lawyerName: String,
  creatorName: String,
  feedback: String,

  status: {
    type: String,
    enum: ['pending', 'start'],
    default: 'pending'
  }
});


export default Contract;