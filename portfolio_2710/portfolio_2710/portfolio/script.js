addEventListener("DOMContentLoaded", () => {
let firstVisit = sessionStorage.getItem("firstVisit");
if (!firstVisit) {
    sessionStorage.setItem("firstVisit", "true");
    firstVisit = "true";
}

if (firstVisit === "true") {

const delayTelaInicial = 5000; 

setTimeout(() => {
    const telaInicial = document.getElementById("tela_inicial");
    const conteudo = document.getElementById("conteudo_principal");


    let transitionCompleted = false;
    
    
    telaInicial.style.opacity = "0";

    function mostrarConteudoPrincipal() {
        if (transitionCompleted) return;
        transitionCompleted = true;
        
        telaInicial.removeEventListener("transitionend", mostrarConteudoPrincipal);
        telaInicial.style.display = "none";
        conteudo.style.display = "block";
        conteudo.style.opacity = "0";
        
        setTimeout(() => {
            conteudo.style.opacity = "1";
        }, 50);
    }

    telaInicial.addEventListener("transitionend", mostrarConteudoPrincipal);

   
    setTimeout(mostrarConteudoPrincipal, 3000);

    sessionStorage.setItem("firstVisit", "false");

}, delayTelaInicial);  }

else if (firstVisit === "false") {
    document.getElementById("tela_inicial").style.display = "none";
    const conteudo = document.getElementById("conteudo_principal");
    conteudo.style.display = "block";
    conteudo.style.opacity = "1";
}
else { 
    console.error("???");
}

});

function showDate() {

    const monthNames = ["jan", "fev", "mar", "abr", "maio", "jun", "jul", "ago", "set", "out", "nov", "dez"];
    const now = new Date();
    var dateHour = document.getElementById('dateHour');
    var newDate = now.getDate() + " de " + monthNames[now.getMonth()] + " " + now.getHours() + ":" + now.getMinutes();


    if (now.getMinutes() < 10) {
        newDate = now.getDate() + " de " + monthNames[now.getMonth()] + " " + now.getHours() + ":0" + now.getMinutes();
    }
    dateHour.innerText = newDate;

}

window.addEventListener('load',showDate)

function showTime(){

    const now = new Date();
    var newTime = now.getHours()+":"+now.getMinutes()+":"+now.getSeconds();
    var dateHour = document.getElementById('dateHour');

    if(now.getMinutes() < 10){
        newDate = now.getDate()+ " de "+ monthNames[now.getMonth()] + " "+ now.getHours()+":0"+now.getMinutes();
    }
    dateHour.innerText = newTime;
}


let zIndexAtual = 10;

function showDiv() {
  const div = document.querySelector('.div_arquivos_sobre_mim');
  
  
  div.style.display = 'block';
  div.offsetHeight; 
  
  div.classList.add('mostrar');
  div.style.zIndex = ++zIndexAtual;

  
  if (!div.dataset.arrastavel) {
    tornarArrastavel(div);
    div.dataset.arrastavel = "true";
  }
}

function fecharDiv() {
  const div = document.querySelector('.div_arquivos_sobre_mim');
  div.classList.remove('mostrar');
  setTimeout(() => {
    div.style.display = 'none';
  }, 250);
}


function tornarArrastavel(janela) {
  const cabecalho = janela.querySelector('.cabecalho_div_arquivos');
  let offsetX, offsetY, arrastando = false;

  cabecalho.addEventListener('mousedown', (e) => {
    arrastando = true;
    janela.style.zIndex = ++zIndexAtual;
    offsetX = e.clientX - janela.offsetLeft;
    offsetY = e.clientY - janela.offsetTop;
    janela.style.transition = 'none';
  });

  document.addEventListener('mousemove', (e) => {
    if (!arrastando) return;
    janela.style.left = `${e.clientX - offsetX}px`;
    janela.style.top = `${e.clientY - offsetY}px`;
  });

  document.addEventListener('mouseup', () => {
    if (arrastando) {
      arrastando = false;
      janela.style.transition = 'transform 0.25s ease, opacity 0.25s ease';
    }
  });


  janela.addEventListener('mousedown', () => {
    janela.style.zIndex = ++zIndexAtual;
  });
}





function abrirJanelaSobreMim() {
  const janela = document.querySelector('.janela_sobre_mim');


  janela.style.display = 'block';


  void janela.offsetHeight;

  janela.classList.add('mostrar');


  janela.style.zIndex = ++zIndexAtual;


  if (!janela.dataset.arrastavel) {
    tornarArrastavel(janela, '.cabecalho_janela_sobre_mim');
    janela.dataset.arrastavel = "true";
  }
}

function fecharJanelaSobreMim() {
  const janela = document.querySelector('.janela_sobre_mim');

  janela.classList.remove('mostrar');

  setTimeout(() => {
    janela.style.display = 'none';
  }, 250);
}

