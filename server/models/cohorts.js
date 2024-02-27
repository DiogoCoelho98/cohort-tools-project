const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const cohortSchema = new Schema ({
    cohortSlug: {String, required: true},
    cohortName: {String, required: true},
    program: {String, enum: ["Web Dev", "UX/UI", "Data Analytics", "Cybersecurity"]},
    format: {String, enum: ["Full Time", "Part Time"]},
    campus: {String, enum: ["Madrid", "Barcelona", "Miami", "Paris", "Berlin", "Amsterdam", "Lisbon", "Remote"]},
    startDate: {Date, default: Date.now},
    endDate: {Date},
    inProgress: {Boolean, default: false},
    programManager: {String, required: true},
    leadTeacher: {String, required: true},
    totalHours: {Number, default: 360}
})

const Cohort = mongoose.model("Cohort", cohortSchema);

module.exports(Cohort);