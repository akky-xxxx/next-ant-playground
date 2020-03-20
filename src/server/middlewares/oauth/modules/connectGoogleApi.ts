/**
 * import node_modules
 */
import axios from "axios"

/**
 * main
 */
const connectGoogleApi = axios.create({ baseURL: "https://www.googleapis.com" })

export default connectGoogleApi
