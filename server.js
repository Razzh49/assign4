/*********************************************************************************
 * WEB700 – Assignment 04
 * I declare that this assignment is my own work in accordance with Seneca Academic Policy. No part
 * of this assignment has been copied manually or electronically from any other source
 * (including 3rd party web sites) or distributed to other students.
 *
 * Name: Hem Raj Bhusal Student ID: 139540223 Date: 2023-03-10
 *
 * Online (Cyclic) Link: https://zany-puce-mackerel-tutu.cyclic.app/
 *
 ********************************************************************************/

var HTTP_PORT = process.env.PORT || 8080;
var express = require("express");
var path = require("path");
var app = express();
const collegeData = require("./modules/collegeData.js");


app.use(express.static('public'));


app.use(express.urlencoded({ extended: true }));
collegeData
  .initialize()
  .then(() => {
    app.listen(HTTP_PORT, () => {
      console.log("server listening at port: " + HTTP_PORT);
    });
  })
  .catch((err) => {
    console.log(err);
  });

app.get("/students", (req, res) => {
  if (req.query.course) {
    collegeData
      .getStudentsByCourse(req.query.course)
      .then(function (data) {
        res.json(data);
      })
      .catch(function (err) {
        res.json({ Message: err });
      });
  } else if (!req.query.course) {
    collegeData
      .getAllStudents()
      .then(function (data) {
        res.json(data);
      })
      .catch(function (err) {
        res.json({ Message: err });
      });
  }
});

app.get("/tas", (req, res) => {
  collegeData
    .getTAs()
    .then(function (TAs) {
      res.json(TAs);
    })
    .catch(function (err) {
      res.json(err);
    });
});

app.get("/courses", (req, res) => {
  collegeData
    .getCourses()
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json({ message: "no results" });
    });
});

app.get("/student/num", (req, res) => {
  collegeData
    .getStudentByNum(req.params.num)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json(err);
    });
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./views/home.html"));
});

app.get("/about", (req, res) => {
  res.sendFile(path.join(__dirname, "./views/about.html"));
});

app.get("/htmlDemo", (req, res) => {
  res.sendFile(path.join(__dirname, "./views/htmlDemo.html"));
});

app.get("/addStudent", (req, res) => {
  res.sendFile(path.join(__dirname, "./views/addStudent.html"));
});

app.use((req, res, next) => {
  res.status(404).send("Page Not Found");
});


