import dotenv from "dotenv";
import { cwd } from "process";
import { resolve } from "path";
import { cleanEnv, num, str } from "envalid";

dotenv.config({ path: resolve(cwd(), ".env") });

export default cleanEnv(process.env, {
  PORT: num({ default: 3001 }),
  MONGO: str(),
  JWT: str(),
  SMTP_HOST: str(),
  SMTP_PORT: num(),
  SMTP_USER: str(),
  SMTP_PASSWORD: str(),
  MAIL_SENDER: str(),
});
