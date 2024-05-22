
import Contract from "../models/Contract.js";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";

export const create = async (req, res) => {
  try {
    const { title, duration, contractType, price, description, lawyerId, createdBy, lawyerName , creatorName } = req.body;
    const contract = new Contract({
      title,
      duration,
      contractType,
      price,
      description,
      lawyerId,
      createdBy,
      lawyerName,
      creatorName,
      status: 'pending'
    });
    await contract.save();
    res.json(contract);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating contract' });
  }
};



// export const getAllContracts = async (req, res) => {
//   const token = req.headers.authorization.split(" ")[1];
//     const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
//     let userId = decodedToken.userId;
//   try {
  
//     const contracts = await Contract.find({ userId: userId });
//     res.json(contracts);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Error fetching contracts' });
//   }
// };
export const getAllContracts = async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const userId = decodedToken.userId;
    const contracts = await Contract.find({ createdBy: userId });
    res.json(contracts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching contracts' });
  }
};


export const getAllContractsLawyer = async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const userId = decodedToken.id;
    const contracts = await Contract.find({ lawyerId: userId });
    res.json(contracts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching contracts' });
  }
};




export const deleteContract = async (req, res) => {
  try {
    const contractId = req.params.id;
    await Contract.findByIdAndDelete(contractId);
    res.json({ message: 'Contract deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error deleting contract' });
  }
};


export const updateContract = async (req, res) => {
  try {
    const contractId = req.params.id;
    const updatedContract = await Contract.findByIdAndUpdate(contractId, { $set: { status: "started" } }, { new: true });
    res.json(updatedContract);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating contract' });
  }
};



export const endContract = async(req, res) => {
  try {
    const contractId = req.params.id;
    const status = req.body.status;
    const feedback = req.body.feedback;

    const contract = await Contract.findByIdAndUpdate(contractId, { $set: { status, feedback } }, { new: true });

    if (!contract) {
      return res.status(404).json({ message: 'Contract not found' });
    }

    return res.json({ message: 'Contract updated successfully' });
  } catch (error) {
    return res.status(500).json({ message: 'Error updating contract' });
  }
}



export const getLawyerContracts = async (req, res) => {

  try {
    const lawyerId = req.params.id;
    console.log("lawyer id Is" + req.params.id)

    const contracts = await Contract.find({ lawyerId: lawyerId });
    if (!contracts) {
      return res.status(404).json({ message: 'Contracts not found' });
    }
    return res.json(contracts);
  } catch (error) {
    return res.status(500).json({ message: 'Error fetching contracts' });
  }
}
