import { Router } from 'express';
import {body} from 'express-validator'
import { verifyJwt, verifyJwtForCaptain } from '../../middlewares/auth.middleware.js';
import { loginCaptain, logoutCaptain, registerCaptain } from '../controllers/captain.controller.js';

const router = Router();

router.route('/register').post([
    body('email').isEmail().withMessage('Invalid Email'),
    body('fullName.firstName').isLength({min:3}).withMessage('First Name should be of 3 characters atleast'),
    body(`password`).isLength({min:6}).withMessage('Password should be of 6 characters atleast'),
    body('vehicle.color').isLength({min:3}).withMessage('color should be of 3 characters atleast'),
    body('vehicle.plate').isLength({min:3}).withMessage('plate should be of 3 characters atleast'),
    body('vehicle.vehicleType').isIn(["car", "motorcycle", "auto"]).withMessage('Invalid vehicle'),
    body('vehicle.capacity').isLength({min:1}).withMessage('Capacity should be atleast 1'),
],

registerCaptain

);

router.route('/login').post([
body('email').isEmail().withMessage('Invalid email'),
body(`password`).isLength({min:6}).withMessage('Password should be of 6 characters atleast'),
],
loginCaptain
)

router.route('/logout').post(verifyJwtForCaptain, logoutCaptain);





export {router}