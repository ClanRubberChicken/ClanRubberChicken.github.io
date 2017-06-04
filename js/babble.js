var babble_bpos = 0;
var babble_bawk = 'BAWK';
var maxlines = 25;
var babble_aText = new Array();
var babble_fText = '';
var babble_pos = 0;

(function babble() {
    if (babble_pos >= maxlines) {
        babble_aText.shift();
        babble_pos--;
    }

    if (Math.random() > 0.5) {
        babble_fText += 'B';
        while (babble_bpos < babble_bawk.length) {
            if (Math.random() > 0.5) babble_bpos++;

            if (Math.random() > 0.5) {
                babble_fText += babble_bawk.charAt(babble_bpos).toUpperCase();
            } else {
                babble_fText += babble_bawk.charAt(babble_bpos).toLowerCase();
            }
        }

        babble_bpos = 0;

    } else {
        if (Math.random() > 0.5) {
            babble_fText += 'Arise';
            if (Math.random() > 0.5) babble_fText += ' Chicken';
        } else {
            babble_fText += 'Chicken';
            if (Math.random() > 0.5) babble_fText += ' Arise';
        }
    }

    if (Math.random() > 0.5) {
        babble_fText += '!<br>';
    } else if (Math.random() > 0.5) {
        babble_fText += '?<br>';
    } else {
        babble_fText += '<br>';
    }

    babble_aText[babble_pos] = babble_fText;
    babble_fText = '';

    for (i = 0; i <= babble_pos; i++)
    babble_fText += babble_aText[i];

    $("#arise").html(babble_fText);
    babble_fText = '';
    babble_pos = babble_aText.length;
    setTimeout(babble, 5000 * Math.random());
}());
