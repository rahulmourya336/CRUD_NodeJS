/* eslint-disable semi */
const express = require('express')

function router(Users) {
  const authRouter = express.Router()

  const authController = require('../controllers/authController')(Users);
  authRouter.route('/signin')
    .post(authController.signin);

  authRouter.route('/signup')
    .post(authController.signup);

  return authRouter;
}

module.exports = router
