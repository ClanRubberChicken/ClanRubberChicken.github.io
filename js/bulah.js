var bodyElements = document.getElementsByTagName('body');
var pos = 1;

function runbulah() {
    setInterval(function() {
        var xPos = Math.sin(0.1 * (pos - 1.3 + 20)) * 100;
        var yPos = Math.sin(0.1 * (pos * 1.5 + 20)) * 80;
        if(pos > 300) 
            pos++;
        else
            pos--;
        bodyElements[0].style.backgroundPosition=xPos + 'px ' + yPos + 'px';
        bodyElements[0].style.transform='rotate('+(xPos*0.005)+'deg)';
        bodyElements[0].style.webkitTransform='rotate('+(xPos*0.005)+'deg)';
    }, 30);
};
    
runbulah();