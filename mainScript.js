function mainScript() {
     Game.ModeListener();
     Game.LevelListener(Game.getLevel());
     window.requestAnimationFrame(mainScript);
}

window.onload = function() {
     Game.inventoryHandler();
     mainScript();
}
