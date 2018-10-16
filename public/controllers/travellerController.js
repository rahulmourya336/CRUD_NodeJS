const travellerController = function (Travellers) {
  const getTraveller = (req, res) => {
    Travellers.find((err, users) => {
      err ? res.status(204).send(`No Traveller Found ${err}`) : res.status(200).send(users);
    });
  };

  const postTraveller = (req, res) => {
    const newTrip = new Travellers(req.body);
    console.log(req.body);
    newTrip.save((err) => {
      err ? res.status(400).send(`Error: ${err}`) : res.send('Traveller Created');
    });
  };

  const getTravellerById = (req, res) => {
    const query = req.travellers;
    Travellers.findById(query, (err, travellers) => {
      err ? res.send('No trip found') : res.send(travellers);
    });
  };

  const deleteTravellerById = (req, res) => {
    req.trips.delete(req.body._id, (err) => {
      err ? res.status(500).send(err) : res.status(200).send('Traveller Removed');
    });
  };

  return {
    getTraveller,
    postTraveller,
    getTravellerById,
    deleteTravellerById,
  };
};

module.exports = travellerController;
