import Record from "./record"

class Message extends Record {
  id!: number
  role!: "assistant" | "system" | "user"
  content!: string
  created_at!: Date
  updated_at!: Date
  static tableName = "messages"

  static async prevForApi() {
    const messages = await this.query()
    return messages.map((m) => ({
      role: m.role as "user" | "assistant",
      content: m.content,
    }))
  }
}

export default Message
