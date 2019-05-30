import { Router } from "express"
import Recipe from "../models/recipe"

const router = Router()

router.post("/filter-recipes", function(req, res, next) {
  let tags = req.body.tags
  let elemsCount = parseInt(req.body.elems)
  Recipe.find({
    "tags.0": { $in: tags[0] },
    "tags.1": { $in: tags[1] },
    "tags.2": { $in: tags[2] },
    "tags.3": { $in: tags[3] }
  })
    .skip(elemsCount)
    .limit(5)
    .exec((err, recipes) => res.json(recipes))
})
export default router
