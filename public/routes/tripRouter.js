/* Separate routes files are not working */

/* eslint-disable semi */
const express = require('express')

function router(Trips) {
  const tripRouter = express.Router()

  tripRouter.route('/')
    .get((req, res) => {
      Trips.find((err, users) => {
        err ? res.status(204).send(`No Trip Found ${err}`) : res.status(200).send(users);
      });
    })
    .post((req, res) => {
      const newTrip = new Trips(req.body)
      console.log(req.body)
      newTrip.save((err) => {
        err ? res.status(400).send(`Error: ${err}`) : res.send('Trip Created');
      })
    })

  // Find trip by id
  tripRouter.use('/:id', (req, res, next) => {
    Trips.findById(req.params.id, (err, trips) => {
      if (err) {
        res.status(304).send(err);
      } else if (trips) {
        req.trips = trips;
        next();
      } else {
        res.status(500).send('No books found')
      }
    })
  })

  tripRouter.route('/:id')
    .get((req, res) => {
      const query = req.trips
      Trips.findById(query, (err, trips) => {
        err ? res.send('No trip found') : res.send(trips)
      })
    })
    .put((req, res) => {
      Trips.findById(req.params.id, (err, trips) => {
        Trips.endDate = req.body.endDate;
        Trips.startDate = req.body.startDate;
        Trips.name = req.body.name;
        Trips.url = req.body.url;
        Trips.creatorID = req.body.creatorID;
        Trips.save((err) => {
          err ? res.status(304).send(`Trip Update error: ${err}`) : res.status(200).send('Trip updated');
        });
      })
    })
    .patch((req, res) => {
      /**
         * This patch gets all the data including the _id. Which we don't want to modify.
         * So to prevent any modifications to _id. we'll remove _id from params
         */
      if (req.body._id) delete req.body._id
      for (const index in req.body) {
        req.trips[index] = req.body[index];
      }
      req.trips.save((err) => {
        err ? res.status(500).send(err) : res.status(200).send('Trip Patched')
      })
    });
  return tripRouter
}

module.exports = router
