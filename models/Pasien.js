const mongoose = require('mongoose')
const autoInc = require('mongodb-autoincrement')

const pasienSchema = new mongoose.Schema({
    nama: {
        type: String,
        required: true
    },
    alamat: {
        type: String,
        required: true
    },
    telfon: {
        type: String,
        required: true
    },
    no: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: 'pasien'
    },
    tanggal: {
        type: Date,
        default: Date.now()
    }
})

const Pasien = mongoose.model('Pasien', pasienSchema)

module.exports = Pasien