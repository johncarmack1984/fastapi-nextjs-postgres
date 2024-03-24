import { createKysely } from "@vercel/postgres-kysely";

import type { DB } from "@/lib/db/db";

const db = createKysely<DB>();

export default db;
