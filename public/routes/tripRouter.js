/* Separate routes files are not working */

/* eslint-disable semi */
const express = require('express')

function router(Trips) {
  const tripRouter = express.Router()
  const tripController = require('../controllers/tripController')(Trips);

  tripRouter.route('/')
    .get(tripController.getTrip)
    .post(tripController.postTrip)

  // Find trip by id
  // This is a middleware
  tripRouter.use('/:id', (req, res, next) => {
    Trips.findById(req.params.id, (err, trips) => {
      if (err) {
        res.status(304).send(err);
      } else if (trips) {
        req.trips = trips;
        next();
      } else {
        res.status(500).send('No Trips found')
      }
    })
  })

  tripRouter.route('/:id')
    .get(tripController.getTripById)
    .patch(tripController.patchTripById)
    .delete(tripController.deleteTripById);
  return tripRouter
}

module.exports = router
