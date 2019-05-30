import mongoose from "mongoose"
const Schema = mongoose.Schema
const adminSchema = new Schema({
  login: String,
  password: String
})
const Admin = mongoose.model("admin", adminSchema)
export default Admin
