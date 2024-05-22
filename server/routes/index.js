import express from "express";

import authRoute from "./authRoute.js";
import userRoute from "./userRoute.js"
import companiesRoute from "./companiesRoute.js"
import jobRoute from "./jobRoute.js"
import msgRoute from "./msgRoute.js"
import contractRoute from "./contractRoute.js"
const router = express.Router();

// const path = "/api-v1/";

router.use(`/auth`, authRoute);
router.use(`/user`, userRoute); //api-v1/auth/
router.use(`/companies`,companiesRoute);
router.use(`/jobs`,jobRoute);
router.use(`/messages`,msgRoute);
router.use(`/contract`,contractRoute);

export default router;