//require("Storage").writeJSON("ocr.steps.json", ["Test 1","Test 2","Test 3"]);

var step = -1;
var currentWatch = null;
let steps = require('Storage').readJSON("ocr.steps.json",true);

global.GB = (event) => {
  if(event.t == "http") {
    if(event.err) {
		E.showPrompt(event.err,{
			title : "Fel vid nedladdning",
			buttons : {"Tillbaka":true}
		}).then(function(v) {
			showMenu();
		});
	} else {
		require("Storage").write("ocr.steps.json", event.resp);
		steps = require('Storage').readJSON("ocr.steps.json",true);

		if(steps == undefined) {
			E.showPrompt(event.resp,{
				title : "Fel vid nedladdning",
				buttons : {"Tillbaka":true}
			}).then(function(v) {
				showMenu();
			});
		} else {
			step = -1;
			startWorkout();
		}
	}
  }
};

function quit() {
	load();
}

function downloadWorkout() {
	E.showMenu();

	g.clear(true);

	E.showPrompt("Laddar ner pass",{
		buttons : {"Avbryt":true}
	}).then(function(v) {
		showMenu();
	});

	Bluetooth.println(JSON.stringify({t:"http", url:"https://events.hollin.se/webhook/?bangle=OCR&returnMode=line2json"}));

}

function startWorkout() {

	if(steps == undefined) {
		downloadWorkout();
	}  else {

		E.showMenu();
		Bangle.setLCDTimeout(0);
		Bangle.setLCDBrightness(0);
		Bangle.setLCDPower(1);

		nextStep();
	}

}

function nextStep() {

  g.clear(true);

  step++;

  if(step >= steps.length)
    step = 0;

  E.showMessage(steps[step],{
    title:(step+1)
  });

  currentWatch = setWatch(nextStep,BTN1);

}

var menu = {
  "" : {
    "title" : "-- OCR --"
  },
  "Kör pass" : startWorkout,
  "Ladda ner pass" : downloadWorkout,
  "Avsluta" : quit,
};

function showMenu() {

	if(currentWatch != null) {
		step--;
		clearWatch(currentWatch);
		currentWatch = null;
	}

	g.clear(true);
	Bangle.setLCDTimeout(20);
	Bangle.setLCDBrightness(1);
	Bangle.setLCDPower(1);

	E.showMenu(menu);
}

showMenu();
Bangle.on('swipe', function(directionLR, directionUD) { showMenu(); });