const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
require("dotenv").config();
const cookieParser = require("cookie-parser");
const authRoute = require("./Routes/AuthRoute");
const { MONGO_URL, PORT } = process.env;

mongoose
  .connect(MONGO_URL, {
    useNewUrlParser: true, //Mongoose should use the new URL parser to parse MongoDB connection strings default:true
    useUnifiedTopology: true, //Mongoose should use the new Server Discovery and Monitoring engine  default:false
  })
  .then(() => console.log("MongoDB is connected Successfully"))
  .catch((error) => console.error(error));

app.use(
  cors({
    origin: ["http://localhost:3000"],
    methoods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

//AuthRoutes
app.use("/", authRoute);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
