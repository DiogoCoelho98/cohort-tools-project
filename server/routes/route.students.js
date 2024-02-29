// router.students.js
const router = require('express').Router();
const Student = require('../models/students');
const data = require('../utils/data/students');

/* Create our GET route */
router.get("/students", async (req, res) => { // Get all students
    try{
        const allStudents = await Student.find();
        res.status(200).json(data);
    }
    catch(error){
        console.log(error);
    }
});

// Create our GET route to get all students by cohort id
router.get("/students/cohort/:id", async (req, res) => { // Get all students by cohort ID
    try{
        const { id } = req.params;
        const studentsByCohort = await Student.find({ cohort: id });
        res.status(200).json(studentsByCohort);
    } 
    catch(error){
        console.log(error);
    }
});

//Create our READ route
router.get("/students/:_id", async (req, res) => { // Get a student by ID
    try{
        const { _id } = req.params;
        const student = await Student.findById(_id);
        res.status(200).json(student);
    }
    catch(error){
        console.log(error);
    }
})
//Create our POST route
router.post("/students", async (req, res) => { // Create a new student
    try{
        const { firstName, lastName, email, phone, linkedinUrl, languages, program, background, image, cohort, projects } = req.body;
        const newStudent = await Student.create({
            firstName,
            lastName,
            email,
            phone,
            linkedinUrl,
            languages,
            program,
            background,
            image,
            cohort,
            projects
        });
        res.status(200).json(newStudent);
    }
    catch (error){
        console.log(error);
    }
})

//Create our PUT
router.put("/students/:id", async (req, res) => { // Update a student by ID
    try{
        const { id } = req.params;
        const { firstName, lastName, email, phone, linkedinUrl, languages, program, background, image, cohort, projects } = req.body;
       
       if (!firstName || !lastName || !email || !phone || !linkedinUrl || !languages || !program || !background || !image || !cohort || !projects) {
            res.status(400).json({ message: "Please provide all required fields" });
            return;
        }

        const updatedStudent = await Student.findByIdAndUpdate(id, {
            firstName,
            lastName,
            email,
            phone,
            linkedinUrl,
            languages,
            program,
            background,
            image,
            cohort,
            projects
        }, {
            new: true
        });
        res.status(200).json(updatedStudent);
    }
    catch(error){
        console.log(error);
    }
})

//Create DELETE
router.delete("/students/:id", async (req, res) => { // Delete a student by ID
    try{
        const { id } = req.params;
        const deletedStudent = await Student.findByIdAndDelete(id);

        if(!deletedStudent){
            res.status(404).json({ message: "Student not found" });
            return;
        }

        res.status(200).json(deletedStudent);
    }
    catch(error){
        console.log(error);
    }
});

module.exports = router;

