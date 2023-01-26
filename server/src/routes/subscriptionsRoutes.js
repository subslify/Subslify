import express from 'express';
import {
  createSubscription,
  updateSubscription,
  deleteSubscription,
  getSubscriptions,
  getOneSubscription,
} from '../controllers/subscriptionsController.js';

const router = express.Router();

router.route('/').post(createSubscription).get(getSubscriptions);

router
  .route('/:id')
  .get(getOneSubscription)
  .patch(updateSubscription)
  .delete(deleteSubscription);

export default router;
