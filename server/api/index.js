//const express = require('express')
//const router = express.Router();
//const addRecipe = require('./add-recipe')
import { Router } from 'express'
import addRecipe from './add-recipe'
import getRecipes from './get-recipes'
import filterRecipes from './filter-recipes'
const router = Router()

router.use(addRecipe)
router.use(getRecipes)
router.use(filterRecipes)

export default router