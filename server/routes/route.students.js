// router.students.js
const router = require('express').Router();
const Student = require('../models/students');


/* Create our GET route */
router.get("/students", async (req, res, next) => { // Get all students
    try{
        const allStudents = await Student.find().populate("cohort");
        res.status(200).json(allStudents);
    }
    catch(error){
    next(error);
    }
});

// Create our GET route to get all students by cohort id
router.get("/students/cohort/:id", async (req, res, next) => { // Get all students by cohort ID
    try{
        const { id } = req.params;
        const studentsByCohort = await Student.find({ cohort: id }).populate("cohort");
        res.status(200).json(studentsByCohort);
    } 
    catch(error){
        next(error);
    }
});

//Create our READ route
router.get("/students/:_id", async (req, res, next) => { // Get a student by ID
    try{
        const { _id } = req.params;
        const student = await Student.findById(_id).populate("cohort");
        res.status(200).json(student);
    }
    catch(error){
        next(error);
    }
})
//Create our POST route
router.post("/students", async (req, res, next) => { // Create a new student
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
        next(error);
    }
})

//Create our PUT
router.put("/students/:id", async (req, res, next) => { // Update a student by ID
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
        next(error);
    }
})

//Create DELETE
router.delete("/students/:id", async (req, res, next) => { // Delete a student by ID
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
        next(error);
    }
});



module.exports = router;

