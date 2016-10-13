var dataUpload=require("./uplink");
var mraa=require("mraa");
var closed;
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
dataUpload.checkUser("12345").then(function(value){
runner(value);
green.write(1);
red.write(0);
},function(value){
runner(value);
green.write(0);
red.write(1);
});
var watchPanel = function(ready){
	if(ready){
x.isr(mraa.EDGE_RISING,function(){
console.log("pin 0 pressed");
dataUpload.updateVote("qwerty","12345");
green.write(0);
red.write(1);
clearInterval(closed);
});
y.isr(mraa.EDGE_RISING,function(){
console.log("pin 1 pressed");
dataUpload.updateVote("asdfg","12345");
green.write(0);
red.write(1);
clearInterval(closed);
});
z.isr(mraa.EDGE_RISING,function(){
console.log("pin 2 pressed");
dataUpload.updateVote("zxcvb","12345");
green.write(0);
red.write(1);
clearInterval(closed);
});
}
else{
clearInterval(closed);
}
};
var runner= function(value){
closed=setInterval(function(){
	watchPanel(!value);
	console.log("runner is running");
         },5000);
};


