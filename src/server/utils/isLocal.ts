/**
 * import node_modules
 */
import dotenv from "dotenv"

/**
 * main
 */
dotenv.config()
export default process.env.ENV === "LOCAL"
