/* eslint-disable quote-props,comma-dangle,semi,quotes,linebreak-style,no-console,require-await,indent */
/* Imports */
const express = require('express')
const chalk = require('chalk')
const debug = require('debug')('app')
// const morgan = require('morgan')

const path = require('path')
const http = require('http')
const _ = require('lodash')
const bodyParser = require('body-parser')
const cors = require('cors')

const cookieParser = require('cookie-parser')
const mongoose = require('mongoose')

const router = express.Router()
const authRouter = require('./public/routes/authRouter')

/* Variable Declaration */
const app = express()
const API = 'https://5b77ff72b859970014478529.mockapi.io/api/v1/'
const PORT = process.env.PORT || 4100

app.use(cookieParser())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use(cors)
// app.use(morgan('tiny'))
app.use(express.static(path.join(__dirname, '/public')))
app.set('views', './public/views')
app.set('view engine', 'ejs')
app.use('/auth', authRouter)
// require('./public/config/passport.config')('app')


app.use('/css', express.static(
    path.join(__dirname, 'node_modules\materialize-css\dist\css')
))
app.use('/js',
    express.static(path.join(__dirname, 'node_modules\materialize-css\dist\js')));

const users = [
    {
        'id': '1',
        'name': 'Adolf Trantow DVM',
        'email': 'abc@abc.com',
        'password': '123456',
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
        'email': '_@abc.com',
        'password': '123456',
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
const trips = [
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


/* Database methods */

/* Method declaration */
/* sign-in APIs */
app.post('/signin', (req, res) => {
    const body = req.body;
    const userEmail = body.email;
    const userPassword = body.password;
    const result = _.findIndex(users, {email: userEmail, password: userPassword});
    if (result !== -1) {
        res.send(`User found :\n ${JSON.stringify(users[result])}`);
        console.log('User Found');
    } else {
        res.send('User not found');
        console.log('User not found');
    }
});

/* sign-up APIs */
router.route('/users/:id').get((req, res) => {
    const id = req.params.id
    const result = _.findIndex(users, {id});
    console.log(`Result output : ${result}`)
    if (result > -1) {
        res.send(users[result])
    } else {
        res.send('No resource found')
    }
})

app.post('/users', (req, res) => {
    const body = req.body;
    const bodyLength = Object.keys(req.body).length;
    const userLength = Object.keys(users[0]).length;
    if (bodyLength === userLength) {
        const id = body.id;
        const name = body.name;
        const email = body.email;
        const password = body.password;
        const contact = body.contact;

        const addUser = {
            'id': id,
            'name': name,
            'email': email,
            'password': password,
            'contact': contact
        }
        // users.push(addUser)
        // res.send('User added');
        mongoose.model('users', users)
        console.log(users)
    } else {
        res.send("Invalid Schema")
        console.log("Schema not correct");
    }
})
app.put('/users', (req, res) => {
    const body = req.body;
    const id = body.id;
    console.log(`PUT ID: ${id}`)
    res.send(`This is PUT Method: ${id}`);
});
// TODO: Complete PUT Request

app.get('/users', (req, res) => {
    console.log("App.get() Function")
    const _user = mongoose.model('users', users);
    _user.find({}, (err, data) => {
        console.log(`>>>${data}`);
        res.send(data);
    })
})
/* Trip APIs */
router.route('/trip').get((req, res) => {
    res.send(trips)
})
router.route('/trip/:id').get((req, res) => {
    const id = req.params.id
    const result = _.findIndex(trips, {trip_id: id})
    console.log(`Result output : ${result}`)
    if (result > -1) {
        res.send(trips[result])
    } else {
        res.send('No resource found')
    }
})
app.delete('/trip/:id', (req, res) => {
    const id = req.params.id
    if (_.findIndex(users, id)) {
        const result = _.remove(trips, {trip_id: id})
        console.log(`Del result : ${result}`)
        console.log(trips)
        res.send('Trip removed')
    } else {
        res.send('No trip found')
    }
})

router.route('/admin').get((req, res) => {
    res.send("Admin route")
})

router.route('/admin/:id').get((req, res) => {
    res.send("Admin/ID  route")
})
router.route('/users').get((req, res) => {
    res.send("Users List");
})

router.route('/').get((req, res) => {
    res.send('Home Page')
})

app.use('/', router)
app.use('/', (req, res) => {
    res.render('index', {
        nav: [
            {
                link: '/users',
                title: 'Users'
            },
            {
                link: '/trip',
                title: 'Trips'
            },
            {
                link: '/admin',
                title: 'Admin'
            }
        ]
    })
})

// require('./public/routes/userRoutes')(app);


app.listen(PORT, () => {
    console.log(`Listening on port ${chalk.green(PORT)}`)
})
