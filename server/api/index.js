//const express = require('express')
//const router = express.Router();
//const addRecipe = require('./add-recipe')
import { Router } from 'express'
import addRecipe from './add-recipe'

const router = Router()

router.use(addRecipe)

export default router