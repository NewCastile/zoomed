const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const patientsRoutes = require('./routes/api/patients')
const reportsRoutes = require('./routes/api/reports')
const historialsRoutes = require('./routes/api/historials')
const path = require('path')
require("dotenv").config()

const app = express()
app.use(express.json())
app.use(cors())

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connection made'))
    .catch((err) => {
        console.log(err)
        process.exit(1)
})

app.use('/api/patients', patientsRoutes);
app.use('/api/reports', reportsRoutes);
app.use('/api/historials', historialsRoutes);

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'))
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
