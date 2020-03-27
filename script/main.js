$(document).ready(function(){
    /**
     * Keypress osztályban lévő gombok lenyomása után
     * kiszedi a hozzájuk társított ASCII-kódot amit megadtunk
     * HTML-ben a data-code paramétereként, majd hozzáfűzi
     * az 'input' id-vel ellátott input fieldhez az adott karaktert.
     */
    $('.keypress').click(function() {
        var code = $(this).data('code');
        $('#input').val(function(i, val) {
            return val + String.fromCharCode(code);                
     })
    });
});