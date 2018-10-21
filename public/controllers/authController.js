const authController = function (Users) {
  const signin = (req, res) => {
    const bodyLength = Object.keys(req.body).length;
    let query = {};

    if (req.body.email && req.body.password && bodyLength === 2) {
      query = req.body;
      console.log(req.body);
      Users.find(query, (err, users) => {
        err ? res.status(204).send(`No user found ${err}`) : res.status(200).send(users);
      });
    } else {
      res.send('Invalid API Params');
    }
  };
  const signup = (req, res) => {
    console.log(req.body);
    const bodyLength = Object.keys(req.body).length;
    console.log(bodyLength);
    // if (bodyLength === 5) {
    const newUser = new Users(req.body);
    newUser.save((err) => {
      // err ? res.send(err) : res.send('User added');
      if (err) {
        if (err.code === 11000) {
          res.json({ status: 202, message: 'already exist' });
        } else {
          res.json(404).end();
        }
      } else {
        res.json({ status: 201, message: 'user created' });
      }
    });
    // } else {
    //   res.send('Invalid Schema');
    //   console.log('Schema not correct');
    // }
  };

  return {
    signin,
    signup,
  };
}; // end of authContorller

module.exports = authController;
