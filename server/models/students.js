const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const studentSchema = new Schema ({
    firstName: {String, required: true},
    lastName: {String, required: true},
    email: {String, required: true, unique: true},
    phone: {String, required: true},
    linkedinUrl: {String, default: ""},
    languages: {type: String ["German", "Portuguese", "Dutch", "Other"]},
    program: {String, enum: ["Web Dev", "UX/UI", "Data Analytics", "Cybersecurity"]},
    background: {String, default:""},
    image: {String, default: "https://i.imgur.com/r8bo8u7.png"},
    cohort: {type: mongoose.Schema.Types.ObjectId, ref: "Student"},
    projects: []
});

const Student = mongoose.model("Student", studentSchema);

module.exports(Student);