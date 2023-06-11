const mongoose = require('mongoose')

const infoSchema = new mongoose.Schema({
    judul: {
        type: String,
        required: true
    },
    isi: {
        type: String,
        required: true
    },
    sumber: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true
    },
    tanggalDibuat: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now()
    }
})

const Info = mongoose.model('Info', infoSchema)

module.exports = Info