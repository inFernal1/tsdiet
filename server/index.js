//const express = require('express')
//const api = require('./api');
//const bodyParser = require('body')
//const { Nuxt, Builder } = require('nuxt')
import express from 'express'
import bodyParser from 'body-parser'
import {
  Nuxt,
  Builder
} from 'nuxt'
import api from './api'
import mongoose from 'mongoose'

const Schema = mongoose.Schema;
mongoose.connect('mongodb://localhost/tsd',err => {
  if(err) {
    console.log(err)
  }
  console.log('connected db')
})

const recipesSchema = new Schema({
  title: {
    type: 'string'
  },
  description : {
    type: 'string'
  },
  image: {
    type: 'string'
  },
  ingredients: {

  }
})

const app = express()
const host = process.env.HOST || '127.0.0.1'
const port = process.env.PORT || 3000
app.set('port', port)

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
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
