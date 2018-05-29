import { Router } from 'express'
import Recipe from '../models/recipe'

const router = Router();

router.get('/get-recipes',function(req,res,next) {
    let elemsCount = parseInt(req.query.elems);
    Recipe.find({},
      {title:1,description:1,caloriesHundred:1,calHundred:1,proteinHundred:1,fatHundred:1,carbHundred:1,image:1,tags:1})
    .sort({createdDate:1})
    .skip(elemsCount).limit(5).exec((err,recipes) => {
      if (err) return console.log(err);
      res.json(recipes)
    })

  })
  export default router;