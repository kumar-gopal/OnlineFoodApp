import express, { Request, Response } from 'express';


const router = express.Router();

router.get("/getvandors",async(req,res)=>{
    res.send("working vandors");
});

export { router as vandorRoutes };
