// fetch('./json/data-info_kesehatan.json').then(response => response.json()).then(response => {
//     const data = response.dataArticle
//     let write = ''
//     for ( const m of data ) {
//         write += `
//         <tr>
//             <td><img src="${m.article_img}"></td>
//             <td>-</td>
//             <td><p class="size-xlarge">${m.article_title}</p><p class="gray">${m.article_category}</p><div class="size-small float-right">Tanggal: ${m.article_date}</div></td>
//         </tr>
//         `
//     }
//     document.querySelector('.container .contents table').innerHTML = write
// })
// fetch('./json/data-info_kesehatan.json').then(response => response.json()).then(response => {
//     const data = response.dataArticle
//     let write = ''
//     document.querySelectorAll('.container .category ul li').forEach(x => {
//         x.addEventListener('click', e => {
//             console.log(e.target)
//             if ( e.target.textContent == x.innerHTML ) {
//                 x.classList.add('actived-list')
//                 for ( const m of data ) {
//                     if ( e.target.textContent == m.article_category ) {
//                         write += `
//                                 <tr>
//                                     <td><img src="${m.article_img}"></td>
//                                     <td>-</td>
//                                     <td><p class="size-xlarge">${m.article_title}</p><p class="gray">${m.article_category}</p><div class="size-small float-right">Tanggal: ${m.article_date}</div></td>
//                                 </tr>
//                                 `
//                                 document.querySelector('.container .contents table').innerHTML = write
//                     }
//                 }
//             }
//         })
//     })
// })