const mongoose = require("mongoose");

mongoose.Promise = global.Promise;
mongoose.set("strictQuery", true);
const dotEnv = require("dotenv");
dotEnv.config({ path: "backend/config/config.env" });

const DATABASE_URL =
  process.env.ONLINE_DATABASE_URL ||
  "mongodb+srv://MahmoudAliTech:sm-1562001@building.e2ivn.mongodb.net/?retryWrites=true&w=majority&appName=building";

if (!DATABASE_URL) {
  console.log(
    "Error: ONLINE_DATABASE_URL environment variable is not defined."
  );
  process.exit(1);
}

// Connect to MongoDB using the ONLINE_DATABASE_URL environment variable.
mongoose
  .connect(DATABASE_URL)
  .then(() => {
    console.log("Connected successfully to MongoDB.");
  })
  .catch((err) => {
    console.log(`Error in DB connection: ${err}`);
    process.exit(1);
  });
