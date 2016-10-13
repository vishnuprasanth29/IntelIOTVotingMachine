var dataUpload=require("./uplink");
var mraa=require("mraa");
var LCD = require("jsupm_i2clcd");
var closed;
var ready=false;
var myLCD = new LCD.Jhd1313m1(6, 0x3E, 0x62);
myLCD.setCursor(0,1);
var x = new mraa.Gpio(13);
var y = new mraa.Gpio(12);
var z = new mraa.Gpio(11);
var green=new mraa.Gpio(10);
var red=new mraa.Gpio(9);
  x.dir(mraa.DIR_IN);
  y.dir(mraa.DIR_IN);
  z.dir(mraa.DIR_IN);
  green.dir(mraa.DIR_OUT);
  red.dir(mraa.DIR_OUT);
  green.write(0);
  red.write(1);
  myLCD.write("Waiting for user data");
dataUpload.checkUser("12345").then(function(value){
	ready=!value;
runner();
watchPanel();
green.write(1);
red.write(0);
myLCD.clear();
myLCD.setCursor(0,1);
myLCD.write("Vote now");
},function(value){
ready=!value;
runner();
watchPanel();
green.write(0);
red.write(1);
myLCD.clear();
myLCD.setCursor(0,1);
myLCD.write("Connection Failed");
});
var watchPanel = function(){
	if(ready){
x.isr(mraa.EDGE_RISING,function(){
console.log("pin 0 pressed");
if(ready){
dataUpload.updateVote("qwerty","12345");
green.write(0);
red.write(1);
myLCD.clear();
myLCD.setCursor(0,1);
myLCD.write("You have successfully voted");
clearInterval(closed);
ready=false;
}
});
y.isr(mraa.EDGE_RISING,function(){
console.log("pin 1 pressed");
if(ready){
dataUpload.updateVote("asdfg","12345");
green.write(0);
red.write(1);
myLCD.clear();
myLCD.setCursor(0,1);
myLCD.write("You have successfully voted");
clearInterval(closed);
ready=false;
}
});
z.isr(mraa.EDGE_RISING,function(){
console.log("pin 2 pressed");
if(ready){
dataUpload.updateVote("zxcvb","12345");
green.write(0);
red.write(1);
clearInterval(closed);
myLCD.clear();
myLCD.setCursor(0,1);
myLCD.write("You have successfully voted");
ready=false;
}
});
}
else{
clearInterval(closed);
}
};
var runner= function(){
closed=setInterval(function(){
	console.log("runner is running");
         },5000);
};


