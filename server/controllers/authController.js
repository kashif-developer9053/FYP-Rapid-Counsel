import Users from "../models/userModel.js";
import jwt from 'jsonwebtoken';

export const register = async(req,res,next)=>{
    const {firstName,lastName,email,password}= req.body;

    if(!firstName)
    {
        next("First name is required");
        return;
    }
    if(!lastName)
    {
        next("Last name is required");
        return;
    }
    if(!password)
    {
        next("Password is required");
        return;
    }

    try
    {
        const userExist = await Users.findOne({ email });
        if(userExist)
        {
            next("Email address already exists");
            return;
        }

        const user = await Users.create({
            firstName,
            lastName,
            email,
            password,
        });

        const token = user.createJWT();
        res.status(201).send({
            success:true,
            message:"Account created successfully",
            user:{
                _id:user._id,
                firstName:user.firstName,
                lastName:user.lastName,
                email:user.email,
                accountType:user.accountType
            },
            token,
        });
    }
    catch(error)
    {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }

};

export const signIn = async(req,res,next) =>
{
    const {email,password} = req.body;
    try
    {
        if (!email || !password) {
            next("Please Provide User Credentials");
            return;
        }
      
        // find user by email
        const user = await Users.findOne({ email }).select("+password");
      
        if (!user) {
            next("Invalid email or password");
            return;
        }
      
        // compare password
        const isMatch = await user.comparePassword(password);
      
        if (!isMatch) {
            next("Invalid email or password");
            return;
        }
      
        user.password = undefined;
      
        const token = jwt.sign({ email: user.email, id: user._id }, '9053', { expiresIn: '1h' }); // Adjust expiresIn as needed
      
        res.status(201).json({
            success: true,
            message: "Login successfully",
            user,
            token,
        });
    }
    catch(error)
    {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};
