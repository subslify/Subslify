import Subscription from '../models/Subscription.ts';
import { StatusCodes } from 'http-status-codes';
import {
  UnAuthenticatedError,
  BadRequestError,
  NotFoundError,
} from '../errors/index.js';

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

  if (!user) {
    throw new UnAuthenticatedError('User not found');
  }

  const { status, frequency, sort, search } = req.query;

  const filter = { user };

  filter.status = status ? status : 'active';
  filter.frequency = frequency ? frequency : 'monthly';

  if (search) {
    filter.name = { $regex: search, $options: 'i' };
  }

  //sort
  const result = Subscription.find(filter);

  // if user sort by 'cost', or 'alpha', using mongoSort method
  if (sort === 'cost') {
    result.sort('price');
  } else if (sort === 'A-Z') {
    result.sort('name');
  } else if (sort === 'Z-A') {
    result.sort('-name');
  } else if (sort === 'payment due') {
    result.sort('startDate');
  }

  const subscriptions = await result;

  // add Subscription.find().sort({obj})?
  res.status(StatusCodes.OK).json({ subscriptions });
};

const getOneSubscription = async (req, res) => {
  Subscription.findById(req.params.id)
    .then((subscription) => res.status(StatusCodes.OK).json(subscription))
    .catch((err) => res.status(400).json('Error: ' + err));
};

const updateSubscription = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    throw new NotFoundError('Subscription id not found');
  }

  const subscription = await Subscription.findById(id);
  if (!subscription) {
    throw new NotFoundError('Subscription not found');
  }
  // TODO: add values validation
  const updatedSubscription = await Subscription.findByIdAndUpdate(
    id,
    req.body,
    { new: true, runValidators: true }
  );

  res.status(StatusCodes.OK).json({ updatedSubscription });
};

const deleteSubscription = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    throw new NotFoundError('Subscription not found');
  }

  const subscription = await Subscription.findById(id);
  if (!subscription) {
    throw new NotFoundError('Subscription not found');
  }
  subscription.remove();
  res.status(StatusCodes.OK).json({ message: 'Subscription deleted' });
};

export {
  createSubscription,
  updateSubscription,
  deleteSubscription,
  getSubscriptions,
  getOneSubscription,
};
