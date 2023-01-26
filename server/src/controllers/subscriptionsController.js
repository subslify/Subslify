import Subscription from '../models/Subscription.ts';
import { StatusCodes } from 'http-status-codes';
import { UnAuthenticatedError } from '../errors/index.js';

const createSubscription = async (req, res) => {
  const { name, price, frequency, startDate, status, endDate, logoUrl, notes } =
    req.body;
  const user = req.user.id;
  if (!user) {
    throw new UnAuthenticatedError('User not found');
  }
  await Subscription.create({
    name,
    price,
    frequency,
    startDate,
    user,
    status,
    endDate,
    logoUrl,
    notes,
  });
  res.status(StatusCodes.CREATED).json({ message: 'Subscription created' });
};

const getSubscriptions = async (req, res) => {
 
  const user = req.user.id;
  const filter = {
    user,
    ...req.query, // TODO: sanitize query
  };
  const subscriptions = await Subscription.find(filter).exec();
  res.status(StatusCodes.OK).json(subscriptions);
};

const getOneSubscription = async (req, res) => {
  Subscription.findById(req.params.id)
    .then((subscription) => res.status(StatusCodes.OK).json(subscription))
    .catch((err) => res.status(400).json('Error: ' + err));
};

const updateSubscription = async (req, res) => {
  Subscription.findByIdAndUpdate(req.params.id, req.body)
    .then((subscription) =>
      res.status(StatusCodes.OK).json('Subscription updated.')
    )
    .catch((err) => res.status(400).json('Error: ' + err));
};

const deleteSubscription = async (req, res) => {
  Subscription.findByIdAndDelete(req.params.id)
    .then(() => res.status(StatusCodes.OK).json('Subscription deleted.'))
    .catch((err) => res.status(400).json('Error: ' + err));
};

export {
  createSubscription,
  updateSubscription,
  deleteSubscription,
  getSubscriptions,
  getOneSubscription,
};
