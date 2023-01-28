import Subscription from '../models/Subscription.js';
import { StatusCodes } from 'http-status-codes';
import { UnAuthenticatedError } from '../errors/index.js';
import { RequestHandler, Request, Response } from 'express';
import { IControllerRequest } from './definitions.js';

const createSubscription: RequestHandler = async (req: IControllerRequest, res: Response) => {
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

const getSubscriptions: RequestHandler = async (req: IControllerRequest, res: Response) => {
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
  if (sort === "cost") {
    result.sort('price');
  } else if (sort === "alphabetical") {
    result.sort('name');
  } else if(sort === 'payment due'){
    result.sort('startDate')
  }

  const subscriptions = await result;
  console.log(subscriptions);


  // add Subscription.find().sort({obj})?
  res.status(StatusCodes.OK).json({ subscriptions });
};

const getOneSubscription: RequestHandler = async (req: Request, res: Response) => {
  Subscription.findById(req.params.id)
    .then((subscription) => res.status(StatusCodes.OK).json(subscription))
    .catch((err) => res.status(StatusCodes.BAD_REQUEST).json('Error: ' + err));
};

const updateSubscription: RequestHandler = async (req: Request, res: Response) => {
  Subscription.findByIdAndUpdate(req.params.id, req.body)
    .then((subscription) =>
      res.status(StatusCodes.OK).json('Subscription updated.')
    )
    .catch((err) => res.status(StatusCodes.BAD_REQUEST).json('Error: ' + err));
};

const deleteSubscription: RequestHandler = async (req: Request, res: Response) => {
  Subscription.findByIdAndDelete(req.params.id)
    .then(() => res.status(StatusCodes.OK).json('Subscription deleted.'))
    .catch((err) => res.status(StatusCodes.BAD_REQUEST).json('Error: ' + err));
};

export {
  createSubscription,
  updateSubscription,
  deleteSubscription,
  getSubscriptions,
  getOneSubscription,
};
