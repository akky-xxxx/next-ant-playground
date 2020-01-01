import { GoogleToken } from "gtoken"
import dotenv from "dotenv"

dotenv.config()

export default new GoogleToken({
  keyFile: process.env.IAM_CREDENTIAL,
  email: process.env.IAM_EMAIL,
  scope: ["https://www.googleapis.com/auth/iam"],
})
