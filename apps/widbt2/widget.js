WIDGETS.bluetooth2={area:"tr",width:15,draw:function() {
  g.reset();
  if (NRF.getSecurityStatus().connected) {
    g.setColor((g.getBPP()>8) ? "#07f" : (g.theme.dark ? "#0ff" : "#00f"));
	g.drawImage(atob("CxQBBgDgFgJgR4jZMawfAcA4D4NYybEYIwTAsBwDAA=="),2+this.x,2+this.y);
  }
},changed:function() {
  WIDGETS.bluetooth2.draw();
}};
NRF.on('connect',WIDGETS.bluetooth2.changed);
NRF.on('disconnect',WIDGETS.bluetooth2.changed);
