let snakeRunning = false;

function triggerGame() {
  if (!snakeRunning && document.getElementById('snakePage').textContent == 'true') {
    snakeRunning = true;
    init();
    document.getElementById('teire').classList.toggle('snaked');
    document.getElementById('score').classList.toggle('hidden');
  }
}