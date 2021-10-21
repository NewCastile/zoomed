const express = require('express')
const router = express.Router()
const Historial = require('../../models/historial')
const Report = require('../../models/report')

router.get('/', async (req, res) => {
    const historials = await Historial.find().populate("patient", { name: 1, specie: 1, birth: 1, _id: 0 })
    return res.json(historials)
})

router.delete('/:id', async(req, res) => {
    try {
        const { id : historialId } = req.params
        const historial = await Historial.findById(historialId).populate("patient", { name: 1 })
        if(!historial) throw Error('Historial not found')

        const deleteHistorial= await Report.deleteMany({ historial: historial._id })
        if (!deleteHistorial) throw Error('Something went wrong while deleting historial reports')
        res.json({ message: `${historial.patient.name}'s historial cleaned with no issues`, success: true })
    } catch (error) {
        res.json({ message: error.message, success: false })
    }
} )

module.exports = router