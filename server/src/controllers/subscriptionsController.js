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
  // if user sort by 'cost', or 'alpha'
  if (sort === "cost") {
    result.sort((a,b)=>  a-b);
  } else if (sort === "alphabetical") {
    result.sort((a,b)=>  a-b);
  }

  
  //sort price, maybe date();
  
  const subscriptions = await result;
  console.log(subscriptions);


  // add Subscription.find().sort({obj})?
  res.status(StatusCodes.OK).json({ subscriptions });
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
