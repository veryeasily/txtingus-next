// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next"
import superjson from "superjson"
import { db } from "@/utils/db"
import { Prompt } from "@prisma/client"

type Data = {
  data?: string | Prompt[]
  error?: { message: string }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  if (req.method === "POST") {
    await db.prompt.create({ data: { content: req.body.content } })
    return res.status(200).json({ data: "Prompt created" })
  }

  if (req.method === "GET") {
    const prompts = await db.prompt.findMany()
    return res.status(200).json({ data: superjson.stringify(prompts) })
  }

  return res.status(405).json({ error: { message: "Method not allowed" } })
}
