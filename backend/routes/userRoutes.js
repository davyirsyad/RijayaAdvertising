// File: backend/routes/userRoutes.js (LENGKAP)

import express from "express";
const router = express.Router();
import {
  authUser,
  registerUser,
  getUserProfile,
  updateUserProfile, // <-- Import fungsi baru
} from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";

router.post("/register", registerUser);
router.post("/login", authUser);

// Rute untuk profil
router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile); // <-- Tambahkan metode PUT

export default router;