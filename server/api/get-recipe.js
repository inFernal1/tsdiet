import { Router } from 'express'
import Recipe from '../models/recipe'

const router = Router();

router.get('/get-recipe',function(req,res,next) {
    let id = req.query.id;
    res.send(id);
})

export default router;