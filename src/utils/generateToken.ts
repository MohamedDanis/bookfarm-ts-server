import jwt from "jsonwebtoken";
import { JWT_SECRET } from "..";
import { ObjectId } from "mongoose";

const generateToken = async ({ id, role }: { id: ObjectId|any; role: string }) => {
  const token = await jwt.sign({ id, role }, JWT_SECRET, {
    expiresIn: "30d",
  });

  return token;
};

export default generateToken;
