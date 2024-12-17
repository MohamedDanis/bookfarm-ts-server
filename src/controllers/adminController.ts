import asyncHandler from "express-async-handler";
import AdminModel from "../models/adminModel";
import { Request, Response } from "express";
import { adminLogin, adminRegister } from "../../typing";
import generateToken from "../utils/generateToken"; 

// @desc    Auth admin & get token
// @route   POST /api/admin/signin
// @access  Public
export const authAdmin = asyncHandler(async(req:Request<{},{},adminLogin>,res:Response)=>{
    const {email,password}=req.body

    const admin = await AdminModel.findOne({ email:email });
  console.log(admin,8876);
  if (admin && (await admin.matchPassword(password))) {
    const token=await generateToken({ id: admin._id, role: "admin" });
    res.json({
     token
    });
  } else {
    res.status(500);
    throw new Error("Invalid email or password");
  }
})  

// @desc    Register admin
// @route   POST /api/su/registeradmin
// @access  Private
export const registerAdmin = asyncHandler(async (req:Request<{},{},adminRegister>, res:Response) => {
  console.log(req.body);
  
  const { name, email, password, phonenumber } = req.body;
  const adminExists = await AdminModel.findOne({ email });
  if (adminExists) {
    res.status(400);
    throw new Error("admin already exists");
  }
  const admin = await AdminModel.create({
    name,
    email,
    password,
    phonenumber,
  });
  if (admin) {
    res.status(201).json({
      id: admin._id,
      name: admin.name,
      email: admin.email,
      phone: admin.phonenumber,
    });
  } else {
    res.status(400);
    throw new Error("Invalid admin data");
  }
});

// @desc    update profile
// @route   PUT /api/admin/profile
// @access  Private
export const updateAdminProfile = asyncHandler(async (req:Request, res:Response) => {
  if (req.admin) {
    const admin = await AdminModel.findById(req.user);

    if (admin) {
      admin.name = req.body.name || admin.name;
      admin.email = req.body.email || admin.email;

      if (req.body.password) {
        admin.password = req.body.password;
      }

      const updatedAdmin = await admin.save();

      res.json({
        _id: updatedAdmin._id,
        name: updatedAdmin.name,
        email: updatedAdmin.email,
        phonenumber: updatedAdmin.phonenumber,
      });
    } else {
      res.status(404);
      throw new Error("User not found");
    }
  } else {
    res.status(401).json({ msg: "Need admin access" });
  }
});