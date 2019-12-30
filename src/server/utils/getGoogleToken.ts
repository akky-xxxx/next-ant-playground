/**
 * node_modules
 */
import dotenv from "dotenv"
import { TokenData } from "gtoken"
import axios, { AxiosResponse } from "axios"

/**
 * others
 */
import googleToken from "./googleToken"

dotenv.config()

/**
 * トークン情報を取得する
 */
export default async function getToken(): Promise<string | undefined> {
  return new Promise((resolve, reject) => {
    // トークンを取得しようとし、取得できなかったらエラーとする
    try {
      googleToken.getToken((error: Error | null, tokens?: TokenData) => {
        // トークン取得処理に失敗した時、正しく動作する
        if (error) throw error
        axios
          .post(
            process.env.BEARER_TOKEN_URL as string,
            {
              delegates: [],
              audience: process.env.BEARER_TOKEN_AUDIENCE,
              includeEmail: true,
            },
            {
              headers: {
                Authorization: `Bearer ${tokens?.access_token}`,
              },
            },
          )
          .then((result: AxiosResponse<{ token: string }>) => {
            resolve(result?.data?.token)
          })
          .catch((_error: Error) => {
            throw _error
          })
      })
    } catch (error) {
      console.error(error)
      reject(error)
    }
  })
}
