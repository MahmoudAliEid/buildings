const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const sendEmail = require("./utils/sendEmail");
const app = express();
const path = require("path");
const dotEnv = require("dotenv");
const buildingRoutes = require("./routers/building");
const userRouter = require("./routers/user");
const port = process.env.PORT || 4000;
dotEnv.config({ path: "backend/config/config.env" });
require("./config/database");

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "images")));

// ** Set CORS headers after body-parser
const corsOptions = {
  origin: "http://localhost:3000", 
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true, 
};
app.use(cors(corsOptions));
app.options("*", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE, OPTIONS"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization"
  );
  res.setHeader("Access-Control-Allow-Credentials", "true");
  if (req.method === 'OPTIONS') {
    return res.status(200).end();  
  }
  res.sendStatus(200);
});



// ** Serve static files from the 'images' directory

app.use("/images", express.static(path.join(__dirname, "images")));
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "welcome.html"));
});

// ** Routes
app.use("/api", buildingRoutes);
app.use("/api", userRouter);

//** Contact us form
app.post("/contact-us", (req, res) => {
  try {
    const { name, email, message, subject } = req.body;
    if (!name || !email || !message || !subject) {
      return res.status(400).json({
        success: false,
        message: "Please fill all the fields",
      });
    }

    const info = sendEmail({ name, email, message, subject });
    res.status(200).json({
      success: true,
      message: "Email sent successfully to the admin",
      info: {
        name,
        email,
        message,
        subject,
        info,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Email not sent",
      error,
    });
  }
});

//** Serve the HTML file to the client test
app.get("/update", (req, res) => {
  res.sendFile(path.join(__dirname, "update.html"));
});
app.get("/create", (req, res) => {
  res.sendFile(path.join(__dirname, "create.html"));
});
app.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "login.html"));
});

// **Handling of Uncaught exceptions
process.on("uncaughtException", (err) => {
  console.log(`ERROR: ${err.message}`);
  console.log("Shutting down due to uncaught exception ");
  process.exit(1);
});

const server = app.listen(port, () =>
  console.log(`Server is up and running on port : ${port} `)
);

// **Handle the Unhandled Promise rejections
process.on("unhandledRejection", (err) => {
  console.log(`ERROR: ${err.stack}`);
  console.log("Shutting down the server due to Unhandled Promise rejection");
  server.close(() => {
    process.exit(1);
  });
});
