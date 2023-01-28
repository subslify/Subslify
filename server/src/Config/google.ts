import User from '../models/User.js';
import {
  Profile,
  Strategy as GoogleStrategy,
  VerifyCallback,
} from 'passport-google-oauth20';
import generator from 'generate-password';
import { BadRequestError } from '../errors/index.js';
import { PassportStatic } from 'passport';

const randomPw: string = generator.generate({
  length: 10,
  numbers: true,
});

export default function (passport: PassportStatic) {
  // persist user data (after successful authentication) into session
  passport.serializeUser((user: { id: string }, done: VerifyCallback) => {
    return done(null, user.id);
  });

  // deserializeUser is used to retrieve user data from session
  passport.deserializeUser((id: string, done: VerifyCallback) => {
    User.findById(id, (err: string, user: Object) => {
      return done(err, user);
    });
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

        try {
          // check wether the email has been used for a user store in DB
          let user = await User.findOne({ email: profile.emails[0].value });
          console.log('find user:', user);
          // if not, create user
          if (!user) {
            user = await User.create(newUser);
            return done(null, user);
            // else if check wether user.oauth is falsy(empty) then add then profile info to user.oauth
          } else if (!user.oauth) {
            user.oauth = newUser.oauth;
            await user.save();
            return done(null, user);
          }
          return done(null, user);
        } catch (err) {
          throw new BadRequestError('Error in Google Oauth');
        }
      }
    )
  );
}
