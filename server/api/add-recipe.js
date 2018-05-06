import { Router } from 'express'

const router = Router();
router.post('/administration/add', function(req,res,next) {
  console.log(req.body);
})

export default router