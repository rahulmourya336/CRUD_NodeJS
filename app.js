/* Imports */
var express = require('express')
var chalk = require('chalk')
var debug = require('debug')('app')
var morgan = require('morgan')
var path = require('path')
var router = express.Router()
var http = require('http')
var _ = require('lodash')
var bodyParser = require('body-parser')

/* Variable Declaration */
var app = express()
API = 'https://5b77ff72b859970014478529.mockapi.io/api/v1/'
PORT = process.env.PORT || 4100
app.use(morgan('tiny'))
app.use(express.static(path.join(__dirname, '/public')))
app.use('/css', express.static(
  path.join(__dirname, 'node_modules\materialize-css\dist\css')))
app.use('/js',
  express.static(path.join(__dirname, 'node_modules\materialize-css\dist\js')))
app.set('views', './public/views')
app.set('view engine', 'ejs')

app.use(bodyParser.json()) // support json encoded bodies
app.use(bodyParser.urlencoded({extended: true})) // support encoded bodies
var users = [
  {
    'id': '1',
    'name': 'Adolf Trantow DVM',
    'email': 'Gilbert.Beer34@hotmail.com',
    'password': 'vVmr0eH6YwIqlMP',
    'contact': '415.707.9608 x26767'
  },
  {
    'id': '2',
    'name': 'Darius Bode',
    'email': 'Brigitte58@hotmail.com',
    'password': 'CCswVOWTgkpdKn7',
    'contact': '1-454-171-2245'
  },
  {
    'id': '3',
    'name': 'Rex Kling',
    'email': 'Eloy.Rau@yahoo.com',
    'password': 'Yj1g_VY3pca2CXi',
    'contact': '896-546-3380'
  },
  {
    'id': '4',
    'name': 'Emile Kihn',
    'email': 'Caroline0@gmail.com',
    'password': 'NPVQBn1fruRxgMn',
    'contact': '850-156-8006'
  }
]
var trips = [
  {
    'trip_id': '1',
    'trip_image': 'http://lorempixel.com/640/480/business',
    'trip_name': 'matrix',
    'trip_start_date': '2018-09-09T11:43:50.127Z',
    'trip_end_date': '2019-05-24T19:20:16.470Z',
    'trip_Creator_id': 30
  },
  {
    'trip_id': '2',
    'trip_image': 'http://lorempixel.com/640/480/business',
    'trip_name': 'port',
    'trip_start_date': '2018-09-09T00:17:48.596Z',
    'trip_end_date': '2019-01-14T18:35:51.594Z',
    'trip_Creator_id': 29
  },
  {
    'trip_id': '3',
    'trip_image': 'http://lorempixel.com/640/480/sports',
    'trip_name': 'panel',
    'trip_start_date': '2018-09-08T22:54:59.180Z',
    'trip_end_date': '2018-11-09T18:23:43.529Z',
    'trip_Creator_id': 60
  }
]

/* Method declaration */
router.route('/users').get(function (req, res) {
  res.send(users)
})
router.route('/users/:id').get(function (req, res) {

  var id = req.params.id
  var result = _.findIndex(users, {id: id})
  console.log('Result output : ' + result)
  if (result > -1) {
    res.send(users[result])
  }
  else {
    res.send('No resource found')
  }

})

router.route('/trip').get(function (req, res) {
  res.send(trips)
})
router.route('/trip/:id').get(function (req, res) {

  var id = req.params.id
  var result = _.findIndex(trips, {trip_id: id})
  console.log('Result output : ' + result)
  if (result > -1) {
    res.send(trips[result])
  }
  else {
    res.send('No resource found')
  }

})

app.post('/users', function (req, res) {
  var addUser = {
    'id': '5',
    'name': 'Trantow DVM',
    'email': 'Beer34@hotmail.com',
    'password': 'vqweqeqw',
    'contact': '415.70726767'
  }
  users.push(addUser)
  res.send("User added")
  console.log(users)
})

app.delete('/users/:id', function (req, res) {
var id = req.params.id
var result = _.remove(users, {id:id})
  if (typeof result === 'object') {
    console.log('Del result : ' + result)
    console.log(users)
    res.send('user removed')
  } else {
    res.send('No user found')
  }
})

app.use('/', router)
app.use('/', function (req, res) {
  res.render('index', {
    nav: [
      {
        link: '/users',
        title: 'Users'
      },
      {
        link: '/trip',
        title: 'Trips'
      }]
  })
})

app.use('/users', function (req, res) {
  res.send(API + '/users')
})

app.listen(PORT, function () {
  console.log('Listening on port ' + chalk.green(PORT))
})
