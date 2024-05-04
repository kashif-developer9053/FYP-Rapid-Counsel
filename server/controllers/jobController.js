import mongoose from "mongoose";
import Jobs from "../models/jobsModel.js";
import Companies from "../models/companiesModel.js";
import Users from "../models/userModel.js";
import jwt from "jsonwebtoken";


export const createJob = async (req, res, next) => {
  try {
    const {
      jobTitle,
      jobType,
      location,
      salary,
      vacancies,
      experience,
      desc,
      requirements,
    } = req.body;
    console.log("Job Details:", req.body);

    if (
      !jobTitle ||
      !jobType ||
      !location ||
      !salary ||
      !requirements ||
      !desc
    ) {
      next("Please Provide All Required Fields");
      return;
    }

    // Access userId from req.body.user
    const userId = req.body.userId;
    console.log("User ID from request body:", userId);
    

    

    if (!mongoose.Types.ObjectId.isValid(userId))
      return res.status(404).send(`No Company with id: ${userId}`);
       

    const jobPost = {
      jobTitle,
      jobType,
      location,
      salary,
      vacancies,
      experience,
      detail: { desc, requirements },
      company: userId, // Assign userId as the company ID
    };

    const job = new Jobs(jobPost);
    await job.save();

    // Update the company information with job id
    const company = await Companies.findById(userId);

    company.jobPosts.push(job._id);
    await company.save(); // Save the updated company data

    res.status(200).json({
      success: true,
      message: "Job Posted Successfully",
      job,
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error.message });
  }
};



export const updateJob = async (req, res, next) => {
    try {
      const {
        jobTitle,
        jobType,
        location,
        salary,
        vacancies,
        experience,
        desc,
        requirements,
      } = req.body;
      const { jobId } = req.params;
  
      if (
        !jobTitle ||
        !jobType ||
        !location ||
        !salary ||
        !desc ||
        !requirements
      ) {
        next("Please Provide All Required Fields");
        return;
      }
      const id = req.body.user.userId;
  
      if (!mongoose.Types.ObjectId.isValid(id))
        return res.status(404).send(`No Company with id: ${id}`);
  
      const jobPost = {
        jobTitle,
        jobType,
        location,
        salary,
        vacancies,
        experience,
        detail: { desc, requirements },
        _id: jobId,
      };
  
      await Jobs.findByIdAndUpdate(jobId, jobPost, { new: true });
  
      res.status(200).json({
        success: true,
        message: "Job Post Updated Successfully",
        jobPost,
      });
    } catch (error) {
      console.log(error);
      res.status(404).json({ message: error.message });
    }
  };

  export const getJobPosts = async (req, res, next) => {
    try {
      const { search, sort, location, jtype, exp } = req.query;
      const types = jtype?.split(","); 
      const experience = exp?.split("-"); 
  
      let queryObject = {};
  
      if (location) {
        queryObject.location = { $regex: location, $options: "i" };
      }
  
      if (jtype) {
        queryObject.jobType = { $in: types };
      }
  
      if (exp) {
        queryObject.experience = {
          $gte: Number(experience[0]) - 1,
          $lte: Number(experience[1]) + 1,
        };
      }
  
      if (search) {
        const searchQuery = {
          $or: [
            { jobTitle: { $regex: search, $options: "i" } },
            { jobType: { $regex: search, $options: "i" } },
          ],
        };
        queryObject = { ...queryObject, ...searchQuery };
      }
  
      let queryResult = Jobs.find(queryObject).populate({
        path: "company",
        select: "-password",
      });
  
      // SORTING
      if (sort === "Newest") {
        queryResult = queryResult.sort("-createdAt");
      }
      if (sort === "Oldest") {
        queryResult = queryResult.sort("createdAt");
      }
      if (sort === "A-Z") {
        queryResult = queryResult.sort("jobTitle");
      }
      if (sort === "Z-A") {
        queryResult = queryResult.sort("-jobTitle");
      }
  
      // pagination
      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.limit) || 20;
      const skip = (page - 1) * limit;
  
      //records count
      const totalJobs = await Jobs.countDocuments(queryResult);
      const numOfPage = Math.ceil(totalJobs / limit);
  
      queryResult = queryResult.limit(limit * page);
  
      const jobs = await queryResult;
  
      res.status(200).json({
        success: true,
        totalJobs,
        data: jobs,
        page,
        numOfPage,
      });
    } catch (error) {
      console.log(error);
      res.status(404).json({ message: error.message });
    }
  };

  export const getJobById = async (req, res, next) => {
    try {
      const { id } = req.params;
  
      const job = await Jobs.findById({ _id: id }).populate({
        path: "company",
        select: "-password",
      });
  
      if (!job) {
        return res.status(200).send({
          message: "Job Post Not Found",
          success: false,
        });
      }
  
      //GET SIMILAR JOB POST
      const searchQuery = {
        $or: [
          { jobTitle: { $regex: job?.jobTitle, $options: "i" } },
          { jobType: { $regex: job?.jobType, $options: "i" } },
        ],
      };
  
      let queryResult = Jobs.find(searchQuery)
        .populate({
          path: "company",
          select: "-password",
        })
        .sort({ _id: -1 });
  
      queryResult = queryResult.limit(6);
      const similarJobs = await queryResult;
  
      res.status(200).json({
        success: true,
        data: job,
        similarJobs,
      });
    } catch (error) {
      console.log(error);
      res.status(404).json({ message: error.message });
    }
  }; 

  export const deleteJobPost = async (req, res, next) => {
    try {
      const { id } = req.params;
  
      await Jobs.findByIdAndDelete(id);
  
      res.status(200).send({
        success: true,
        message: "Job Post Delted Successfully.",
      });
    } catch (error) {
      console.log(error);
      res.status(404).json({ message: error.message });
    }
  };



  export const applyForJob = async (req, res, next) => {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    let userId = decodedToken.userId;
    console.log("User ID is: " + userId);
    try {
      const { id } = req.params;
      console.log("Job ID is: " + id);
      // Use userId to find the user
      const user = await Users.findById(userId);
      if (!user) {
        return res.status(404).json({ message: "User Not Found", success: false, });
      }
      const job = await Jobs.findById(id);
      if (!job) {
        return res.status(404).json({ message: "Job Not Found", success: false, });
      }
      if (job.application.includes(userId)) {
        return res.status(400).json({ message: "User already applied for this job", success: false, });
      }
      job.application.push(userId);
      await job.save();
      res.status(200).json({ message: "Application successful", success: true, });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal Server Error", success: false, error: error.message, });
    }
  };
  
  

  export const checkifApplied = async (req,res,next) =>
  {
    try{
      const { id } = req.params
      const token = req.headers.authorization.split(" ")[1];
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
      const userId = decodedToken.id;
      const user = await Users.findById({ _id: user_id });

      const job = await Jobs.findById({ _id: id });

      if (job.application.includes(user_id)) {
        return res.status(200).send({
          applicationstatus:true,
          success:true,
        }); 
    }
    else{
      return res.status(200).send({
        applicationstatus:false,
        success:true,
      });
    }
  }catch(error)
  {
    console.log(error)
  }
} 

export const applicantdetails = async(req,res,next) =>{
  try{
    const { id } = req.params
    const job = await Jobs.findById(id);
    const applicants = job.application
    return res.status(200).send({
      applicants:applicants,
      success:true
    })
  }catch(error)
  {
    console.log(error);
  }
}

