import { betterAuth } from "better-auth";
import clientPromise from "./db";

export const auth = betterAuth({
  database: {
    provider: "mongodb",
    clientPromise,
  },

  emailAndPassword: {
    enabled: true,
  },
});