import mongoose,{Schema,Document,model} from "mongoose";

interface VendorDocs extends Document{
    name: string;
    ownerName: string;
    foodType: [string];
    address : string;
    phone:string;
    pincode:number;
    email:string;
    password:string;
    salt:string;
    serviceAvailabe:string;
    coverImage:[string];
    rating:number;
    // foods:any;
}


const VendorSchema = new Schema({
    name: { type: String, required: true },
    ownerName: { type: String, required: true },
    foodType: { type: [String], required: true }, // Array of strings
    address: { type: String, required: true },
    phone: { type: String, required: true },
    pincode: { type: Number, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    salt: { type: String, required: true },
    serviceAvailable: { type: Boolean, default: false }, // Boolean for availability
    coverImage: { type: [String], required: false }, // Array of strings
    rating: { type: Number, default: 0 }, // Default rating
    foods: [{
        type:mongoose.SchemaTypes.ObjectId,
        ref:"food"
    }]
},{
    toJSON:{
        transform(doc,ret){
            delete ret.salt;
            delete ret.password;
            delete  ret.__v;
            delete  ret.createdAt;
            delete  ret.updatedAt;
        }
    },
    timestamps:true
});

const Vendor = mongoose.model<VendorDocs>("Vendor", VendorSchema);

export  {Vendor};
