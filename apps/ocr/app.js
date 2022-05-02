var data = [
  "200 m med tung boll",
  "Över/under x2",
  "Laxtrappa (alt. Skorsten)",
  "Klätterväggen",
  "Springa över boxar x2",
  "Farmers Walk",
  "Ringar",
  "Rampen",
  "400 m med boll och över/under",
  "Väggen",
  "Skullvalley",
  "Irländska bordet (alt. Över/under)",
  "8 längder shuttlerun",
  "Bära säck",
  "Valkyrian (alt. Ringar)",
  "Rigg",
  "400 m löpning med rigg",
  "Balansgång",
  "Repklättring",
  "Dragonsback x4"
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