import { Router } from 'express'
import Recipe from '../models/recipe'

const router = Router();

router.get('/get-recipes',function(req,res,next) {
    let elemsCount = parseInt(req.query.elems);
    Recipe.find({})
    .skip(elemsCount).limit(5).exec((err,recipes) => {
      if (err) return console.log(err);
      res.json(recipes)
    })

  })
  export default router;