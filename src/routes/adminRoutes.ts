import express, { Request, Response } from 'express';
import {CreateVendor,updateVendor,getVendor,getVendorById,deleteVendor} from "../controllers/adminControllers";

const router = express.Router();

router.post("/",CreateVendor);
router.put("/:id",updateVendor);
router.get("/",getVendor);
router.get("/:id",getVendorById);
router.delete("/:id",deleteVendor);

export { router as adminRoutes };
