const mongoose = require('mongoose')

const tdSchema = new mongoose.Schema({
    tanggal: {
        type: String,
        required: true
    },
    waktu: {
        type: String,
        required: true
    },
    no: {
        type: String,
        required: true
    },
    nama: {
        type: String,
        required: true
    },
    pertanyaan: {
        type: String,
        required: true
    },
    jawaban: {
        type: String,
        required: true,
        default: 'Belum Dijawab'
    }
})

const Pertanyaan = mongoose.model('Pertanyaan', tdSchema)

module.exports = Pertanyaan