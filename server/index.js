/*import express from "express"
import { Nuxt, Builder } from "nuxt"
import api from "./api"
import mongoose from "mongoose"
import session from "express-session"
import bodyParser from 'body-parser'
const db = require("./config/keys").MongoURI

mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("Connected To Mongo!!"))
  .catch(err => console.log(err))
const app = express()
const host = process.env.HOST || "127.0.0.1"
const port = process.env.PORT || 3000
app.set("port", port)
//app.use(express.urlencoded({ extended: true }))
app.use(
  session({
    secret: "super-secret-key",
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 60000 }
  })
)

app.use("/api", api)

// Import and Set Nuxt.js options
let config = require("../nuxt.config.js")
config.dev = !(process.env.NODE_ENV === "production")
async function start() {
  // Init Nuxt.js
  const nuxt = new Nuxt(config)

  // Build only in dev mode
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  }

  // Give nuxt middleware to express
  app.use(nuxt.render)

  // Listen the server
  app.listen(port, host)
  console.log("Server listening on http://" + host + ":" + port) // eslint-disable-line no-console
}
start()
module.exports = app*/

import express from 'express'
import bodyParser from 'body-parser'
import {
  Nuxt,
  Builder
} from 'nuxt'
import api from './api'
import mongoose from 'mongoose'
import session from 'express-session'

let db = 'mongodb://infernal:infernal11221156@ds119445.mlab.com:19445/tsd'
mongoose.connect(db,{useNewUrlParser: true},err => {
  if(err) {
    console.log(err)
  }
  console.log('connected db')
})

const app = express()
const host = process.env.HOST || '127.0.0.1'
const port = process.env.PORT || 3000
app.set('port', port)

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(session({
  secret: 'super-secret-key',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 60000 }
}))

app.use('/api', api)


// Import and Set Nuxt.js options
let config = require('../nuxt.config.js')
config.dev = !(process.env.NODE_ENV === 'production')
async function start() {
  // Init Nuxt.js
  const nuxt = new Nuxt(config)

  // Build only in dev mode
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  }

  // Give nuxt middleware to express
  app.use(nuxt.render)

  // Listen the server
  app.listen(port, host)
  console.log('Server listening on http://' + host + ':' + port) // eslint-disable-line no-console
}
start()
module.exports = app
