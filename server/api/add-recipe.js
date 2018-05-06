import { Router } from 'express'

const router = Router();

router.post('/', function(req,res,next) {
  console.log(req.body.caption);
})
router.get('/', function(req,res,next) {
  console.log('nice to meet you');
  res.send('good for you')
})
export default router