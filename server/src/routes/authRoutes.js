import express from 'express';
import passport from 'passport';
import attachCookies from '../utils/attachCookies.js';
import {
  register,
  login,
  updateUser,
  getCurrentUser,
  logout,
} from '../controllers/authController.js';
import authenticateUser from '../middleware/auth.js';

const router = express.Router();

router.route('/register').post(register);
router.route('/login').post(login);
router.route('/updateUser').patch(authenticateUser, updateUser);

//GET /auth/google 
router.route('/google').get(
  passport.authenticate(
    'google'
  )
);

router.route('/google/redirect').get(
  passport.authenticate('google', {
    failureRedirect: process.env.AUTH_FAILURE_ROUTE
  }),
  /* create JWT token, with the authenticate token to access '/' endpoint */
  (req, res) => {
    console.log('req/user:', req.user); //user info stored in req.user from passport deserialize
    const token = req.user.createJWT();
    attachCookies({ res, token });
    res.redirect(process.env.AUTH_SUCCESS_ROUTE);
  }
);

router.route('/getCurrentUser').get(authenticateUser, getCurrentUser);
router.route('/logout').get(logout);

export default router;
