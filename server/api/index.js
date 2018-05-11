//const express = require('express')
//const router = express.Router();
//const addRecipe = require('./add-recipe')
import { Router } from 'express'
import addRecipe from './add-recipe'
import getRecipes from './get-recipes'
const router = Router()

router.use(addRecipe)
router.use(getRecipes)

export default router