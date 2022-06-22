var data = [
	"400m löpning + över/under","Kryphinder","Skull-valley","Burpee box jumps x 7","400 m löpning + ringar/monkey bar","Irländska bordet","Low rig","Atlasstenar","Trapplöpning, 3 squats innan korsande av väg","Ringar (+rigg)","Dipswalk","Pull ups x 5 (x 8)","200 m löpning med tung boll","Laxtrappa (alt. Skorsten)","Väggarna","Repklättring i box (x 3)","Trapplöpning + 3 squats","Djävulstrappan (alt. Armgång)","Rampen","Utfallsteg med hantel × 16"
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