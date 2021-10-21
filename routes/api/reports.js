const express = require('express')
const router = express.Router()
const Patient = require('../../models/patient')
const Historial = require('../../models/historial')
const Report = require('../../models/report')

router.get('/', async (req, res) => {
    const reports = await Report.find().populate("patient")
    return res.json(reports)
} )

router.get('/:id', async (req, res) => {
    const { id : reportId } = req.params 
    try {
        const report = await Patient.findById(reportId)
        if (!report) throw Error('Patient not found')
        res.json(report)
    } catch (error) {
        res.json({ message: `Error while looking for report ${error.message}`, success: false })
    }
} )

router.get('/search/:historialId', async (req, res) => {
    const { historialId } = req.params 
    try {
        const reports = await Report.find({ historial: historialId }).populate("patient")
        if (!reports) throw Error("Could'nt found any reports")
        res.json(reports)
    } catch (error) {
        res.json({ message: `Error while looking for report ${error.message}`, success: false })
    }
} )

router.post('/', async (req, res) => {
    const { 
        patientID, 
        diagnosis, 
        createdDate 
    } = req.body
    try {
        const newReportPatient = await Patient.findById(patientID)
        if(!newReportPatient) throw Error("Patient not found")
        const patientHistorialId = newReportPatient.historial._id
        const patientHistorial = await Historial.findById(patientHistorialId)
        
        const newReport = new Report({ patient: newReportPatient._id, historial: patientHistorial._id, diagnosis, createdDate })
        await newReport.save()

        res.json({ message: "Report added with no problems", success: true })
    } catch (error) {
        res.json({ message: error.message, success: false })
    }
} )

router.delete('/:id', async(req, res) => {
    const { id : reportId } = req.params 
    try {
        const report = await Report.findById(reportId)
        if (!report) throw Error('Report not found')
        
        const removeReport = await report.remove()
        if (!removeReport) throw Error('Something went wrong while deleting Report')
        res.json({ message: "Report deleted with no problems", success: true })
    } catch (error) {
        res.json({ message: error.message, success: false })
    }
} )

router.patch('/:id', async(req, res) => {
    const { id : reportId } = req.params 
    const { patientID, diagnosis, createdDate  } = req.body
    try {    
        const report = await Report.findById(reportId)
        if (!report) throw Error('Report not found')

        const reportPatient = await Patient.findById(patientID)
        if (!reportPatient) throw Error('Patient not found')

        const reportHistorial = await Historial.findById(reportPatient.historial._id)
        if (!reportHistorial) throw Error('Historial not found')
        
        
        const updateReport = await report.update({ 
            patient: reportPatient._id, 
            historial: reportHistorial._id,
            diagnosis,
            createdDate
        })
        if (!updateReport) throw Error('Something went wrong while updating report')
        res.json({ message: "Report updated with no problems", success: true })
    } catch (error) {
        res.json({ message: error.message, success: false })
    }
} )

module.exports = router