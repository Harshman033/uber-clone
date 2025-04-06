import { Router } from 'express';
import {body} from 'express-validator'
import { loginUser, logoutUser, registerUser, userProfile } from '../controllers/user.controller.js';
import { verifyJwt } from '../../middlewares/auth.middleware.js';

const router = Router();

router.route('/register').post([
body('email').isEmail().withMessage('Invalid Email'),
body('fullName.firstName').isLength({min:3}).withMessage('First Name should be of 3 characters atleast'),
body(`password`).isLength({min:6}).withMessage('Password should be of 6 characters atleast')
],
 registerUser);

 
router.route('/login').post([
    body('email').isEmail().withMessage('Invalid Email'),
    body(`password`).isLength({min:6}).withMessage('Password should be of 6 characters atleast')
    ],
loginUser);

router.route('/logout').post( verifyJwt, logoutUser);

router.route('/user-profile').get( verifyJwt, userProfile);

export {router}