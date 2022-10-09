var currentWatch = null;
var counter = require('Storage').read("hang.counter.txt");
var interval = null;
var countDown = null;

function quit() {
	load();
}

function clearCounter() {
	E.showMenu();

	g.clear(true);

	saveCounter(0);
	Bangle.buzz(1000);
	setTimeout(showMenu,1000);
	E.showMessage("Rensat");
}

function startWorkout() {

	E.showMenu();
	Bangle.setLCDTimeout(0);
  Bangle.setLCDBrightness(1);
	Bangle.setLCDPower(1);

	currentWatch = setWatch(function() {
		clearInterval(interval);
		saveCounter(counter-1);

		var minutes = Math.floor(counter/60);
		var seconds = counter%60;
		E.showMessage(minutes+" minuter\n"+seconds+" sekunder");

    Bangle.setLCDBrightness(0);

		currentWatch = setWatch(startWorkout,BTN1);
	},BTN1);

	E.showMessage("Pass på!","Nedräkning");
	countDown = 6;

	counter--;
	interval = setInterval(function() {

		if(countDown > 0) {
			countDown--;
			E.showMessage(""+countDown,"Nedräkning");
			Bangle.buzz(countDown == 0 ? 1000 : 100);
			return;
		}

		counter++;
		var minutes = Math.floor(counter/60);
		var seconds = counter%60;
		E.showMessage(minutes+" minuter\n"+seconds+" sekunder");

		if(seconds == 30) {
			Bangle.buzz(1000);
		}
	},1000);

}

function saveCounter(count) {
	clearInterval(interval);
	if(count == undefined) count = 0;
	counter = count;

	require('Storage').write("hang.counter.txt",count);
}

var menu = {
	"" : {
		"title" : "-- Hang --"
	},
	"Häng" : startWorkout,
	"Nollställ" : clearCounter,
	"Avsluta" : quit,
};

function showMenu() {
	if(currentWatch != null) {
		clearWatch(currentWatch);
		currentWatch = null;
	}

	saveCounter(counter);

	g.clear(true);
	Bangle.setLCDTimeout(20);
	Bangle.setLCDBrightness(1);
	Bangle.setLCDPower(1);

	E.showMenu(menu);
}

showMenu();
Bangle.on('swipe', function(directionLR, directionUD) { showMenu(); });