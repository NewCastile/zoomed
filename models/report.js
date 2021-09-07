const mongoose = require('mongoose')

const ReportSchema = new mongoose.Schema(
    {
        patient: { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'patient', 
            required: true 
        },
        historial: { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'historial', 
            required: true 
        },
        diagnosis: { 
            type: String,
            required: true 
        },
        createdDate: {
            type: Date,
            required: true
        },
    }
)

module.exports = mongoose.model('report', ReportSchema)