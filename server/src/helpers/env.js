import dotenv from "dotenv";
import { cwd } from "process";
import { resolve } from "path";
import { cleanEnv, num, str } from "envalid";

dotenv.config({ path: resolve(cwd(), ".env") });

export default cleanEnv(process.env, {
  PORT: num({ default: 3001 }),
  MONGO: str(),
  JWT: str(),
});
