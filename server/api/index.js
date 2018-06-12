import { Router } from 'express'
import addRecipe from './add-recipe'
import getRecipes from './get-recipes'
import filterRecipes from './filter-recipes'
import getRecipe from './get-recipe'
import getCountRecipes from './get-count-recipes'
const router = Router()

router.use(addRecipe)
router.use(getRecipes)
router.use(filterRecipes)
router.use(getRecipe)
router.use(getCountRecipes)

export default router