import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

export const env = createEnv({
  /**
   * Specify your server-side environment variables schema here. This way you can ensure the app
   * isn't built with invalid env vars.
   */
  server: {
    // DATABASE_URL: z.string().url(),
    NODE_ENV: z
      .enum(["development", "test", "production"])
      .default("development"),
  },

  clientPrefix: "EXPO_PUBLIC_",

  /**
   * Specify your client-side environment variables schema here. This way you can ensure the app
   * isn't built with invalid env vars. To expose them to the client, prefix them with
   * `EXPO_PUBLIC_`.
   */
  client: {
    // EXPO_PUBLIC_API_CLIENTVAR: z.string(),
    EXPO_PUBLIC_API_URL: z.string().url(),
  },

  runtimeEnv: {
    // DATABASE_URL: process.env.DATABASE_URL,
    NODE_ENV: process.env.NODE_ENV,
    EXPO_PUBLIC_API_URL: process.env.EXPO_PUBLIC_API_URL,
  },
  // Optional: skipValidation and emptyStringAsUndefined
  emptyStringAsUndefined: true,
});
