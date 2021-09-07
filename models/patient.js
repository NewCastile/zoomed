const mongoose = require('mongoose')
const Historial = require('./historial')
const Report = require('./report')

const PatientSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        specie: {
            type: String,
            required: true
        },
        birth: {
            type: Date,
        },
        historial: {
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'historial'
        }
    }
)

PatientSchema.post("remove", async function() {
    await Historial.deleteOne({ patient: this._id }).exec()
    await Report.deleteMany({ patient: this._id }).exec()
})


module.exports = mongoose.model('patient', PatientSchema)