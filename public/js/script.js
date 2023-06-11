document.querySelector('.navbar .material-icons').addEventListener('click', function() {
    this.classList.toggle('actived')
    document.querySelector('.navbar .responsive-menu').classList.toggle('display-none')
})

document.querySelector('.alert-box').addEventListener('click', function() {
    this.remove()
})