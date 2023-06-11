const { Cookie } = require('express-session')
const Pasien = require('./../models/Pasien')

module.exports = {
    ensureAuthenticated: function(request, response, next) {
        if( request.isAuthenticated() ) return next()
        request.flash('error_message', 'Isi Untuk Melihat')
        response.redirect('/tanya_dokter')
    }
}