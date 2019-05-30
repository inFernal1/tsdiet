import { Router } from "express"
import Recipe from "../models/recipe"

const router = Router()

router.get("/get-count-recipes", (req, res, next) => {
  Recipe.countDocuments({}, (err, count) => {
    if (err) return console.log(err)
    res.json(count)
  })
})
export default router
