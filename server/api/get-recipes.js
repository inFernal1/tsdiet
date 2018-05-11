import { Router } from 'express'
import Recipe from '../models/recipe'

const router = Router();

router.get('/get-recipes',function(req,res,next) {
    let elemsCount = req.query.elems;
    Recipe.find({}).sort({createdDate:-1}).skip(elemsCount).limit(5).exec((err,recipes) => res.json(recipes))
    //console.log(req.query.elems)
  })
  export default router;