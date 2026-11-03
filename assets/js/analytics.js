(() => {
  const counter = document.getElementById('licnt5175');
  if (!counter) return;

  const display = typeof screen === 'undefined'
    ? ''
    : ';s' + screen.width + '*' + screen.height + '*' + (screen.colorDepth || screen.pixelDepth);
  counter.src = 'https://counter.yadro.ru/hit?t45.18;r' + escape(document.referrer)
    + display + ';u' + escape(document.URL)
    + ';h' + escape(document.title.substring(0, 150)) + ';' + Math.random();
})();
