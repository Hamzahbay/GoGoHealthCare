const LocalStrategy = require('passport-local').Strategy
const mongoose = require('mongoose')

//LOAD FROM DB
const Pasien = require('./../models/Pasien')

module.exports = function(passport) {
    passport.use(new LocalStrategy({
        usernameField: 'nama',
        passwordField: 'no'
    }, (nama, no, done) => {
        //MATCH PASIEN
        Pasien.findOne({ nama }).then(pasien => {
            if( !pasien ) {
                return done(null, false, { message: 'Nama Belum Terdaftar' })
            } /*else{
                Pasien.findOne({ no }).then(no => {
                    if( !no ) {
                        return done(null, false, { message: 'Nomor Pasien Salah' })
                    } else{
                        return done(null, pasien)
                    }
                })
            }*/
            if( no != pasien.no ) {
                return done(null, false, { message: 'Nomor Pasien Salah' })
            }
            return done(null, pasien)
        }).catch(error => done(error))
    }))

    passport.serializeUser((pasien, done) => {
        done(null, pasien.id)
    })
      
    passport.deserializeUser((id, done) => {
        Pasien.findById(id, (err, pasien) => {
            done(err, pasien)
        })
    })
}