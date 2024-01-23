
import path from "path"

import { readFileSync } from "fs"

export const typeDefs = readFileSync(path.join(process.cwd(), 'src', 'schema.gql'), {
  encoding: "utf-8",
})