const router = require('express').Router()
const { request, response } = require('express')
const passport = require('passport')
const mongoose = require('mongoose')
const Pasien = require('../models/Pasien')
const Pertanyaan = require('../models/TanyaDokter')
const Janji = require('../models/Janji')
const Info = require('../models/Info')
const { ensureAuthenticated } = require('./../config/auth')
const { savePertanyaan, buatJanji } = require("../method/save")

//GET
router.get('/', (request, response) => {
    if( typeof request.user == 'undefined' ) {
        response.render('beranda/index', { page: 'Beranda', pasien: {no: ''} })
    } else{
        Pasien.findOne({ no: request.user.no }).then(pasien => {
            if( pasien ) {
                response.render('beranda/index', { page: 'Beranda', pasien })
            }
        }).catch(error => console.log(error))
    }
})

router.get('/tanya_dokter', (request, response) => {
    if( typeof request.user == 'undefined' ) {
        response.render('tanya_dokter/index', { page: 'Tanya Dokter', pasien: {no: ''} })
    } else{
        Pasien.findOne({ no: request.user.no }).then(pasien => {
            if( pasien ) {
                response.render('tanya_dokter/index', { page: 'Tanya Dokter', pasien })
            }
        }).catch(error => console.log(error))
    }
})

router.get('/info_kesehatan', (request, response) => {
    Info.find().then(info => {
        if( typeof request.user == 'undefined' ) {
            response.render('info_kesehatan/index', { page: 'Info Kesehatan', pasien: {no: ''}, info })
        } else{
            Pasien.findOne({ no: request.user.no }).then(pasien => {
                if( pasien ) {
                    response.render('info_kesehatan/index', { page: 'Info Kesehatan', pasien, info })
                }
            }).catch(error => console.log(error))
        }
    }).catch(error => console.log(error))
})

router.get('/buat_janji', (request, response) => {
    if( typeof request.user == 'undefined' ) {
        response.render('buat_janji/index', { page: 'Buat Janji', pasien: {no: ''} })
    } else{
        Pasien.findOne({ no: request.user.no }).then(pasien => {
            if( pasien ) {
                response.render('buat_janji/index', { page: 'Buat Janji', pasien })
            }
        }).catch(error => console.log(error))
    }
})

router.get('/buat_janji/form_janji', (request, response) => {
    if( typeof request.user == 'undefined' ) {
        response.render('buat_janji/form_janji/index', { page: 'Buat Janji', pasien: {no: ''} })
    } else{
        Pasien.findOne({ no: request.user.no }).then(pasien => {
            if( pasien ) {
                response.render('buat_janji/form_janji/index', { page: 'Buat Janji', pasien })
            }
        }).catch(error => console.log(error))
    }
})

router.get('/buat_janji/cetak_janji/:id', (request, response) => {
    let fullUrl = `${request.protocol}://${request.hostname}${request.originalUrl}`
    if( typeof request.user == 'undefined' ) {
        Janji.findOne({ _id: request.params.id }).then(tgt => {
            response.render('buat_janji/cetak_janji/index', { page: 'Cetak Janji', pasien: {no: ''}, tgt, url: fullUrl })
        }).catch(error => console.log(error))
    } else{
        Pasien.findOne({ no: request.user.no }).then(pasien => {
            Janji.findOne({ _id: request.params.id }).then(tgt => {
                if( pasien ) {
                    response.render('buat_janji/cetak_janji/index', { page: 'Cetak Janji', pasien, tgt, url: fullUrl })
                }
            }).catch(error => console.log(error))
        }).catch(error => console.log(error))
    }
})

router.get('/back', (request, response) => {
    request.flash('success_message', 'Terima Kasih dan Jangan Lupa')
    response.redirect('/buat_janji/form_janji')
})

//PASIEN PAGE AUTHORAZION
router.get('/pasien', ensureAuthenticated, (request, response) => {
    Pertanyaan.find().then(pertanyaan => {
        Pasien.findOne({ no: request.user.no }).then(data => {
            response.render('pasien/index', { page: 'Pasien', data, pertanyaan })
        }).catch(error => console.log(error))
    }).catch(error => console.log(error))
})

//DELETE PERTANYAAN
router.get('/pasien/delete/:id', ensureAuthenticated, (request, response) => {
    Pertanyaan.findByIdAndDelete(request.params.id, (error, _data) => {
        if( error ) {
            request.flash('error_message', 'Pertanyaan Gagal Terhapus')
            response.redirect('/pasien')
        }
        request.flash('success_message', 'Pertanyaan Terhapus')
        response.redirect('/pasien')
    })
})

