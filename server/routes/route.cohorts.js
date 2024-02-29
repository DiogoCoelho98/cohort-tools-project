const router = require('express').Router();
const Cohort = require('../models/cohorts');
const data = require('../utils/data/cohorts.json')

router.get("/cohorts", async (req, res) => {
    try {
        const allCohort = await Cohort.find()
        res.status(200).json(data);
    }
    catch (error) {
       console.log(error);
    }
  });

  router.get("/cohorts/:_id", async (req, res) => {
    try {
        const {_id} = req.params;
        const cohort = await Cohort.findById(_id);
        res.status(200).json(cohort);
    }
    catch (error) {
        console.log(error);
    }
})
    router.post("/cohorts", async (req, res) => {
        try {
            const {cohortSlug, cohortName, program, format, campus, startDate, endDate, inProgress, programManager, leadTeacher, totalHours} = req.body;
            const newCohort = await Cohort.create({
                cohortSlug, 
                cohortName, 
                program, 
                format, 
                campus, 
                startDate, 
                endDate, 
                inProgress, 
                programManager, 
                leadTeacher, 
                totalHours,
            });

            res.status(200).json(newCohort);
        }
        catch (error) {
            console.log(error);
        }
    })

    router.put("/cohorts/:cohortId", async (req, res) => {
        try {
            const {id} = req.params;
            const {cohortSlug, cohortName, program, format, campus, startDate, endDate, inProgress, programManager, leadTeacher, totalHours} = req.body;
            const updateCohort = await Cohort.findByIdAndUpdate(id, {
                cohortSlug, 
                cohortName, 
                program, 
                format, 
                campus, 
                startDate, 
                endDate, 
                inProgress, 
                programManager, 
                leadTeacher, 
                totalHours,
            }, {new: true});

            res.status(500).json(updateCohort);
        }
        catch (error) {
            console.log(error);
        }
    })

    router.delete("/cohorts/:id", async (req, res) => {
        try {
            const {id} = req.params;
            await Cohort.findByIdAndDelete(id);
            res.status(200).json({message: "Cohort was deleted!"});
        }
        catch (error) {
            console.log(error);
        }
    })

    module.exports = router;
  
