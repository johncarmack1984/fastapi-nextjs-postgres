import { createKysely } from "@vercel/postgres-kysely";

import type { DB } from "./db";

const db = createKysely<DB>();

export default db;
