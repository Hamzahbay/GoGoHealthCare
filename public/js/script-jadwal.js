for( const m of document.querySelectorAll('.container .box .content') ) {
    m.addEventListener('click', function() {
        m.lastElementChild.classList.toggle('display-none')
        document.querySelector('.container .bg-clicked').classList.toggle('display-none')
    })
}

for( const m of document.getElementsByClassName('labelCheck') ) {
    m.addEventListener('click', function() {
        m.previousElementSibling.setAttribute('checked', true)
    })
}

const tggl = document.getElementsByClassName('tggl')
const date = new Date()

function tgglJanji(date) {
    let y = `${date.getFullYear()}`
    let m = `${date.getMonth() + 1}`
    let d = `${date.getDate()}`
    
    if( m.length == 1 ) {
        m = `0${date.getMonth() + 1}`
    }

    if( d.length == 1 ) {
        d = `0${date.getDate()}`
    }

    blnJanji(date, y, m, d)
}

const blnJanji = (date, ...Var) => {
    for( const x of tggl ) {
        const arr = x.textContent.split('-')
        if( arr[2] == Var[2] ) {
            x.parentElement.parentElement.classList.toggle('nn')
        }

        if( arr[1] == Var[1] && arr[2] > Var[2] ) {
            x.parentElement.parentElement.classList.toggle('mm')
        }

        if( arr[1] > Var[1] && arr[0] >= Var[0] ) {
            x.parentElement.parentElement.classList.toggle('dd')
        }

        if( arr[1] <= Var[1] && arr[2] < Var[2] || arr[0] < Var[0] ) {
            x.parentElement.parentElement.classList.toggle('tt')
        }
        
    }
}

tgglJanji(date)

for( const a of document.querySelectorAll('.container .box1 .content') ) {
    if( a.classList.contains('nn') ) {
        a.remove()
    }
}
for( const a of document.querySelectorAll('.container .box2 .content') ) {
    if( a.classList.contains('mm') ) {
        a.remove()
    }
}
for( const a of document.querySelectorAll('.container .box3 .content') ) {
    if( a.classList.contains('dd') ) {
        a.remove()
    }
}
for( const a of document.querySelectorAll('.container .box4 .content') ) {
    if( a.classList.contains('tt') ) {
        a.remove()
    }
}

const ntFunc = () => {
    if( document.querySelector('.container .box1') != null ) {
        if( document.querySelectorAll('.container .box1 .content').length < 1 ) {
            document.querySelector('.container .box1').innerHTML += '<p class="nothing">Tidak Ada Jadwal</p>'
        }
        if( document.querySelectorAll('.container .box4 .content').length < 1 ) {
            document.querySelector('.container .box4').innerHTML += '<p class="nothing">Tidak Ada</p>'
        }
        if( document.querySelectorAll('.container .box3 .content').length < 1 ) {
            document.querySelector('.container .box3').innerHTML += '<p class="nothing">Tidak Ada Jadwal</p>'
        }
        if( document.querySelectorAll('.container .box2 .content').length < 1 ) {
            document.querySelector('.container .box2').innerHTML += '<p class="nothing">Tidak Ada Jadwal</p>'
        }
    }
    if( document.querySelectorAll('.container .box4 .content').length < 1 ) {
        document.querySelector('.container .box4').innerHTML += '<p class="nothing">Tidak Ada</p>'
    }
}
ntFunc()