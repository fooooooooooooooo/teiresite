let asteroidsRunning = false;

function triggerGame(){
  if (!asteroidsRunning && document.getElementById('astroids-page').textContent == 'true') {
    asteroidsRunning = true;
    init();
    document.getElementById('score').classList.toggle('hidden');
    document.getElementById('marquee').classList.toggle('hidden');
  }
}