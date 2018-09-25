/* eslint-disable semi */
const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const authRouter = express.Router()

function router() {
  authRouter.route('/signup').post((req, res) => {
    res.send(req.body)
  })
  return authRouter
}

module.exports = router

