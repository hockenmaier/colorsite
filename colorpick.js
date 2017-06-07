/**
 * Created by Hockenmaier on 5/17/2017.
 */

var canvas = document.getElementById('canvas_picker')
var ctx = canvas.getContext('2d');
var SizeX = 0;
var SizeY = 0;
resizeCanvas();
testAPI();

window.addEventListener('resize', resizeCanvas, false);
canvas.addEventListener('mousemove', function(event){onMove(event)});

function resizeCanvas() { //this resizes the canvas and is called when the window size changes
    //console.log('resized')
    SizeX = window.innerWidth*.95;
    SizeY = window.innerHeight*.85;
    canvas.width = SizeX;
    canvas.height = SizeY;
    reDraw();
}


function onMove(evt){
  var position = getMousePos(evt);
  console.log(position.x);
  console.log(position.y);

  reDraw();  //redraws the original canvas to get rid of past indicator circles
  var posColor = getColor(evt,position); //gets the color at the position and draws an indicator circle at the pointer
  var radius = SizeY*.09;
  ctx.beginPath();
  ctx.arc(position.x,position.y,radius,0,2*Math.PI,false)
  ctx.fillStyle = posColor[0];
  ctx.fill();
  ctx.lineWidth = 3;
  ctx.strokeStyle = posColor[1];
  ctx.stroke();
  var arrColor = posColor[2]
  var hexColor = rgbToHex(arrColor[0],arrColor[1],arrColor[2])
  console.log(hexColor);
}

function getColor(evt,position){
    //console.log('mouse moved')
    var imgData = ctx.getImageData(position.x,position.y,1,1);
    var color = 'rgba('+imgData.data[0]+','+imgData.data[1]+','+imgData.data[2]+','+imgData.data[3]+')'
    var arrColor = [imgData.data[0],imgData.data[1],imgData.data[2]];
    var darkVariance = -70
    var darkColor = 'rgba('+(imgData.data[0]+darkVariance)+','+(imgData.data[1]+darkVariance)+','+(imgData.data[2]+darkVariance)+','+imgData.data[3]+')'
    console.log('the color is ' + color);
    return [color,darkColor,arrColor];
}

function reDraw() {
    var gradX = ctx.createLinearGradient(0,0,SizeX,0);
    var gradY = ctx.createLinearGradient(0,0,0,SizeY);
    var xAlpha = 1;
    var inc = 1/12;
    gradX.addColorStop(0*inc, 'rgba(255, 0, 0, '+xAlpha+')');
    gradX.addColorStop(1*inc, 'rgba(255, 0, 128, '+xAlpha+')');
    gradX.addColorStop(2*inc, 'rgba(255, 0, 255, '+xAlpha+')');
    gradX.addColorStop(3*inc, 'rgba(128, 0, 255, '+xAlpha+')');
    gradX.addColorStop(4*inc, 'rgba(0, 0, 255, '+xAlpha+')');
    gradX.addColorStop(5*inc, 'rgba(0, 128, 255, '+xAlpha+')');
    gradX.addColorStop(6*inc, 'rgba(0, 255, 255, '+xAlpha+')');
    gradX.addColorStop(7*inc, 'rgba(0, 255, 128, '+xAlpha+')');
    gradX.addColorStop(8*inc, 'rgba(0, 255, 0, '+xAlpha+')');
    gradX.addColorStop(9*inc, 'rgba(255, 255, 0, '+xAlpha+')');
    gradX.addColorStop(10*inc, 'rgba(255, 128, 0, '+xAlpha+')');  //for some reason this needs some b
    gradX.addColorStop(11*inc, 'rgba(255, 0, 0, '+xAlpha+')');
    gradX.addColorStop(11.8*inc, 'rgba(128, 128, 128, '+xAlpha+')');
    ctx.fillStyle = gradX;
    ctx.fillRect(0,0,SizeX,SizeY);
    gradY.addColorStop(.025,'rgba(255, 255, 255, 1)');
    gradY.addColorStop(.5,'rgba(255, 255, 255, 0)');
    gradY.addColorStop(.5,'rgba(0, 0, 0, 0)');
    gradY.addColorStop(.975,'rgba(0, 0, 0, 1)');
    ctx.fillStyle = gradY;
    ctx.fillRect(0,0,SizeX,SizeY);

}

function getMousePos(evt) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
}

function testAPI() {
    var xhttp = new XMLHttpRequest();
    xhttp.open('GET', 'http://placekitten.com', false);
    xhttp.send();console.log(xhttp.responseType);
    console.log(xhttp.status);
    console.log(xhttp.responseText);
}

function rgbToHex(r, g, b) {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}
/*
request('http://www.google.com', function(error, response, body) {
    console.log(body);
});

 function testAPI() {
 var xhttp = new XMLHttpRequest();
 xhttp.open("POST", "Your Rest URL Here", false);
 xhttp.setRequestHeader("Content-type", "application/json");
 xhttp.send();
 var response = JSON.parse(xhttp.responseText);
 }
    */
