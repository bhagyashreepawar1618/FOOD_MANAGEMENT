import {
  registerAdmin,
  loginAdmin,
  setMenuData,
} from "../controllers/admin.js";
import { Router } from "express";

const router = Router();

router.route("/register").post(registerAdmin);
router.route("/login").post(loginAdmin);
router.route("/setmenu").post(setMenuData);

export default router;
