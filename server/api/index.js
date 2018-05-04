//const express = require('express')
//const router = express.Router();
//const addRecipe = require('./add-recipe')
import { Router } from 'express'

const router = Router()

router.use(addRecipe)

export default router