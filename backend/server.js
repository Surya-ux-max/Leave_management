const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const app = express();

// CORS configuration for production
const corsOptions = {
  origin: true,
  credentials: true,
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(express.json());

// Additional CORS headers
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', req.headers.origin);
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/student", require("./routes/studentRoutes"));
app.use("/api/faculty", require("./routes/facultyRoutes"));
app.use("/api/hod", require("./routes/hodRoutes"));

const parsedPort = parseInt(process.env.PORT, 10);
const PORT = Number.isInteger(parsedPort) && parsedPort >= 0 && parsedPort < 65536 ? parsedPort : 3000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
