import express from "express"
import { createprojectcontroller, getprojecttreecontroller } from "../../controllers/projectController.js";

const router=express.Router();

router.post('/',createprojectcontroller);
router.get('/:projectId/tree',getprojecttreecontroller);

export default router;
