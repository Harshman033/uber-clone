import { Router } from 'express';
import {body} from 'express-validator'
import { registerUser } from '../controllers/user.controller.js';

const router = Router();

router.route('/register', [
body('email').isEmail().withMessage('Invalid Email'),
body(`${fullName.firstName}`).isLength({min:3}).withMessage('First Name should be of 3 characters atleast'),
body(`password`).isLength({min:6}).withMessage('Password should be of 6 characters atleast')
], registerUser)