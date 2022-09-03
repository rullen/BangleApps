(() => {

  const outline = atob("CRSBAD4AP/AYDAYDAYDAYDAYDAYDAYDAYD/w");
  let COLORS = {
    'black':    g.theme.dark ? "#fff" : "#000",
    'low':      "#f00",
  };

  function draw() {
    const bat = E.getBattery();
    const nCells = Math.ceil((bat/100)*8);
    const color = nCells > 1 ? COLORS.black : COLORS.low;


    g.reset();
    g.clearRect(this.x,this.y,this.x+13,this.y+20);
    g.setColor(color).drawImage(outline,this.x+2,this.y+2);

    for (var i=0;i<nCells;i++) {
      var x = this.x+2+2;
      var y = this.y+17+2-i*2;
      g.drawRect(x,y,x+4,y);
    }

    setTimeout(function() { WIDGETS["widslimbat2"].draw(); },60000);
  }

  Bangle.on("charging",function(charging) {
    if (charging) Bangle.buzz();
  });

  WIDGETS["widslimbat2"]={
    area:"tr",
    width:13,
    draw:draw
  };
})();