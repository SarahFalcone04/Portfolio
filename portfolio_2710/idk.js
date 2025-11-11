/* ===== controle de z-index global (qual janela fica na frente) ===== */
let zIndexAtual = 10; // começa com 10 pra não bater com outros elementos da página

/* ===== abre a janela principal (.div_arquivos_sobre_mim) ===== */
function showDiv() {
  const div = document.querySelector('.div_arquivos_sobre_mim');

  // 1) garante que a div esteja visível como elemento no fluxo (display)
  div.style.display = 'block';

  // 2) força um "reflow" no navegador para que a transição CSS seja aplicada
  //    (ler a propriedade offsetHeight força o browser a calcular layout agora)
  //    sem isso, às vezes a classe .mostrar é adicionada antes do browser "ver" o display:block
  void div.offsetHeight;

  // 3) adiciona a classe que ativa a animação (opacity + scale)
  div.classList.add('mostrar');

  // 4) atualiza z-index pra trazer essa janela pra frente
  div.style.zIndex = ++zIndexAtual;

  // 5) registra o arrastar apenas uma vez (evita duplicar listeners)
  if (!div.dataset.arrastavel) {
    tornarArrastavel(div);
    div.dataset.arrastavel = "true"; // sinal que já foi preparado
  }
}

/* ===== fecha a janela ===== */
function fecharDiv() {
  const div = document.querySelector('.div_arquivos_sobre_mim');

  // remove a classe que mostra a janela — isso dispara a transição de saída (opacity/scale)
  div.classList.remove('mostrar');

  // espera o tempo da transição (250ms no CSS) antes de tirar do fluxo com display:none
  setTimeout(() => {
    div.style.display = 'none';
  }, 250);
}

/* ===== torna uma janela arrastável pelo seu cabeçalho ===== */
function tornarArrastavel(janela) {
  const cabecalho = janela.querySelector('.cabecalho_div_arquivos');

  // posições e estado de arraste
  let offsetX = 0, offsetY = 0;
  let arrastando = false;

  // quando inicia o arrasto (pressiona o botão do mouse no cabeçalho)
  cabecalho.addEventListener('mousedown', (e) => {
    arrastando = true;

    // traz a janela pra frente enquanto arrasta
    janela.style.zIndex = ++zIndexAtual;

    // calcula deslocamento entre o ponto do clique e a posição atual da janela
    offsetX = e.clientX - janela.offsetLeft;
    offsetY = e.clientY - janela.offsetTop;

    // durante o arraste a gente remove as transições pra ficar "grudado" no cursor
    janela.style.transition = 'none';
  });

  // movimento do mouse enquanto se arrasta
  document.addEventListener('mousemove', (e) => {
    if (!arrastando) return;

    // atualiza a posição da janela fixando o deslocamento
    janela.style.left = (e.clientX - offsetX) + 'px';
    janela.style.top  = (e.clientY - offsetY) + 'px';
  });

  // quando solta o botão do mouse, termina o arraste
  document.addEventListener('mouseup', () => {
    if (!arrastando) return;
    arrastando = false;

    // restaura a transição (pra suavizar quando soltar)
    janela.style.transition = 'transform 0.25s ease, opacity 0.25s ease';
  });

  // se clicar em qualquer lugar da janela, também traz ela pra frente (ideal quando houver várias)
  janela.addEventListener('mousedown', () => {
    janela.style.zIndex = ++zIndexAtual;
  });
}
