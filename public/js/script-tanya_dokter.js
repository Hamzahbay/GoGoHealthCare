for( const m of document.querySelectorAll('.box .alert-box .error-box') ) {
    if( m.firstChild.nodeValue == "\n                    Missing credentials\n                    " ) {
        m.parentNode.remove()
    }
}