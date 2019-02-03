import { Router } from 'express'
import Recipe from '../models/recipe'

const router = Router();
router.post('/administration/add', function(req,res,next) {
  Recipe.create(req.body, function(err){
    if(err) return console.log(err);
    else {
    console.log("Сохранен рецепт");
    res.sendStatus(200);
    }
});
})

export default router