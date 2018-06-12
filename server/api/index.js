import { Router } from 'express'
import addRecipe from './add-recipe'
import getRecipes from './get-recipes'
import filterRecipes from './filter-recipes'
import getRecipe from './get-recipe'
import getCountRecipes from './get-count-recipes'
import auth from './auth'

const router = Router()

router.use(addRecipe)
router.use(getRecipes)
router.use(filterRecipes)
router.use(getRecipe)
router.use(getCountRecipes)
router.use(auth)

export default router