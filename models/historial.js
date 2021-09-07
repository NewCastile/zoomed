const mongoose = require('mongoose')

const HistorialSchema = new mongoose.Schema( 
    {
        patient: { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'patient', 
            required: true 
        }
    }
)

module.exports = mongoose.model('historial', HistorialSchema)