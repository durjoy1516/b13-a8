import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";

const client = new MongoClient(process.env.MONGODB_URI);
const db = client.db("tilesgallery");

export const auth = betterAuth({
  database: mongodbAdapter(db, {
    // Optional: if you don't provide a client, database transactions won't be enabled.
    client
  }),
  emailAndPassword: { 
    enabled: true, 
  }, 
});







// import { betterAuth } from "better-auth";
// import clientPromise from "./db";

// export const auth = betterAuth({
//   database: {
//     provider: "mongodb",
//     clientPromise,
//   },
//   emailAndPassword: {
//     enabled: true,
//   },
// });







// import { betterAuth } from "better-auth";
// import clientPromise from "./db";

// export const auth = betterAuth({
//   database: {
//     provider: "mongodb",
//     clientPromise,
//   },

//   emailAndPassword: {
//     enabled: true,
//   },

//   basePath: "/api/auth", // ⚠️ VERY IMPORTANT
// });



