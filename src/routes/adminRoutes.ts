import { Router } from "express";
import { authAdmin, registerAdmin } from "../controllers/adminController";

const router = Router();

router.post('/signin',authAdmin)
router.post('/signup',registerAdmin)

export default router;