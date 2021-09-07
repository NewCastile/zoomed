const express = require('express')
const router = express.Router()
const Patient = require('../../models/patient')
const Historial = require('../../models/historial')

router.get('/', async (req, res) => {
    const patients = await Patient.find()
    return res.json(patients)
} )

router.get('/search/:name', async (req, res) => {
    const { name : patientName } = req.params 
    const regx = new RegExp(patientName, 'i')
    try {
        const patients = await Patient.find({"name": regx })
        res.json(patients)
    } catch (error) {
        res.json({ message: `Error while looking for patients ${error.message}`, success: false })
    }
} )

router.post('/', async (req, res) => {
    try {
        const { name, specie, birth  } = req.body
        const newPatient = new Patient({ name, specie, birth })
        const newHistorial = new Historial({ patient: newPatient._id })
        newPatient.historial = newHistorial._id
        await newPatient.save()
        await newHistorial.save()
        res.json({ message: "Patient added with no problems", newPatient, success: true })
    } catch(error) {
        res.json({ message: `Error while adding patient. ${error.message}`, success: false })
    }
} )

router.delete('/:id', async(req, res) => {
    const { id : patientId } = req.params 
    try {
        const patient = await Patient.findById(patientId)
        if (!patient) throw Error('Patient not found')
        const removePatient = await patient.remove()
        if (!removePatient) throw Error('Something went wrong while deleting patient')
        res.json({ message: "Patient deleted with no problems", success: true, patient })
    } catch (error) {
        res.json({ message: error.message, success: false })
    }
} )

router.patch('/:id', async(req, res) => {
    const { id : patientId } = req.params 
    const { name, specie, birth } = req.body
    const update = { name, specie, birth }
    try {
        const patient = await Patient.findById(patientId)
        if (!patient) throw Error('Patient not found')
        const removePatient = await patient.updateOne(update)
        if (!removePatient) throw Error('Something went wrong while updating Patient')
        res.json({ message: `Patients info updated succesfully`, success: true })
    } catch (error) {
        res.json({ message: error.message, success: false })
    }
} )

module.exports = router