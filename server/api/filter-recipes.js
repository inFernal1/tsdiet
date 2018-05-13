import { Router } from 'express'
import Recipe from '../models/recipe'

const router = Router();

router.post('/filter-recipes',function(req,res,next) {
    /*let elemsCount = parseInt(req.query.elems);
    Recipe.find({},
      {title:1,description:1,caloriesHundred:1,calHundred:1,proteinHundred:1,fatHundred:1,carbHundred:1,image:1})
    .sort({createdDate:1})
    .skip(elemsCount).limit(5).exec((err,recipes) => res.json(recipes)) */
    //let queryTags = JSON.parse(JSON.stringify(req.query.tags));
    /*let tagsOne = req.body.tagsOne;
    let tagsTwo = req.body.tagsTwo;
    let tagsThree = req.body.tagsThree;
    let tagsFour = req.body.tagsFour; */
    let tags = req.body.tags;
    console.log(tags)
    let elemsCount = parseInt(req.body.elems);
    console.log(elemsCount)
    Recipe.find({
        "tags.0": {$in:tags[0]},
        "tags.1": {$in:tags[1]},
        "tags.2": {$in:tags[2]},
        "tags.3": {$in:tags[3]}
        /*$where:function() {
           for(let i = 0; this.tags.length > i; i++) {
             if(queryTags[i].length === 0) return true;
            if(this.tags[i] === queryTags[i][i] 
              || this.tags[i] === queryTags[i][i+1] 
              || this.tags[i] === queryTags[i][i+2] 
              || this.tags[i] === queryTags[i][i+3]) {
                return true};
           }
        }*/
        
    }).skip(elemsCount).limit(5).exec((err,recipes) => res.json(recipes))

  })
  export default router;