const express = require("express");
const mongoose = require("mongoose");
const Student = require("./models/student.js"); // ✅ Capital S
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

mongoose
  .connect("mongodb://localhost:27017/studentDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"));

// CREATE
app.post("/students", async (req, res) => {
  const studentData = req.body;
  const newStudent = new Student(studentData); // ✅ Capital S
  await newStudent.save();
  res.status(201).send(newStudent);
});

// READ ALL
app.get("/students", async (req, res) => {
  const students = await Student.find();
  res.send(students);
});

// READ BY ID
app.get("/students/:id", async (req, res) => {
  const studentId = req.params.id;
  const studentData = await Student.findById(studentId);
  res.send(studentData);
});

// UPDATE
app.put("/students/:id", async (req, res) => {
  const updatedStudent = await Student.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );
  res.send(updatedStudent);
});

// DELETE
app.delete("/students/:id", async (req, res) => {
  await Student.findByIdAndDelete(req.params.id);
  res.send({ message: "Student deleted" });
});

app.listen(3000, () => {
  console.log("Server started on port 3000");
});
