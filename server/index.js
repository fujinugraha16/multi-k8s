import redis from "redis";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { Pool } from "pg";

import keys from "./keys";

// Express App Setup
const app = express();
app.use(cors());
app.use(bodyParser.json());

// Postgres Client Setup
const pgClient = new Pool({
  user: keys.pgUser,
  host: keys.pgHost,
  database: keys.pgDatabase,
  password: keys.pgPassword,
  port: keys.pgPort,
});
pgClient.on("error", () => console.log("lost PG connection ..."));

pgClient
  .query("CREATE TABLE IF NOT EXISTS values (number INT)")
  .catch((err) => console.log(err));
