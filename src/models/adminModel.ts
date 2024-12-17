import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { Document } from "mongoose";
interface Admin extends Document {
    name: string;
    phonenumber: number;
    email: string;
    password: string;
    isSuperAdmin: boolean;
    matchPassword(enteredPassword: string): Promise<boolean>;
  }

const adminSchema = new mongoose.Schema<Admin>({
    name:{
        type:String,
        required:true
    },
    phonenumber:{
        type:Number,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    isSuperAdmin:{
        type:Boolean,
        default:false
    }
}); 

adminSchema.pre<Admin>('save', async function (next) {
    if (!this.isModified('password')) {
      next();
    }
    const salt = await bcrypt.genSalt(10);                                                                                                      
    this.password = await bcrypt.hash(this.password, salt);
  });
  adminSchema.methods.matchPassword = async function (enteredPassword:string): Promise<boolean> {
    return await bcrypt.compare(enteredPassword, this.password);
  };

  const AdminModel = mongoose.model<Admin>('Admin', adminSchema);

  export default AdminModel;


