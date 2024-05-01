import JWT from "jsonwebtoken";
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();


const userAuth = async (req, res, next) => {
  const authHeader = req?.headers?.authorization;

  if (!authHeader || !authHeader?.startsWith("Bearer")) {
    console.log("Authentication failed: No Bearer token found");
    next("Authentication failed");
  }

  const token = authHeader?.split(" ")[1];
  console.log("Token:", token);

  try {
    const userToken = JWT.verify(token, process.env.JWT_SECRET_KEY);
    console.log("User Token:", userToken);

    req.body.user = {
      userId: userToken.userId,
    };
    console.log("User ID in request body:", req.body.user.userId);

    next();
  } catch (error) {
    console.log("Authentication failed:", error);
    next("Authentication failed");
  }
};


export default userAuth;