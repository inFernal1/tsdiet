import { Router } from "express"
//import user from "../models/user"
//import passport from "passport"
const router = Router()

router.post("/login", function(req, res) {
  console.log(req.body)
  console.log(req.body.email)
  console.log(req.body.password)
  res.send('hello')
})

router.post("/register", function(req, res) {
  console.log(req.body.email);
  res.send('hello')
})
router.post("/logout", function(req, res, next) {
  delete req.session.authAdmin
  res.json({ ok: true })
})
export default router
