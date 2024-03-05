const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const PORT = 5005;
const mongoose = require("mongoose");



// STATIC DATA
// Devs Team - Import the provided files with JSON data of students and cohorts here:
// ...

const dataCohort = require("./cohorts.json");
const dataStudent = require("./students.json");
const Student = require("./models/students");
const cohort = require("./models/cohorts");
const User = require("./models/user");
const { errorHandler, notFoundHandler} = require("./middleware/error-handling");



// INITIALIZE EXPRESS APP - https://expressjs.com/en/4x/api.html#express
const app = express();
app.use(express.urlencoded({extended:false}));

mongoose.connect("mongodb://127.0.0.1:27017/cohort-tools-api")
.then(x => console.log(`Connected to Database: ${x.connections[0].name}`))
.catch(error => console.log("Error connecting", error));



// MIDDLEWARE
// Research Team - Set up CORS middleware here:
// ...
app.use(express.json());
app.use(morgan("dev"));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors())


// ROUTES - https://expressjs.com/en/starter/basic-routing.html
// Devs Team - Start working on the routes here:
// ...

app.get("/docs", (req, res) => {
  res.sendFile(__dirname + "/views/docs.html");
});

const studentRoutes = require("./routes/route.students")
app.use("/api", studentRoutes);

const cohortRoutes = require("./routes/route.cohorts")
app.use("/api", cohortRoutes);

const userRoutes = require("./routes/route.auth")
app.use("/auth", userRoutes);

app.use(errorHandler);
app.use(notFoundHandler);

// require("./middleware/error-handling")(app)

// START SERVERs
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
}); 

//console.log(Date())
// module.exports = app; 