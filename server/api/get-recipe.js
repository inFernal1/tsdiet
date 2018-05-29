import { Router } from 'express'
import Recipe from '../models/recipe'

const router = Router();

router.get('/get-recipe/:id',function(req,res,next) {
    let id = req.params.id;
    Recipe.findById(id).exec().then(doc => { 
        res.status(200).json(doc); 
        }).catch(err => { 
        console.log(err); 
        res.status(500).json({error:err}); 
        })
})

export default router;