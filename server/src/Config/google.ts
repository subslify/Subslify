import User from '../models/User.js';
import passport from 'passport';
import {
  Profile,
  Strategy as GoogleStrategy,
  VerifyCallback,
} from 'passport-google-oauth20';
import generator from 'generate-password';
import { BadRequestError } from '../errors/index.js';

const randomPw: string = generator.generate({
  length: 10,
  numbers: true,
});

export default function (passport: any) {
  passport.serializeUser((user: any, done: VerifyCallback) => {
    console.log('serialize user', user);
    done(null, user.id);
  });

  passport.deserializeUser((id: string, done: VerifyCallback) => {
    User.findById(id, (err: string, user: Object) => done(err, user));
  });

  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID!,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        callbackURL: process.env.GOOGLE_REDIRECT_URL,
        scope: ['email', 'profile'],
      },
      async (
        accessToken: string,
        refreshToken: string,
        profile: Profile,
        done: VerifyCallback
      ) => {
        console.log(profile);

        const newUser = {
          name: profile.displayName,
          email: profile.emails[0].value,
          password: randomPw,
          oauth: {
            provider: 'Google',
            userId: profile.id,
            userEmail: profile.emails[0].value,
          },
        };

        const addOauth = {
          provider: 'Google',
          userId: profile.id,
          userEmail: profile.emails[0].value,
        };

        try {
          // check wether the email has been used for a user store in DB
          let user = await User.findOne({ email: profile.emails[0].value });
          // if not, create user
          if (!user) {
            user = await User.create(newUser);
            done(null, user);
            // else if check wether user.oauth is falsy(empty) then add then profile info to user.oauth
          } else if (!user.oauth) {
            user.oauth = addOauth;
            await user.save();
            done(null, user);
          }
        } catch (err) {
          throw new BadRequestError('Error in Google Oauth');
        }
      }
    )
  );
}
