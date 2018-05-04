import { Router } from 'express'
import addRecipe from './add-recipe'
const router = Router()
router.use(addRecipe)

export default router