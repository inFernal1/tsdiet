import { Router } from "express"
import admin from "../models/admin"

const router = Router()

router.post("/login", function(req, res, next) {
  console.log("hi")
  if (req.body.login === "admin" && req.body.login === "admin") {
    req.session.authAdmin = { login: "admin" }
    return res.json({ login: "admin" })
  }
  res.status(401).json({ error: "Bad credentials" })
})

router.post("/logout", function(req, res, next) {
  delete req.session.authAdmin
  res.json({ ok: true })
})
export default router
