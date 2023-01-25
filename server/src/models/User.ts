import { Schema, model, Document, Model } from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

interface IsEmailOptions {
  allow_display_name?: boolean;
  allow_utf8_local_part?: boolean;
  require_tld?: boolean;
}


interface UserSchemaType extends Document {
  name: {
    type: string;
    required: boolean;
    minLength: number;
    maxLength: number;
    trim: boolean;
  };
  email: {
    type: string;
    required: boolean;
    validate: {
      validator: (str: string, options?: IsEmailOptions) => boolean;
      message: string;
    };
    unique: boolean;
  };
  password: string;
  oauth: OauthSchemaType | null;
}

interface OauthSchemaType {
  provider: string;
  userId: string;
  userEmail: string;
}

const OauthSchema: Schema<OauthSchemaType> = new Schema({
  provider: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
    unique: true,
  },
  userEmail: {
    type: String,
    required: true,
    unique: true,
  },
});

const UserSchema: Schema<UserSchemaType> = new Schema({
  name: {
    type: String,
    required: [true, 'Please provide a name'],
    minLength: 3,
    maxLength: 30,
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Email is required'],

    validate: {
      validator: validator.isEmail,
      message: 'Email is not valid',
    },
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minLength: 6,
    maxLength: 30,
    select: false,
  },
  oauth: OauthSchema,
});

UserSchema.methods.createJWT = function (): string {
  const token = jwt.sign(
    {
      userId: this._id,
    },
    process.env.JWT_SECRET_KEY,
    { expiresIn: process.env.JWT_TOKEN_EXPIRATION_TIME }
  );
  return token;
};

UserSchema.methods.comparePasswords = async function (
  password: string
): Promise<boolean> {
  return await bcrypt.compare(password, this.password);
};

UserSchema.pre<UserSchemaType>('save', async function (): Promise<void> {
  if (!this.isModified('password')) return;
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(this.password, salt);
  this.set('password', hashedPassword);
});

interface UserModel extends Model<UserSchemaType> {}

const User: UserModel = model('User', UserSchema);

export default User;
