const mongoose = require("mongoose")

const Student = mongoose.model("Student", {
  name: String,
  age: Number,
  turma: String
})

module.exports = Student