var data = [
  "200 m med tung boll",
  "Över/under x2",
  "Laxtrappa (alt. Skorsten)",
  "Skullvalley",
  "15 cal. Rodd",
  "Farmers Walk",
  "Rigg",
  "Rampen",
  "400 m med boll och över/under",
  "Boll över vägg",
  "Valkyrian (alt. 20 sek deadhang)",
  "Irländska bordet (alt. Över/under)",
  "10 Burpees",
  "Dipwalk",
  "Klättervägg",
  "Bära säck",
  "400 m löpning med rigg",
  "Balansgång",
  "Dragonsback x4",
  "Armgång"
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