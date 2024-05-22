import mongoose from "mongoose";
import Users from "../models/userModel.js";
import Jobs from "../models/jobsModel.js"
import jwt from "jsonwebtoken";

export const updateUser = async (req, res, next) => {
  const {
    firstName,
    lastName,
    email,
    contact,
    location,
    profileUrl,
    jobTitle,
    about,
  } = req.body;

  try {
    if (!firstName || !lastName || !email || !contact || !jobTitle || !about) {
      next("Please provide all required fields");
    }

    const id = req.body._id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).send(`No User with id: ${id}`);
    }

    const updateUser = {
      firstName,
      lastName,
      email,
      contact,
      location,
      profileUrl,
      jobTitle,
      about,
      _id: id,
    };

    const user = await Users.findByIdAndUpdate(id, updateUser, { new: true });

    const token = user.createJWT();

    user.password = undefined;

    res.status(200).json({
      sucess: true,
      message: "User updated successfully",
      user,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error.message });
  }
};

export const getUser = async (req, res, next) => {
  try {
    const id = req.body.user.userId;

    const user = await Users.findById({ _id: id });

    if (!user) {
      return res.status(200).send({
        message: "User Not Found",
        success: false,
      });
    }

    user.password = undefined;

    res.status(200).json({
      success: true,
      user: user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "auth error",
      success: false,
      error: error.message,
    });
  }
};

export const getApplications = async (req,res,next) =>
{
  try{
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const id = decodedToken.id;

    const user = await Users.findById(id);

    if(!user)
    {
      return res.status(200).send({
        message: "User Not Found",
        success: false,
      });
    }
    
    const jobsWithUser = await Jobs.find({ application: { $in: [id] } }).populate({
      path: "company",
      select: "-password",
    });

    res.status(200).json({
      message: "Jobs with User's Application",
      jobs: jobsWithUser,
      success: true,
    });

  } catch (error) 
  {
    console.log(error);
    res.status(500).json({
      message: "Error",
      success: false,
      error: error.message,
    });
  }
}



export const getUserDetails = async (req, res, next) => {
  const { id } = req.params;
  console.log(id)
  try {

    const user = await Users.findById(id);
    if (!user) {
      return res.status(404).json({
        message: "User Not Found",
        success: false,
      });
    }

    user.password = undefined;

    res.status(200).json({
      success: true,
      seeker: user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal Server Error",
      success: false,
      error: error.message,
    });
  }
};
export const getAllUsers = async (req, res) => {
  try {
    const users = await Users.find();
    res.json(users);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error fetching lawyers' });
  }
};
