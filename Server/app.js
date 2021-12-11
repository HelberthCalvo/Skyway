const dotEnv = require("dotenv");
const express = require("express");
const cors = require("cors");
const logger = require("morgan");
const chalk = require("chalk");
const mongoose = require("mongoose");
const app = express();
const passport = require('passport');

//Routes
const bookingRouter = require("./routes/booking");
const flightRouter = require("./routes/flight");
const planeRouter = require("./routes/plane");
const planetypeRouter = require("./routes/planetype");
const routeRouter = require("./routes/route");
const scheduleRouter = require("./routes/schedule");
const userRouter = require("./routes/user");


dotEnv.config();

const mongoDB = process.env.MONGODB_DATABASE;

mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "MongoDB connection error"));

db.once("open", () => console.log("Connected Successfully to DB ", mongoDB));

const port = process.env.PORT || 3000;

app.use(cors());

app.use(logger("dev"));

app.use(express.json());
app.use(
    express.urlencoded({
        extended: true,
    })
);

app.use("/booking/", bookingRouter);
app.use("/flight/", flightRouter);
app.use("/plane/", planeRouter);
app.use("/planetype/", planetypeRouter);
app.use("/route/", routeRouter);
app.use("/schedule/", scheduleRouter);
app.use("/user/", userRouter);

app.listen(port, () => {
    console.log(
        `${chalk.green("✓")} App is running at ${chalk.bgGreen(
        `http://localhost:${port}`
        )}`
    );
    console.log(" Pres CTRL-C to stop\n");
});