function tornarArrastavel(janela, seletorCabecalho) {
  const cabecalho = janela.querySelector(seletorCabecalho);
  if (!cabecalho) return;

  let offsetX = 0, offsetY = 0;
  let arrastando = false;

  cabecalho.addEventListener('mousedown', (e) => {
    arrastando = true;
    janela.style.zIndex = ++zIndexAtual;


    offsetX = e.clientX - janela.offsetLeft;
    offsetY = e.clientY - janela.offsetTop;

    janela.style.transition = 'none';
  });

  
  document.addEventListener('mousemove', (e) => {
    if (!arrastando) return;
    janela.style.left = (e.clientX - offsetX) + 'px';
    janela.style.top  = (e.clientY - offsetY) + 'px';
  });

  document.addEventListener('mouseup', () => {
    if (!arrastando) return;
    arrastando = false;
 
    janela.style.transition = 'transform 0.25s ease, opacity 0.25s ease';
  });


  janela.addEventListener('mousedown', () => {
    janela.style.zIndex = ++zIndexAtual;
  });
}


function showDiv() {
  const div = document.querySelector('.div_arquivos_sobre_mim');
  div.style.display = 'block';
  void div.offsetHeight;
  div.classList.add('mostrar');
  div.style.zIndex = ++zIndexAtual;
  if (!div.dataset.arrastavel) {
    tornarArrastavel(div, '.cabecalho_div_arquivos');
    div.dataset.arrastavel = "true";
  }
}

function fecharDiv() {
  const div = document.querySelector('.div_arquivos_sobre_mim');
  div.classList.remove('mostrar');
  setTimeout(() => { div.style.display = 'none'; }, 250);
}

function abrirJanelaImagens() {
  const janela = document.querySelector('.janela_imagens');
  janela.style.display = 'block'; 
  void janela.offsetHeight;
  janela.classList.add('mostrar');
  janela.style.zIndex = ++zIndexAtual;
  if (!janela.dataset.arrastavel) {
    tornarArrastavel(janela, '.cabecalho_janela_imagens');
    janela.dataset.arrastavel = "true";
  }
}

function fecharJanelaImagens() {
  const janela = document.querySelector('.janela_imagens');
  janela.classList.remove('mostrar');  
  setTimeout(() => { janela.style.display = 'none'; }, 250);
}


  const textos = [
  "Olá! Eu sou a Sarah Falcone. Sou estudante de informática e apaixonada por tecnologia e ciência.",
  "Adoro criar projetos que misturam lógica, arte e curiosidade científica.  Neste portfólio, você encontrará uma coleção dos meus trabalhos, desde pequenos scripts até projetos mais complexos. Cada um deles reflete minha jornada de aprendizado e minha paixão por explorar o mundo digital. Sinta-se à vontade para navegar, experimentar e se inspirar!",
  "Além de programação, tenho um grande interesse por astronomia, física e jogos.  Adoro aprender sobre o universo, desde as estrelas distantes até os princípios fundamentais que regem a natureza. Acredito que a ciência e a tecnologia estão interligadas, e essa paixão me motiva a explorar novas ideias e criar projetos inovadores.",
  "Estou sempre buscando novos desafios e oportunidades para crescer como desenvolvedora.  Acredito que a aprendizagem contínua é essencial na área de tecnologia, e estou comprometida em aprimorar minhas habilidades e expandir meu conhecimento. Se você tem um projeto interessante ou uma oportunidade de colaboração, adoraria ouvir de você!",
  "Muitos dos meus projetos ainda estão em desenvolvimento, e estou constantemente trabalhando para aprimorá-los.",
  "Obrigada por dedicar seu tempo para conhecer meu portfólio! ✦✦✦✦",
  "Se você leu até aqui, uma surpresa: a senha para acessar o projeto secreto é 'estrelas123'. Qualquer semelhança com senhas reais é mera coincidência! ✦✦✦✦"
];

let index = 0;
const div = document.getElementById("about-text");
const hint = document.getElementById("hint");
function mostrarTexto() {
 
  if (!hint.dataset.original) hint.dataset.original = hint.textContent || "";

  if (index < textos.length) {
    div.textContent = textos[index];
    hint.style.display = "block";
    index++;

    if (index === textos.length) {
      hint.textContent = ":: fim do arquivo ::";
    } else {
      
      hint.textContent = hint.dataset.original;
    }
  }
}


document.addEventListener("keyup", (event) => {
  if (event.key === "ArrowLeft") {
    if (hint.dataset.original) hint.textContent = hint.dataset.original;
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Enter" || event.key === "ArrowRight") {
    mostrarTexto();
  }
});

mostrarTexto(); 

function voltarTexto() {
  if (index > 1) {
    index -= 2;
    div.textContent = textos[index];
    index++;
  } else {
    div.textContent = textos[0];
    index = 1;
  } }

  document.addEventListener("keydown", (event) => {
  if (event.key === "ArrowLeft") {
    voltarTexto();
  }
});

let indiceImagem = 0;

function mudarImagem(direcao) {
  const imagens = document.querySelectorAll('.galeria_imagens img');
  imagens[indiceImagem].classList.remove('ativa');

  indiceImagem = (indiceImagem + direcao + imagens.length) % imagens.length;

  imagens[indiceImagem].classList.add('ativa');
}





function manterTema() {
   let modoEscuro = localStorage.getItem("modoEscuro");
   if (modoEscuro === "true") {
       document.body.classList.add("modoescuro");
    } else {document.body.classList.remove("modoescuro");} }


function toggleTema() {

  document.body.classList.add("transicao-tema");

  void document.body.offsetWidth;


  document.body.classList.toggle("modoescuro");

  setTimeout(() => document.body.classList.remove("transicao-tema"), 1000);
}

