type StatusMessages = Record<number, string>

const STATUS_MESSAGES: StatusMessages = {
  401: "認証に失敗しました。再ログインしてください",
  500: "Internal Server Error",
}

export default STATUS_MESSAGES
