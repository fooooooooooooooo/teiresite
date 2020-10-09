let asteroidsRunning = false;

function triggerGame(){
  if (!asteroidsRunning && document.getElementById('astroids-page') != undefined) {
    asteroidsRunning = true;
    init();
    document.getElementById('score').classList.toggle('hidden');
    document.getElementById('marquee').classList.toggle('hidden');
  }
}