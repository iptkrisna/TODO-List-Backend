import express from "express";
const userRouter = express.Router();
import { body, query } from 'express-validator';
import userAPI from '../api/user';

userRouter.post('/register', [
  body('email', 'Please provide a valid email').isEmail(),
  body('name', 'Please provide a valid name').custom(field => {
    return typeof field === 'string' && field.length !== 0
  }),
  body('role', 'Please provide a valid role').isIn([1, 2]),
  body('password', 'Password must at least 8 digit string').isLength({ min: 8 })
], userAPI.register);

userRouter.post('/login', [
  body('email', 'Please provide a valid email').isEmail(),
  body('password', 'Password must at least 8 digit string').isLength({ min: 8 })
], userAPI.login);

userRouter.post('/reset-password', [
  body('email', 'Please provide a valid email').isEmail()
], userAPI.resetPassword);

userRouter.post('/confirm-reset-password', [
  query('t', 'Please provide a valid token').isUUID(4),
  body('newPassword', 'New password must at least 8 digit string').isLength({ min: 8 })
], userAPI.confirmResetPassword);

userRouter.get('/confirm-reset-password', [
  query('t', 'Please provide a valid token').isUUID(4)
], userAPI.confirmResetPasswordPage);

export default userRouter;
