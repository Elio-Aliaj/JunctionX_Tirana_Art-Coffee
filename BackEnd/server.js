const express = require("express");
const cors = require("cors");
const controller = require("./app/controllers/auth.controller");
const app = express();


var corsOptions = {
  origin: "http://localhost:3000",
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});
app.post("/api/auth/signup", controller.signup);
app.post("/api/auth/signin", controller.signin);
const db = require("./app/models");
const Role = db.role;
// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
db.sequelize.sync({ force: true }).then(() => {
  console.log("Drop and Resync Db");
  initial();
});
function initial() {
  Role.create({
    id: 1,
    name: "client",
  });

  Role.create({
    id: 2,
    name: "worker",
  });

  Role.create({
    id: 3,
    name: "admin",
  });
}
