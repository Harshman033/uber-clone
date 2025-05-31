import { Router } from 'express';
import { createRide, fetchFare } from '../controllers/ride.controller.js';
import { verifyJwt } from '../../middlewares/auth.middleware.js';

const router = Router();

router.route('/create-ride').post(verifyJwt, createRide);

router.route('/fare').post(verifyJwt, fetchFare);

export {router};