var rnum //single digit hexadecimal number
var count=0 //counter for changeColor() while loop
var color="" //full 6 digit hexadecimal number
var rawRGB //raw RGB value before conversion to hex
var speed=500 //interval in milliseconds for timeChange() & slipChange()
var MathRandom=1//flag set by checkApp() to "0" if browser is old, or not Netscape nor IE
//random #'s are calculated by noRand() instead of Math.random()
var altrand //flag set to "1" when alternate random button is turned on
var slip=0 //flag set by slipChange() to change colors independently
var safe=0 //flag set by button(s) to round to web-safe colors with safeColors()
var stop=0 //flag set by "Stop the Madness" button - check status in safeColors()
//to change display values only when change is stopped
var netColor //passes browser-safe palette values from safeColor() to changeColor()
var el="" //tells setRGB() which element user is changing
var once=0 //display "Easter Egg" in getBG() only when bg is set for first time -
//(or anytime document.bgColor is set to "#deface")
var textVal //user-input hex value for validation and setting specific colors
var linkClick=0
//timerTEXT=setTimeout("",1) //initialize timers for slipChange() independent change function
//timerLINK=setTimeout("",1) //changeBG() called by "timerID"
//timerVLINK=setTimeout("",1)
//timerSCROLL=setTimeout("",1)
timerBORDER=setTimeout("",1)
timerID=setTimeout("",1)
function changeColor(){ //returns "color" a full 6 digit hexadecimal html color code
stop=0
count=0
color=""
while (count<6){
count++
newHex()
color=color+rnum
}
if (safe){ //round to web-safe palette values
safeColor(color)
color=netColor
}
}
function newHex(){ //returns "rnum" - a random single digit hexadecimal between 0-15
if (MathRandom){ //use Math.random() if possible
rawRGB = Math.floor(Math.random()*16)
}else if (!MathRandom){noRand()} //alternate random method
if (rawRGB==10){rnum="a"} //Convert to Hexadecimal
else if (rawRGB==11){rnum="b"}
else if (rawRGB==12){rnum="c"}
else if (rawRGB==13){rnum="d"}
else if (rawRGB==14){rnum="e"}
else if (rawRGB==15){rnum="f"}
else {rnum=rawRGB}
return (rnum)
}
function noRand(){ //alternate random method for old and non-Netscape and non-IE browsers
var today=new Date()
var msec=today.getMilliseconds()
rawRGB=Math.round(Math.abs(Math.sin(msec))*10000000)%16
return rawRGB
}
function timeChange(){ //calls value-changing functions recursively with timer
if ((timerID!=null || timerID!="")) clearTimeout(timerID)
//changeBg(color)
//changeText(color)
//changeLink(color)
//changeVlink(color)
changeBorder(color)
timerID=setTimeout("timeChange()",speed)
}
function slipChange(){ //calls value-changing functions separately with timers
//multiply speed*4 for a more interesting effect at default speed=1000
//timerID=setTimeout("changeBg(),showRGB(),slipChange()",Math.random()*speed*4)
//timerTEXT=setTimeout("changeText(),showRGB()",Math.random()*speed*4)
//timerLINK=setTimeout("changeLink(),showRGB()",Math.random()*speed*4)
//timerVLINK=setTimeout("changeVlink(),showRGB()",Math.random()*speed*4)
timerBORDER=setTimeout("changeBorder(),showRGB()",Math.random()*speed*4)
slip=1
//stop=0
}
function webSafe(){ //changes displays to web-safe if change is stopped; set "safe" flag
if (!safe){ //if change function is stopped, convert & display web-safe values
color=window.document.bgColor
safeColor(color)
window.document.bgColor=netColor
color=window.document.fgColor
safeColor(color)
window.document.fgColor=netColor
color=window.document.linkColor
safeColor(color)
window.document.linkColor=netColor
color=window.document.vlinkColor
safeColor(color)
window.document.vlinkColor=netColor
window.document.body.style.scrollbarBaseColor=netColor
}
if (stop) showRGB()
if (slip) showRGB()
safe=1
}
function safeColor(color){ //round to web-safe palette values
var oneDigit=0 //single digit of hex value pair
var rgb=0 //one digit of hex value in rgb form (0-255)
var oneColor //sum of both digits in rgb (0-255)
var eachColor=0 //counter to cycle through red, green, blue in order
var digit=0 //counter to cycle through both digit substrings of each color
var nan=0 //hex letter numeric value for addition of substrings
var colorName="" //used with "digit" to call individual substrings
if (color.substring(0,1)=="#"){color=color.substring(1,7)} //strip # if present
//split into individual digits, keeping rgb and place info
var red1=color.substring(0,1)
var red2=color.substring(1,2)
var grn1=color.substring(2,3)
var grn2=color.substring(3,4)
var blu1=color.substring(4,5)
var blu2=color.substring(5,6)
color="" //clear "color" - rebuild with web-safe values
while (eachColor<3){ //loop through red, green, blue
eachColor++
digit=0
oneColor=""
while (digit<2){ //loop through both single digit substrings for each color
digit++
if (eachColor==1){colorName="red"}
if (eachColor==2){colorName="grn"}
if (eachColor==3){colorName="blu"}
oneDigit=eval(colorName + digit)
// test=parseFloat(oneDigit) //test for non-numeric hex values (a,b,c,d,e,f):
if ((oneDigit=="a" || oneDigit=="A" || oneDigit=="b" || oneDigit=="B" || oneDigit=="c" || oneDigit=="C" || oneDigit=="d" || oneDigit=="D" || oneDigit=="e" || oneDigit=="E" || oneDigit=="f" || oneDigit=="F")){
if(nan==0){nan=rgb} //if 1st substring was a numeral and 2nd
//substring is a letter, rgb from 1st is
//"remembered" by nan
//convert hex to rgb values
if (oneDigit=="a" || oneDigit=="A"){rgb=10}
if (oneDigit=="b" || oneDigit=="B"){rgb=11}
if (oneDigit=="c" || oneDigit=="C"){rgb=12}
if (oneDigit=="d" || oneDigit=="D"){rgb=13}
if (oneDigit=="e" || oneDigit=="E"){rgb=14}
if (oneDigit=="f" || oneDigit=="F"){rgb=15}
if (digit==1){rgb=rgb*16} //multiply by hex base 16 (first pass)
//if the substring is a letter: if digit=1,nan=0; if digit=2,sums both substrings (new rgb + nan)
nan=eval(rgb + nan) //nan now stores the rgb value(s)
rgb=0 //reset rgb for 2nd pass
}else{
//if the substring is a number: sums both substrings; 1st pass rgb was initialized at 0
rgb=eval(rgb + eval(oneDigit))
if (digit==1){rgb=rgb*16}//multiply by hex base 16 (first pass)
}
if(digit==2){ //oneColor assumes rgb value from "rgb" or "nan" on second pass
//(either "nan" or "rgb" is 0)
oneColor=oneColor + eval(rgb + nan)
rgb=0 //at end of 2nd pass reset rgb & nan to 0 for next color
nan=0}
}
//round to web-safe values - one color at a time
if (oneColor>=0 && oneColor<26){oneColor="00"} //must be string "00" - 00 evaluates as 0
else if (oneColor>=26 && oneColor<77){oneColor=33}
else if (oneColor>=77 && oneColor<128){oneColor=66}
else if (oneColor>=128 && oneColor<179){oneColor=99}
else if (oneColor>=179 && oneColor<230){oneColor="cc"}
else if ((oneColor!="cc")&&(oneColor>=230 && oneColor<=255)){oneColor="ff"}
color=color+oneColor //add hex value to new "color" string
}
netColor=color //passes web-safe value from safeColor() to changeColor()
}
function changeBg(){ //sets bg color to new value
changeColor()
window.document.bgColor="#" + color
}
function changeText(){ //sets text color to new value
changeColor()
document.getElementById('MRC').style.setProperty('border-left', '1px solid #' + color, '');
document.getElementById('MRC').style.setProperty('border-top', '1px solid #' + color, '');
document.getElementById('MRB').style.setProperty('border-left', '1px solid #' + color, '');
document.getElementById('MRB').style.setProperty('border-right', '1px solid #' + color, '');
document.getElementById('MRB').style.setProperty('border-top', '1px solid #' + color, '');
document.getElementById('HED').style.setProperty('border-left', '1px solid #' + color, '');
document.getElementById('HED').style.setProperty('border-right', '1px solid #' + color, '');
document.getElementById('HED').style.setProperty('border-top', '1px solid #' + color, '');
document.getElementById('MBB').style.setProperty('border', '1px solid #' + color, '');
window.document.fgColor="#" + color
textcolor=window.document.fgColor
}
function changeBorder(){ //sets text color to new value
changeColor()
document.getElementById('MRC').style.setProperty('border-left', '1px solid #' + color, '');
document.getElementById('MRC').style.setProperty('border-top', '1px solid #' + color, '');
document.getElementById('MRB').style.setProperty('border-left', '1px solid #' + color, '');
document.getElementById('MRB').style.setProperty('border-right', '1px solid #' + color, '');
document.getElementById('MRB').style.setProperty('border-top', '1px solid #' + color, '');
document.getElementById('HED').style.setProperty('border-left', '1px solid #' + color, '');
document.getElementById('HED').style.setProperty('border-right', '1px solid #' + color, '');
document.getElementById('HED').style.setProperty('border-top', '1px solid #' + color, '');
document.getElementById('MBB').style.setProperty('border', '1px solid #' + color, '');
}
function changeLink(){ //sets link color to new value
changeColor()
window.document.linkColor="#" + color
}
function changeVlink(){ //sets vlink color to new value
changeColor()
window.document.vlinkColor="#" + color
}
