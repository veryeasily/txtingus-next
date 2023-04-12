import Record from "./record";

class Prompt extends Record {
  id!: number;
  content!: string;
  created_at!: Date;
  updated_at!: Date;
  static tableName = "prompts";

  static async currentPrompt() {
    const prompt = await this.query().first() as Prompt;
    return prompt;
  }
}

export default Prompt;
