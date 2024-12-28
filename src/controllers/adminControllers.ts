import { Request,Response,NextFunction} from "express";
import { RequestHandler } from "express";
import { CreateVendorInput } from '../dto/vendor.dto';
import {Vendor} from "../models";
import { generateSalt,generateHashPassword } from "../utility";


export const CreateVendor = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { name, address, pincode, foodType, email, password, ownerName, phone } = req.body as CreateVendorInput;
  
      // Check if all required fields are present
      const requiredFields = ["name", "address", "pincode", "foodType", "email", "password", "ownerName", "phone"];
      const missingField = requiredFields.find(field => !req.body[field]);
  
      if (missingField) {
        res.status(400).json({
          message: `${missingField} is required.`,
          success: false,
        });
        return;
      }
  
      // Check if the vendor already exists
      const isExistsVendor = await Vendor.findOne({ email });
      if (isExistsVendor) {
         res.status(400).json({
          message: "Vendor already exists.",
          success: false,
        });
        return;
      }
  
      // Generate password hash and salt
      const salt = await generateSalt();
      const userPassword = await generateHashPassword(password, salt);
  
      // Create the new vendor (using spread operator for brevity)
      const createdVendor = await Vendor.create({
        ...req.body,  // Spread the body fields
        password: userPassword,  // Override password with the hashed value
        salt: salt,  // Add the salt
        serviceAvailabe: false,  // Default service availability
        coverImage: [],  // Default cover image
        rating: 0,  // Default rating
      });
  
      res.status(201).json({
        message: "Vendor created successfully!",
        success: true,
        vendor: createdVendor,
      });
    } catch (error: any) {
      // Improved error handling
      const errorMessage = error.message || "Failed to create vendor.";
      res.status(500).json({
        message: errorMessage,
        success: false,
      });
    }
  };


export const updateVendor: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;

    const updatedVendor = await Vendor.findByIdAndUpdate(
      id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedVendor) {
        res.status(404).json({
        success: false,
        message: "The vendor you're trying to update is not available!",
      });
      return; // Explicitly return after sending the response
    }

    res.status(200).json({
      success: true,
      message: "Vendor updated successfully!",
      vendor: updatedVendor,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "Vendor update failed due to an unexpected error.",
    });
  }
};



export const getVendor = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const page = parseInt(req.query.page as string) || 1; // Ensure query params are strings
      const limit = parseInt(req.query.limit as string) || 10;
  
      const skip = (page - 1) * limit;
  
      // Fetch paginated vendors
      const vendors = await Vendor.find().skip(skip).limit(limit);
  
      // Count total documents
      const totalVendors = await Vendor.countDocuments();
  
      res.status(200).json({
        message: "Vendors fetched successfully",
        totalPages: Math.ceil(totalVendors / limit),
        currentPage: page,
        vendors: vendors,
      });
    } catch (error: any) { 
      res.status(500).json({
        message: "There was a problem fetching vendors",
        error: error.message,
      });
    }
  };
  
export const getVendorById = async(req:Request,res:Response,next:NextFunction)=>{
    try {
        const {id} = req.params;
        const isExistsVendor = await Vendor.findById(id);
         if(!isExistsVendor){
            res.status(400).json({
                message : "Vandor is not  exists ",
                success : false,
            })
         }
        res.status(200).json({
            message : "Fetched vandor successfully",
            success : true,
            vandor : isExistsVendor
        });
    } catch (error : any) {
        res.status(400).json({
            message : error.message,
            success : false,
            error : "getting issue while fetching vandor"
        })
    }
}



export const deleteVendor = async(req:Request,res:Response,next:NextFunction)=>{
    try {
        const {id} = req.params;
        const deletedVendor = await Vendor.findByIdAndDelete(id);
        if (!deletedVendor) {
            res.status(400).json({
                message : "Vandor not found",
                success : false
            })
        } 
        res.status(200).json({
            message : "Vandor is deleted successfully",
            success : true,
            vandor : deletedVendor
        })

    } catch (error:any) {
        res.status(200).json({
            message : error.message,
            success : false,
            vandor : "Failed to delete vandor"
        })
    }
} 