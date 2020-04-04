/**
 * import node_modules
 */
import dotenv from "dotenv"

dotenv.config()

export default process.env.NEED_AUTH === "TRUE"
