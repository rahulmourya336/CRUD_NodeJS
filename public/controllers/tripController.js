const tripController = function (Trips) {
  const getTrip = (req, res) => {
    Trips.find((err, users) => {
      err ? res.status(204).send(`No Trip Found ${err}`) : res.status(200).send(users);
    });
  };

  const postTrip = (req, res) => {
    const newTrip = new Trips(req.body);
    console.log(req.body);
    newTrip.save((err) => {
      err ? res.status(400).send(`Error: ${err}`) : res.send('Trip Created');
    });
  };

  const getTripById = (req, res) => {
    const query = req.trips;
    Trips.findById(query, (err, trips) => {
      err ? res.send('No trip found') : res.send(trips);
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
    req.trips.delete(req.body._id, (err) => {
      err ? res.status(500).send(err) : res.status(200).send('Trip Deleted');
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
