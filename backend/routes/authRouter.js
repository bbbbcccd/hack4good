import express from 'express';

import * as AuthController from '../controllers/authController.js';

const authRouter = express.Router();

// login the user
authRouter.post('/user', AuthController.loginUser);

// login admins
authRouter.post('/admin', AuthController.loginAdmin);

export default authRouter;
