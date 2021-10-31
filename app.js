const express = require('express')
const app = express()

const bodyParser = require('body-parser')
const session = require('express-session')

const index = require('./routers/index')

app.use(session({
 secret: '@@',
 resave: false,
 saveUninitialized: true
}))

const jade = require('jade')

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.set('port',process.env.PORT || 3000)
app.set('view engine','jade')
app.set('views',__dirname+'/views')
app.use(express.static(__dirname+'/public'))

app.use('/',index)

app.listen(3000, function(){
    console.log(`Conneted ${app.get("port")} port!`)
})