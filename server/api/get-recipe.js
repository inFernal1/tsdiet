import { Router } from 'express'
import Recipe from '../models/recipe'

const router = Router();

router.get('/get-recipe/:id',function(req,res,next) {
    let id = req.params.id;
    Recipe.findOne({_id: id}).exec((err,recipe) => res.json(recipe))
})

export default router;