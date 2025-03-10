import { Schema, model, ObjectId, Types } from 'mongoose';

enum Frequency {
  Monthly,
  Quarterly,
  Yearly,
}

enum Status {
  Active,
  Cancelled,
  Paused,
  Trial,
}

interface Note {
  body: String;
  createdAt: Date;
}

interface SubscriptionSchemaType extends Document {
  name: {
    type: string;
  };
  price: {
    type: number;
  };
  frequency: {
    type: string;
    enum: Frequency;
  };
  status?: {
    type: string;
    enum: Status;
    default: string;
  };
  startDate: {
    type: Date;
  };
  endDate?: {
    type: string;
  };
  logoUrl?: {
    type: string;
  };
  notes?: Types.DocumentArray<Note>;
  user: {
    type: ObjectId; // Schema.Types.ObjectId?
    ref: string;
  };
}

const SubscriptionSchema: Schema<SubscriptionSchemaType> = new Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
  },
  frequency: {
    type: String,
    enum: ['monthly', 'quarterly', 'yearly'],
    required: [true, 'Frequency is required'],
  },
  status: {
    type: String,
    enum: ['active', 'cancelled', 'trial'], //removed 'paused'
    default: 'active',
  },
  startDate: {
    type: Date,
    required: [true, 'Start date is required'],
  },
  endDate: {
    type: Date,
  },
  logoUrl: {
    type: String,
  },
  notes: [
    {
      body: String,
      createdAt: { type: Date, default: Date.now },
    },
  ],
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User is required'],
  },
});

export default model('Subscription', SubscriptionSchema);