//JAWAB PAGE
router.get('/pasien/jawab', ensureAuthenticated, (request, response) => {
    Pertanyaan.find().then(pertanyaan => {
        Pasien.findOne({ no: request.user.no }).then(data => {
            response.render('pasien/jawab', { page: 'Jawab Pasien', data, pertanyaan })
        }).catch(error => console.log(error))
    }).catch(error => console.log(error))
})

//TANYA DOKTER POST HANDLE
router.post('/pasien', (request, response) => {
    let errors = []

    if( request.body.pertanyaan.length < 10 ) {
        errors.push({ message: 'Isi Pertanyaan Dengan Jelas!' })
    }
    
    if( errors.length > 0 ) {
        Pertanyaan.find().then(pertanyaan => {
            Pasien.findOne({ no: request.body.noPasien }).then(data => {
                response.render('pasien/index', { page: 'Pasien', data, pertanyaan, errors })
            }).catch(error => console.log(error))
        }).catch(error => console.log(error))
    } else{
        savePertanyaan(request, response)
    }
})

//JAWAB PERTANYAAN
router.post('/pasien/jawab', (request, response) => {
    Pertanyaan.findByIdAndUpdate(request.body.id, request.body, { new: true }, (error, _data) => {
        if( error ) {
            request.flash('error_message', 'Pertanyaan Gagal Terjawab')
            response.redirect('/pasien/jawab')
        }
            request.flash('success_message', 'Pertanyaan Terjawab')
            response.redirect('/pasien/jawab')
    })
})

//BUAT JANJI HANDLE
router.post('/buat_janji/form_janji', (request, response) => {
    let errors = []

    if( request.body.nama == '' || request.body.telfon == '' || request.body.alamat == '' || request.body.riwayat == '' || request.body.keluhan == '' || request.body.nama.length < 3 || request.body.keluhan.length < 5 ) {
        errors.push({ message: 'Isi Form Dengan Jelas!' })
    }

    if( errors.length > 0 ) {
        if( typeof request.user == 'undefined' ) {
            response.render('buat_janji/form_janji/index', { page: 'Buat Janji', pasien: {no: ''}, errors })
        } else{
            Pasien.findOne({ no: request.user.no }).then(pasien => {
                if( pasien ) {
                    response.render('buat_janji/form_janji/index', { page: 'Buat Janji', pasien, errors })
                }
            }).catch(error => console.log(error))
        }
    } else{
        Janji.findOne({ nama: request.body.nama }).then(rqr => {
            
            if( rqr ) {
                if( rqr.kedatangan == 'on' ) {
                   buatJanji(request, response)
                } else{
                    errors.push({ message: 'Nama Telah Diguanakan dan Menentukan Tanggal Janji' })
                    if( typeof request.user == 'undefined' ) {
                        response.render('buat_janji/form_janji/index', { page: 'Buat Janji', pasien: {no: ''}, errors })
                    } else{
                        Pasien.findOne({ no: request.user.no }).then(pasien => {
                            if( pasien ) {
                                response.render('buat_janji/form_janji/index', { page: 'Buat Janji', pasien, errors })
                            }
                        }).catch(error => console.log(error))
                    }
                }
            } else{
                Janji.findOne({ telfon: request.body.telfon }).then(rqr => {
                    if( rqr ) {
                        errors.push({ message: 'Nomor Telfon Telah Digunakan' })
                        if( typeof request.user == 'undefined' ) {
                            response.render('buat_janji/form_janji/index', { page: 'Buat Janji', pasien: {no: ''}, errors })
                        } else{
                            Pasien.findOne({ no: request.user.no }).then(pasien => {
                                if( pasien ) {
                                    response.render('buat_janji/form_janji/index', { page: 'Buat Janji', pasien, errors })
                                }
                            }).catch(error => console.log(error))
                        }
                    } else{
                        buatJanji(request, response)
                    }
                }).catch(error => console.log(error))
            }
        }).catch(error => console.log(error))
    }
})

//LOGIN HANDLE
router.post('/tanya_dokter', (request, response, next) => {
    if( request.body.nama == '' || request.body.no == '' ) {
        request.flash('error_message', 'Isi Data Pasien!')
    }
    passport.authenticate('local', {
        successRedirect: `/pasien`,
        failureRedirect: '/tanya_dokter',
        failureFlash: 'Nama atau No Pasien Belum Terdaftar'
    })(request, response, next)
})

//LOGOUT HANDLE
router.get('/logout', (request, response) => {
    request.logOut()
    request.flash('success_message', 'Terima Kasih')
    response.redirect('/tanya_dokter')
})

module.exports = router