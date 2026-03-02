import {
  registerAdmin,
  loginAdmin,
  setMenuData,
  updateAdminProfile,
} from "../controllers/admin.js";
import { Router } from "express";
import { verifyJWT } from "../middlewares/authAdmin.middleware.js";

const router = Router();

router.route("/register").post(registerAdmin);
router.route("/login").post(loginAdmin);
router.route("/setmenu").post(setMenuData);
router.route("/update-profile").post(verifyJWT, updateAdminProfile);

export default router;
