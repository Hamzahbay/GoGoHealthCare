const router = require('express').Router()
const { request, response } = require('express')
const mongoose = require('mongoose')
const Pasien = require('./../models/Pasien')
const Janji = require('../models/Janji')
const Info = require('../models/Info')
const { ensureAuthenticated } = require('./../config/auth')
const { registerPasien, saveInfo } = require("../method/save")

//ADMIN PAGE
router.get('/pasien', ensureAuthenticated, (request, response) => {
    Pasien.findOne({ no: request.user.no }).then(pasien => {
        Pasien.collection.estimatedDocumentCount().then(doc => {
            Pasien.find((_error, data) => {
                response.render('admin/daftar-pasien', {
                    page: 'Daftar Pasien',
                    data,
                    pasien,
                    noPasien: doc
                })
            })
        }).catch(error => console.log(error))
    }).catch(error => console.log(error))
})

router.get('/jadwal', ensureAuthenticated, (request, response) => {
    Janji.find().then(janji => {
        Pasien.findOne({ no: request.user.no }).then(pasien => {
            Pasien.find((_error, data) => {
                response.render('admin/jadwal', {
                    page: 'Jadwal',
                    data,
                    pasien,
                    janji
                })
            })
        }).catch(error => console.log(error))

    }).catch(error => console.log(error))
})

router.get('/jadwal/telah_datang', ensureAuthenticated, (request, response) => {
    Janji.find().then(janji => {
        Pasien.findOne({ no: request.user.no }).then(pasien => {
            Pasien.find((_error, data) => {
                response.render('admin/jadwal-datang', {
                    page: 'Telah Datang',
                    data,
                    pasien,
                    janji
                })
            })
        }).catch(error => console.log(error))
    }).catch(error => console.log(error))
})

router.get('/data_pasien', ensureAuthenticated, (request, response) => {
    Pasien.findOne({ no: request.user.no }).then(pasien => {
        Pasien.find((_error, data) => {
            response.render('admin/data-pasien', {
                page: 'Data Pasien',
                data,
                pasien
            })
        })
    }).catch(error => console.log(error))
})

router.get('/info', ensureAuthenticated, (request, response) => {
    Info.find().then(info => {
        Pasien.findOne({ no: request.user.no }).then(pasien => {
            Pasien.find((_error, data) => {
                response.render('admin/info', {
                    page: 'Admin Info Kesehatan',
                    data,
                    pasien,
                    info
                })
            })
        }).catch(error => console.log(error))
    }).catch(error => console.log(error))
})

router.get('/jadwal/:id', ensureAuthenticated, (request, response) => {
    Pasien.findOne({ no: request.user.no }).then(() => {
        Janji.findByIdAndDelete(request.params.id, (error, _data) => {
            if( error ) throw error
            request.flash('success_message', 'Terhapus')
            response.redirect('/admin/jadwal')
        })
    }).catch(error => console.log(error))
})

router.get('/delete/:id', ensureAuthenticated, (request, response) => {
    Pasien.findOne({ no: request.user.no }).then(() => {
        Pasien.findByIdAndDelete(request.params.id, (error, _data) => {
            if( error ) throw error
            request.flash('success_message', 'Terhapus')
            response.redirect('/admin/data_pasien')
        })
    }).catch(error => console.log(error))
})

router.get('/ubah_pasien/:id', ensureAuthenticated, (request, response) => {
    Pasien.findOne({ no: request.user.no }).then(pasien => {
        Pasien.findById(request.params.id, (_error, data) => {
            response.render('admin/ubah-pasien', { 
                page: 'Ubah Pasien',
                data,
                pasien
            })
        })
    }).catch(error => console.log(error))
})

router.get('/info/delete/:id', ensureAuthenticated, (request, response) => {
    Pasien.findOne({ no: request.user.no }).then(() => {
        Info.findByIdAndDelete(request.params.id, (error, _data) => {
            if( error ) throw error
            request.flash('success_message', 'Terhapus')
            response.redirect('/admin/info')
        })
    }).catch(error => console.log(error))
})

//UPLOAD INFO
router.post('/info', (request, response) => {
    let errors = []

    if( request.body.judul == '' || request.body.isi == '' || request.body.sumber == '' || request.body.tanggalDibuat =='' ) {
        errors.push({ message: 'Isi Untuk Lanjut!' })
    }

    if( errors.length > 0 ) {
        Pasien.findOne({ no: request.user.no }).then(pasien => {
            Pasien.find((_error, data) => {
                response.render('admin/info', {
                    page: 'Admin Info Kesehatan',
                    data,
                    pasien
                })
            })
        }).catch(error => console.log(error))
    } else{
        saveInfo(request, response)
    }
})

//UPDATE PASIEN
router.post('/ubah_pasien/:id', (request, response) => {
    Pasien.findByIdAndUpdate({ _id: request.params.id }, request.body, { new: true }, (error, _data) => {
        if( error ) throw error
        response.redirect('/admin/data_pasien')
    })
})

//CREATE PASIEN
router.post('/pasien', (request, response) => {
    let errors = []

    if( request.body.nama == '' || request.body.alamat == '' || request.body.telfon == '' || request.body.no == '' ) {
        errors.push({ message: 'isi Pasien Untuk Didaftarkan' })
    } else{
        if( errors.length > 0 ) {
            Pasien.collection.estimatedDocumentCount().then(doc => {
                Pasien.find((error, data) => {
                    response.render('admin/daftar-pasien', {
                        page: 'Daftar Pasien',
                        data,
                        noPasien: doc,
                        error
                    })
                })
            }).catch(error => console.log(error))
        } else{
            Pasien.findOne({ telfon: request.body.telfon }).then(pasien => {
                Pasien.findOne({ no: request.body.no }).then(no => {
                    if( pasien ) {
                        errors.push({ message: 'No Telfon/Hp Telah Digunakan' })
                        Pasien.collection.estimatedDocumentCount().then(doc => {
                            Pasien.find((_error, data) => {
                                response.render('admin/daftar-pasien', {
                                    page: 'Daftar Pasien',
                                    data,
                                    noPasien: doc,
                                    errors
                                })
                            })
                        }).catch(error => console.log(error))
                    } else if( no ) {
                        errors.push({ message: 'No Pasien Telah Digunakan' })
                        Pasien.collection.estimatedDocumentCount().then(doc => {
                            Pasien.find((_error, data) => {
                                response.render('admin/daftar-pasien', {
                                    page: 'Daftar Pasien',
                                    data,
                                    noPasien: doc,
                                    errors
                                })
                            })
                        }).catch(error => console.log(error))
                    } else {
                        registerPasien(request, response)
                    }
                })
            })
        }
    }
})

//JADWAK CHECK
router.post('/jadwal', (request, response) => {    
    Janji.findOneAndUpdate({ _id: request.body.idP }, request.body, { new: true }).then(found => {
        request.flash('success_message', 'Telah datang')
        response.redirect('/admin/jadwal')
    }).catch(error => {
        response.redirect('/error')
        console.log(error)
    })
})

module.exports = router