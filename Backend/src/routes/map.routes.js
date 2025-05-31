import { Router } from 'express';
import { verifyJwt } from '../../middlewares/auth.middleware.js';
import { distanceAndTime, locationDetails } from '../controllers/map.controller.js';

const router = Router();

router.route('/locationDetails').get(locationDetails);

router.route('/distance-time').post(distanceAndTime)

export {router};