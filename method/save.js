const Pasien = require('../models/Pasien')
const Pertanyaan = require('../models/TanyaDokter')
const Janji = require('../models/Janji')
const Info = require('../models/Info')

module.exports = {
    registerPasien: function(request, response) {
        const newPasien = new Pasien({
            nama: request.body.nama,
            alamat: request.body.alamat,
            telfon: request.body.telfon,
            no: request.body.no
        })
        newPasien.save().then(() => {
            request.flash('success_message', 'Terdaftar')
            response.redirect('/admin/pasien')
        }).catch(error => console.log(error))
    },
    savePertanyaan: function(request, response) {
        const newPertanyaan = new Pertanyaan({
            tanggal: request.body.date,
            waktu: request.body.time,
            no: request.body.noPasien,
            nama: request.body.namaPasien,
            pertanyaan: request.body.pertanyaan
        })
        newPertanyaan.save().then(() => {
            request.flash('success_message', 'Terkirim')
            response.redirect('/pasien')
        }).catch(error => console.log(error))
    },
    buatJanji: function(request, response) {
        new Janji({
            nama: request.body.nama,
            telfon: request.body.telfon,
            alamat: request.body.alamat,
            tanggal: request.body.tanggal,
            riwayat: request.body.riwayat,
            keluhan: request.body.keluhan,
        }).save().then(() => {
            Janji.findOne({ nama: request.body.nama, telfon: request.body.telfon, alamat: request.body.alamat }).then(tgt => {
                request.flash('success_message', 'Tercetak, Silahkan Cetak atau Screenshot')
                response.redirect(`/buat_janji/cetak_janji/${tgt._id}`)
            }).catch(error => console.log(error))
        }).catch(error => console.log(error))
    },
    saveInfo: function(request, response) {
        new Info({
            judul: request.body.judul,
            isi: request.body.isi,
            sumber: request.body.sumber,
            link: request.body.link,
            tanggalDibuat: request.body.tanggalDibuat
        }).save().then(() => {
            request.flash('success_message', 'Terunggah')
            response.redirect('/admin/info')
        }).catch(error => console.log(error))
    }
}
