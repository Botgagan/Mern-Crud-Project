import express from 'express';
import { handleSignUpUserController, handleSignInUserController,handleGoogleLoginController } from '../controllers/user.controller.js';

const router = express.Router();

router.post("/signup", handleSignUpUserController);
router.post("/login", handleSignInUserController);
router.post("/google-login", handleGoogleLoginController);

export default router;