import { Model } from "objection"
import { db } from "@/utils/db"

class Record extends Model {}

Record.knex(db)

export default Record
