import express from "express"
import { pingChecker } from "../../controllers/pingController.js";
import projectRouter from "./projects.js"

const router=express.Router();

router.use('/ping',pingChecker);
router.use('/projects',projectRouter);

export default router;