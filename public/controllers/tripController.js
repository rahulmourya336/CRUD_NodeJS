const tripController = function (Trips) {
  const getTrip = (req, res) => {
    const ObjectId = require('mongoose').Types.ObjectId;
    const sort = { creation: -1 }
    const query = { creatorID: new ObjectId(req.query.id) };
    Trips.find(query, (err, users) => {
      if (err) {
        res.status(400).json({ status: 400, message: err });
      } else {
        console.log(typeof users);
        res.status(200).json(users);
      }
    });
  };

  const postTrip = (req, res) => {
    const newTrip = new Trips(req.body);
    console.log(req.body);
    newTrip.save((err) => {
      err ? res.status(400).json({ status: 400, message: err }) : res.status(201).json({ status: 201, message: 'Trip Created' });
    });
  };

  const getTripById = (req, res) => {
    const query = req.trips;
    console.log('query', query);
    Trips.findById(query, (err, trips) => {
      err ? res.status(400).json({ status: 400, message: err }) : res.send(trips);
    });
  };

  const patchTripById = (req, res) => {
    /**
       * This patch gets all the data including the _id. Which we don't want to modify.
       * So to prevent any modifications to _id. we'll remove _id from params
       */
    if (req.body._id) delete req.body._id;
    for (const index in req.body) {
      req.trips[index] = req.body[index];
    }
    req.trips.save((err) => {
      err ? res.status(500).send(err) : res.status(200).send('Trip Patched');
    });
  };

  const deleteTripById = (req, res) => {
    req.trips.delete(req.query._id, (err) => {
      err ? res.status(500).send({ status: 500, message: 'No Trip Found' }) : res.status(200).json({ status: 200, message: 'Trip Deleted' });
    });
  };

  return {
    getTrip,
    postTrip,
    getTripById,
    patchTripById,
    deleteTripById,
  };
};

module.exports = tripController;
