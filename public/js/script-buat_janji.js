const calendar = document.querySelector('.container .calendar')
const date = new Date()
let dayDate = day => {
    let write = ''
    if ( day.getDay() == 0 ) write+= 'Minggu'
    if ( day.getDay() == 1 ) write+= 'Senin'
    if ( day.getDay() == 2 ) write+= 'Selasa'
    if ( day.getDay() == 3 ) write+= 'Rabu'
    if ( day.getDay() == 4 ) write+= 'Kamis'
    if ( day.getDay() == 5 ) write+= 'Jumat'
    if ( day.getDay() == 6 ) write+= 'Sabtu'
    return write
}
let calendarDay = index => {
    let write = ''
    if ( index == 1 ) write+= 'Senin'
    if ( index == 2 ) write+= 'Selasa'
    if ( index == 3 ) write+= 'Rabu'
    if ( index == 4 ) write+= 'Kamis'
    if ( index == 5 ) write+= 'Jumat'
    if ( index == 6 ) write+= 'Sabtu'
    if ( index == 7 ) write+= 'Minggu'
    return write
}
let monthDate = month => {
    let write = ''
    if ( month.getMonth() == 0 ) write+= 'Januari'
    if ( month.getMonth() == 1 ) write+= 'Februari'
    if ( month.getMonth() == 2 ) write+= 'April'
    if ( month.getMonth() == 3 ) write+= 'Maret'
    if ( month.getMonth() == 4 ) write+= 'Mei'
    if ( month.getMonth() == 5 ) write+= 'Juni'
    if ( month.getMonth() == 6 ) write+= 'Juli'
    if ( month.getMonth() == 7 ) write+= 'Agustus'
    if ( month.getMonth() == 8 ) write+= 'September'
    if ( month.getMonth() == 9 ) write+= 'Oktober'
    if ( month.getMonth() == 10 ) write+= 'November'
    if ( month.getMonth() == 11 ) write+= 'Desember'
    return write
}
let fullDateMonth = date => {
    let write = 0
    if ( date.getMonth() % 2 == 0 ) write = 30
    else write = 31
    return write
}
let workList = list => {
    let write = ''
    if ( list == 30 || list == 16 || list == 2 || list == 10 ) write += `<li>A1</li>`
    if ( list == 4 || list == 26 ) write += `<li>B4</li>`
    if ( list == 16 || list == 26 ) write += `<li>E1</li>`
    if ( list == 30 || list == 2 ) write += `<li>K3</li>`
    if ( list == 10 || list == 26 ) write += `<li>K4</li>`
    if ( list == 4 || list == 16 ) write += `<li>E4</li>`
    if ( list == 12 || list == 4 ) write += `<li>K2</li>`
    return `<ul>${write}</ul>`
}

document.querySelector('.title span').innerHTML = monthDate(date)

for ( let i = 1; i <= fullDateMonth(date); i++ ) {
    calendar.insertAdjacentHTML('beforeend', `<div class="text-left" data-date="${i}"><p class="day size-small text-center">${calendarDay(i)}</p><p class="text-center size-large">${i}</p>${workList(i)}</div>`)
    for ( const m of document.querySelectorAll('.container .calendar div') ) {
        let write = ''
        if ( m.dataset.date == new Date().getDate() ) {
            m.classList.add('date-now')
            if ( m.querySelector('ul li') == null ) {
                write = `- Tidak Ada Jadwal`
                if ( new Date().getDay() == 6 || new Date().getDay() == 0 ) write = `- Hari Libur`
            }
            if ( m.querySelector('ul li') != null ) {
                write = m.querySelector('ul li').outerHTML
            }
            document.querySelector('.container .nb .schedule div').innerHTML = write
        }
    }
}