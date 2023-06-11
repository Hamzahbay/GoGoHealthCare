const mongoose = require('mongoose')

const janjiSchema = new mongoose.Schema({
    nama: {
        type: String,
        required: true
    },
    telfon: {
        type: String,
        required: true
    },
    alamat: {
        type: String,
        required: true
    },
    tanggal: {
        type: String,
        required: true
    },
    riwayat: {
        type: String,
        required: true
    },
    keluhan: {
        type: String,
        required: true
    },
    createDate: {
        type: Date,
        default: Date.now()
    },
    kedatangan: {
        type: String,
        default: 'off'
    }
})

const Janji = mongoose.model('Janji', janjiSchema)

module.exports = Janji