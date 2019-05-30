import { Router } from "express"
import Recipe from "../models/recipe"

const router = Router()

router.get("/get-recipes", (req, res, next) => {
  //let countDoc;
  //Recipe.count({}, (err, count) => {
  // if(err) return console.log(err);
  //countDoc = count;
  //console.log(countDoc)
  let elemsCount = parseInt(req.query.elems)
  Recipe.find({})
    .skip(elemsCount)
    .limit(5)
    .exec((err, recipes) => {
      if (err) return console.log(err)
      res.json(recipes)
    })
})
export default router
