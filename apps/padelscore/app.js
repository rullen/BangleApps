require('Font5x9Numeric7Seg').add(Graphics);
require('Font7x11Numeric7Seg').add(Graphics);
require('FontTeletext5x9Ascii').add(Graphics);

let score00 = 0;
let score15 = 1;
let score30 = 2;
let score40 = 3;
let dc = 4;
let ad = 5;
let tennisScores = ['00','15','30','40','DC','AD'];

let width = g.getWidth();
let height = g.getHeight();

let player1 = 0;
let player2 = 1;

var scores;
var sets;
var games;

var inMenu = false;

function getXCoord(func) {
	let offset = 0;
	return func(width-offset)+offset;
}

function formatNumber(num, length) {
	return num.toString().padStart(length ? length : 2,"0");
}

function updateScore(player) {
	let score = scores[player];
	let x = getXCoord(width => player === player1 ? width/4 : width/4*3);
	g.setFontAlign(0,0);
	g.setFont('7x11Numeric7Seg',4);
	g.drawString(formatNumber(tennisScores[score]),x,70);
}

function updateGames(player) {
	let score = games[player];
	g.setFontAlign(player === player1 ? -1 : 1,1);
	g.setFont('5x9Numeric7Seg',2);
	g.drawString(formatNumber(score),getXCoord(width => player === player1 ? 5 : width-3),height-20);
}

function updateSet(player) {
	let score = sets[player];
	let x = getXCoord(width => player === player1 ? width/2-10 : width/2+10);
	g.setFontAlign(player === player1 ? 1 : -1,0);
	g.setFont('7x11Numeric7Seg',2);
	g.drawString(formatNumber(score),x,20);
}

function score(player) {
	let myScore = scores[player];
	let otherPlayer = player == player1 ? player2 : player1;
	let otherScore = scores[otherPlayer];

	if(myScore >= score40) {
		if(otherScore < score40 || myScore == ad) {
			return set(player);
		} else if(myScore == score40) {
			scores[player] = ad;
			scores[otherPlayer] = dc;
		} else {
			scores[player] = score40;
			scores[otherPlayer] = score40;
		}
	} else scores[player]++;

	Bangle.buzz(50);

	update();
}

function set(player) {
	let myScore = sets[player]+1;
	let otherPlayer = player == player1 ? player2 : player1;
	let otherScore = sets[otherPlayer];

	scores = [0,0];

	if(myScore >= 7 && myScore > otherScore-2)
		return game(player);

	sets[player] = myScore;
	Bangle.buzz(200);
	update();
}

function game(player) {
	sets = [0,0];
	games[player]++;

	Bangle.buzz(1000);
	update();
}

function draw() {

	g.clear(true);

	updateScore(player1);
	updateScore(player2);
	updateGames(player1);
	updateGames(player2);
	updateSet(player1);
	updateSet(player2);

	g.drawLine(getXCoord(width => width/2), 0, getXCoord(width => width/2), height);

	g.flip();
}

function update() {
	inMenu = false;
	draw();
	//Bluetooth.println(JSON.stringify({t:"http", url:"https://events.hollin.se/webhook/?bangle=OCR&returnMode=line2json"}));
}

function closeMenu() {
	if(scores == null) {
		startGame();
	} else {
		E.showMenu();
		inMenu = false;
		update();
	}
}

function quit() {
	load();
}

function resetSet() {
	 scores = [0,0];
	 closeMenu();
}

function resetGame() {
	scores = [0,0];
	sets = [0,0];
	closeMenu();
}

function startGame() {

	E.showMenu();
	Bangle.setLCDTimeout(0);
	Bangle.setLCDBrightness(0);
	Bangle.setLCDPower(1);

	scores = [0,0];
	sets = [0,0];
	games = [0,0];

	update();

	menu = {
	  "" : {
		"title" : "-- Padel score --"
	  },
	  "Tillbaka" : closeMenu,
	  "Starta ny match" : startGame,
	  "Nollställ set" : resetSet,
	  "Nollställ gem" : resetGame,
	  "Avsluta app" : quit,
	};

}

var menu = {
  "" : {
    "title" : "-- Padel score --"
  },
  "Starta ny match" : startGame,
  "Avsluta app" : quit,
};

function showMenu() {

	if(inMenu) return closeMenu();

	inMenu = true;
	g.clear(true);
	Bangle.setLCDTimeout(20);
	Bangle.setLCDBrightness(1);
	Bangle.setLCDPower(1);

	E.showMenu(menu);
}

showMenu();
setWatch(showMenu,BTN1, { repeat: true });

Bangle.on('touch', (button, coords) => {
	if(inMenu) return;
	var player = coords.x < getXCoord(width => width/2) ? player1: player2;
	score(player);
});