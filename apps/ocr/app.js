var data = [
	"400 m med hinder på baksidan",
	"Balans",
	"Väggen",
	"Skullvalley",
	"Repklättring",
	"Farmer Walk",
	"200 m med boll",
	"Rampen",
	"Krypa",
	"Dragons back",
	"Linbanan",
	"Bära säck",
	"Trapplöpning, 5 Squats innan ni korsar vägen ",
	"Spinning Wheels",
	"Ringar",
	"Dipswalk",
	"Klättervägg",
	"Atlas stenar"
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