var data = [
	"1500m löpning (400m löpning)",
	"Bära säck",
	"Klättervägg",
	"Dipswalk",
	"400m löpning med hinder",
	"Atlas stenar",
	"Ringar + Rig",
	"Irländskabordet",
	"200m med tung boll",
	"Över/under x2",
	"Repklättring",
	"Ring traverse",
	"400m löpning med hinder",
	"Laxtrappa (alt. Skorsten)",
	"Väggen",
	"Dragonsback x4",
	"400m löpning med boll",
	"Lowrig",
	"Djävulstrappan (alt. Armgång)",
	"Rampen"
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