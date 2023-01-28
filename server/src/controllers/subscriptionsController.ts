import Subscription from '../models/Subscription.js';
import { StatusCodes } from 'http-status-codes';
import { UnAuthenticatedError } from '../errors/index.js';
import { RequestHandler, Request, Response } from 'express';
import { IUser } from './definitions.js';

interface IRequestQuery {status? : string, frequency?: string, sort?: string; search?: string};

interface IFilter {userId: string, status? : string, frequency?: string, sort?: string; search?: string, name?: {}};

const createSubscription: RequestHandler = async (req: Request, res: Response) => {
  const { name, price, frequency, startDate, status, endDate, logoUrl, notes } =
    req.body;
  const user: IUser = req.user;
  const userId = user.id;
  if (!userId) {
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

const getSubscriptions: RequestHandler = async (req: Request<{}, {}, {}, IRequestQuery>, res: Response) => {
  const user: IUser = req.user; 
  const userId = user.id;
  
  if (!userId) {
    throw new UnAuthenticatedError('User not found');
  }
  const { status, frequency, sort, search } = req.query;
  
  const filter: IFilter = { userId };
  filter.status = status ? status : 'active';
  filter.frequency = frequency ? frequency : 'monthly';
  if (search) {
    filter.name = { $regex: search, $options: 'i' };
  }
  
    // mongoSort method
  const result = Subscription.find(filter);
  if (sort === "cost") {
    result.sort('price');
  } else if (sort === "alphabetical") {
    result.sort('name');
  } else if(sort === 'payment due'){
    result.sort('startDate')
  }

  const subscriptions = await result;

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
