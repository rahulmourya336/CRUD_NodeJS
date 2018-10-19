
/* eslint-disable semi */
const express = require('express')

function router(Travellers) {
  const travellerRouter = express.Router()

  const travellerController = require('../controllers/travellerController')(Travellers);
  travellerRouter.route('/')
    .get(travellerController.getTraveller)
    .post(travellerController.postTraveller)

  // Find traveller by id
  travellerRouter.use('/:id', (req, res, next) => {
    Travellers.findById(req.params.id, (err, travellers) => {
      if (err) {
        res.status(304).send(err);
      } else if (travellers) {
        req.travellers = travellers;
        next();
      } else {
        res.status(500).send('No books found')
      }
    })
  })

  travellerRouter.route('/:id')
    .get(travellerController.getTravellerById)
    .delete(travellerController.deleteTravellerById);
  return travellerRouter
}

module.exports = router
