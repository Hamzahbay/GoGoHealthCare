const app = require('express')()
const layouts = require('express-ejs-layouts')
const bp = require('body-parser')
const flash = require('connect-flash')
const session = require('express-session')
const passport = require('passport')
const port = process.env.PORT || 12000

//PASSPORT CONFIG
require('./config/passport')(passport)

//DB CONNECTION
require('./config/connection')

//EJS ENGINE
app.use(layouts)
app.set('view engine', 'ejs')

//BODYPARSER
app.use(bp.urlencoded({ extended: false }))

//EXPRESS SESSION
app.use(session({
    secret: 'medkit',
    resave: false,
    saveUninitialized: true
}))

//PASSPORT MIDDLEWARE
app.use(passport.initialize())
app.use(passport.session())

//CONNECT FLASH
app.use(flash())

//GLOBAL VARIABLES
app.use((request, response, next) => {
    response.locals.success_message = request.flash('success_message')
    response.locals.error_message = request.flash('error_message')
    response.locals.error = request.flash('error')
    next()
})

//ROUTES
app.use('/', require('./routes/index'))
app.use('/admin', require('./routes/admin'))

//PUBLIC
app.use(require('express').static('public'))

//CONTACT HANDLE
app.get('/contact', (request, response) => {
    response.render('contact/index')
})
//ERROR PAGE HANDLE
app.get('/error', (request, response) => {
    response.render('404/index', { page: 'Not Found!' })
})
app.get('*', (request, response) => {
    response.status(404).redirect('/error')
})

app.listen(port, () => console.log(`Listening Port ${port}.... link: http://localhost:${port}`))