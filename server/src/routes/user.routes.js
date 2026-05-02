import { Router } from 'express';
import {
  loginUser,
  registerUser,
  logOutUser,
  refreshAccessToken,
  getCurrentUser,
} from '../controllers/user.controller.js';
import { jwtVerify } from '../middlewares/auth.middleware.js';

const router = Router();

router.route('/register').post(registerUser);
router.route('/login').post(loginUser);

// secured routes
router.route('/logout').post(jwtVerify, logOutUser);
router.route('/refresh-access-token').post(refreshAccessToken);
router.route('/current-user').get(jwtVerify, getCurrentUser);

export default router;
