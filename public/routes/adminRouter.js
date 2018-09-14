/* Separate routes files are not working */

/* eslint-disable semi */
const express = require('express')


const adminRouter = express.Router()

function router() {
  adminRouter.route('/').get((req, res) => {
    res.send('Admin Insertion Link')
  })
}

module.exports = router
