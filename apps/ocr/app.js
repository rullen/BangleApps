var data = [
	"400m löpning med rigg","Rigg","Klättervägg","Kasta prick","400m löpning","Atlas stenar","Ringar (+ Rigg)","Irländska bordet","100m med tung boll","Över/under x2","Repklättring","Skull valley","Trapplöpning, 3 squats innan korsande av väg","Väggen","Rampen","Balans ( 5 burpees)","400m löpning med rigg","Lowrig","Dragonsback x4","8 cal airbike"
];


var pos = -1;

function nextStep() {

  g.clear(true);

  pos++;

  if(pos >= data.length)
    pos = 0;

  E.showMessage(data[pos],{
    title:(pos+1)
  });

  

  setWatch(nextStep,BTN1);

}

Bangle.setLCDTimeout(0);
Bangle.setLCDBrightness(0);
Bangle.setLCDPower(1);

nextStep();
//Bangle.on('swipe', function(direction) { nextStep(); return; });

/*
require("Storage").write("kroppslabbet.info",{
  "id":"kroppslabbet",
  "name":"Kroppslabbet",
  "src":"kroppslabbet.app.js",
  "icon":"kroppslabbet.img"
});
*/