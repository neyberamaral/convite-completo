
const etiquetaSelo = document.getElementById('etiquetaSelo');
const botaoAbrir = document.getElementById('abrir');
const abertura = document.getElementById('abertura');
const convite = document.getElementById('convite');
let aberturaEmAndamento = false;
const musicaConvite = document.getElementById('musicaConvite');
const controleMusica = document.getElementById('controleMusica');
if (musicaConvite) musicaConvite.volume = 0.28;
function iniciarMusica() {
  if (!musicaConvite) return;
  const tentativa = musicaConvite.play();
  if (tentativa && typeof tentativa.catch === 'function') tentativa.catch(() => {});
  if (controleMusica) {
    controleMusica.classList.remove('escondido');
    controleMusica.setAttribute('aria-pressed', 'true');
    controleMusica.setAttribute('aria-label', 'Pausar música');
    controleMusica.innerHTML = '♫ <span>Música ligada</span>';
  }
}
if (controleMusica) controleMusica.addEventListener('click', () => {
  if (!musicaConvite) return;
  if (musicaConvite.paused) {
    iniciarMusica();
  } else {
    musicaConvite.pause();
    controleMusica.setAttribute('aria-pressed', 'false');
    controleMusica.setAttribute('aria-label', 'Tocar música');
    controleMusica.innerHTML = '♫ <span>Música pausada</span>';
  }
});
function abrirConvite() {
  if (aberturaEmAndamento || !abertura || !convite) return;
  aberturaEmAndamento = true;
  iniciarMusica();
  abertura.classList.add('abrindo');
  abertura.setAttribute('aria-busy','true');
  if (botaoAbrir) botaoAbrir.disabled = true;
  if (etiquetaSelo) etiquetaSelo.disabled = true;
  window.setTimeout(() => {
    abertura.classList.add('escondido');
    abertura.style.display = 'none';
    abertura.classList.remove('abrindo');
    abertura.removeAttribute('aria-busy');
    convite.classList.remove('escondido');
    convite.setAttribute('aria-hidden','false');
    window.scrollTo({top:0,behavior:'smooth'});
    aberturaEmAndamento = false;
  }, 950);
}
if (botaoAbrir) botaoAbrir.addEventListener('click', abrirConvite);
if (etiquetaSelo) etiquetaSelo.addEventListener('click', abrirConvite);
const botaoVoltar = document.getElementById('voltar');
if (botaoVoltar) botaoVoltar.addEventListener('click',()=>{
  if (musicaConvite) musicaConvite.pause();
  if (controleMusica) controleMusica.classList.add('escondido');
  convite.classList.add('escondido'); convite.setAttribute('aria-hidden','true');
  abertura.classList.remove('escondido','abrindo'); abertura.style.display = ''; abertura.removeAttribute('aria-busy');
  if (botaoAbrir) botaoAbrir.disabled = false;
  if (etiquetaSelo) etiquetaSelo.disabled = false;
  window.scrollTo({top:0,behavior:'smooth'});
});
const dataCasamento=new Date('2027-01-23T16:40:00-03:00');
function atualizarContagem(){
  let s=Math.max(0,Math.floor((dataCasamento.getTime()-Date.now())/1000));
  document.getElementById('dias').textContent=Math.floor(s/86400);
  document.getElementById('horas').textContent=String(Math.floor(s%86400/3600)).padStart(2,'0');
  document.getElementById('minutos').textContent=String(Math.floor(s%3600/60)).padStart(2,'0');
  document.getElementById('segundos').textContent=String(s%60).padStart(2,'0');
}
atualizarContagem();setInterval(atualizarContagem,1000);
