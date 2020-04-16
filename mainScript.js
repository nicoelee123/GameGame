function mainScript() {
     Game.ModeListener();
     window.requestAnimationFrame(mainScript);
}

window.onload = function() {
     Game.LevelListener(Game.getLevel());
     Game.inventoryHandler();
     mainScript();
}
