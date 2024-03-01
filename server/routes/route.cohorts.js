const router = require('express').Router();
const Cohort = require('../models/cohorts');
const data = require('../utils/data/cohorts.json')

router.get("/cohorts", async (req, res, next) => {
    try {
        const allCohort = await Cohort.find()
        res.status(200).json(allCohort  );
    }
    catch (error) {
       next(error);
    }
  });

  router.get("/cohorts/:_id", async (req, res, next) => {
    try {
        const {_id} = req.params;
        const cohort = await Cohort.findById(_id);
        res.status(200).json(cohort);
    }
    catch (error) {
        next(error);
    }
})
    router.post("/cohorts", async (req, res, next) => {
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
            next(error);
        }
    })

    router.put("/cohorts/:cohortId", async (req, res, next) => {
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
            next(error);
        }
    })

    router.delete("/cohorts/:id", async (req, res, next) => {
        try {
            const {id} = req.params;
            await Cohort.findByIdAndDelete(id);
            res.status(200).json({message: "Cohort was deleted!"});
        }
        catch (error) {
            next(error);
        }
    })

    module.exports = router;
  
