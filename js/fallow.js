
var bodyElements = document.getElementsByTagName('body');
    
$(document).mousemove(function(event) {
    var xPos = event.pageX;
    var yPos = event.pageY;
    bodyElements[0].style.backgroundPosition=xPos + 'px ' + yPos + 'px';
});
