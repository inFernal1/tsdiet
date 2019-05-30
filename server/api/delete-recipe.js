import { Router } from "express"
import Recipe from "../models/recipe"

const router = Router()

router.delete("/administration/delete-recipe/:id", (req, res, next) => {
  let id = req.params.id
  Recipe.deleteOne({ _id: id })
    .then(() => {
      res.sendStatus(200)
    })
    .catch(err => console.log(err))
})

export default router
