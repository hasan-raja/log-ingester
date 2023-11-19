require("dotenv").config();
const express = require("express");
const dbConnect = require("./dbConnect");
const logRoutes = require("./routes/logs");
const cors = require("cors");

const app = express();

dbConnect();

app.use(express.json());
app.use(cors());

app.use("/api", logRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));