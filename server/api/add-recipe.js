import { Router } from 'express'
import Recipe from '../models/recipe'

const router = Router();
router.post('/administration/add', function(req,res,next) {
  Recipe.create(req.body, function(err){
   // mongoose.disconnect();
    if(err) return console.log(err);
    else {
    console.log("Сохранен рецепт");
    res.sendStatus(200);
    //res.status(200).end();
    }
});
})

export default router