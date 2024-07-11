// Definição de variáveis para o jogador e inimigo
let jogador = {
  nome: 'Herói',
  vida: 100,
  ataque: 15,
  defesa: 1,
  dinheiro: 100
};

let inimigoAtual = {
  nome: '',
  vida: 0,
  ataque: 0,
  defesa: 0
};

const armas = [
  { nome: 'Adaga', ataque: 10, preco: 20 },
  { nome: 'Espada', ataque: 25, preco: 50 },
  { nome: 'Machado', ataque: 40, preco: 80 },
  { nome: 'Arco', ataque: 50, preco: 100 }
];

const escudos = [
  { nome: 'Escudo de Madeira', defesa: 5, preco: 20 },
  { nome: 'Escudo de Ferro', defesa: 10, preco: 35 },
  { nome: 'Escudo de Aço', defesa: 20, preco: 50 }
];

const pocoes = [
  { nome: 'Poção Pequena', cura: 20, preco: 15 },
  { nome: 'Poção Média', cura: 50, preco: 35 },
  { nome: 'Poção Grande', cura: 100, preco: 50 }
];

// Definição da missão
let missao = {
  objetivo: 'Derrotar 5 inimigos',
  progresso: 0,
  recompensaMin: 50,
  recompensaMax: 75
};

// Progresso da fase
let progressoFase = 0;

// Função para inicializar o jogador
function inicializarJogador() {
  jogador.vida = 100;
  jogador.ataque = 15;
  jogador.defesa = 1;
  jogador.dinheiro = 100;
}

// Função para inicializar o inimigo
function inicializarInimigo() {
  const nomesInimigos = ['Goblin', 'Esqueleto', 'Zumbi', 'Ogro'];
  const indiceInimigo = Math.floor(Math.random() * nomesInimigos.length);
  inimigoAtual.nome = nomesInimigos[indiceInimigo];
  inimigoAtual.vida = Math.floor(Math.random() * 100) + 20;
  inimigoAtual.ataque = Math.floor(Math.random() * 10) + 10;
  inimigoAtual.defesa = Math.floor(Math.random() * 5) + 5;
}

// Função para exibir estatísticas
function exibirEstatisticas() {
  const statusElement = document.getElementById('status');
  statusElement.innerHTML = `
    <h2>Estatísticas do Jogador:</h2>
    <p>Nome: ${jogador.nome}</p>
    <p>Vida: ${jogador.vida}</p>
    <p>Ataque: ${jogador.ataque}</p>
    <p>Defesa: ${jogador.defesa}</p>
    <p>Dinheiro: ${jogador.dinheiro}</p>
    <h2>Estatísticas do Inimigo:</h2>
    <p>Nome: ${inimigoAtual.nome}</p>
    <p>Vida: ${inimigoAtual.vida}</p>
    <p>Ataque: ${inimigoAtual.ataque}</p>
    <p>Defesa: ${inimigoAtual.defesa}</p>
    <h2>Missão:</h2>
    <p>${missao.objetivo}</p>
    <p>Progresso: ${missao.progresso}/5</p>
  `;
}

// Função para exibir requisitos da fase
function exibirRequisitosFase() {
  const requisitosFaseElement = document.getElementById('requisitosFase');
  const progressoRestante = Math.ceil(50 * Math.pow(1.007, progressoFase)) - (missao.progresso % 5);
  requisitosFaseElement.innerHTML = `
    <h2>Requisitos para Avançar de Fase:</h2>
    <p>Derrotar ${Math.ceil(50 * Math.pow(1.007, progressoFase))} inimigos</p>
    <p>Pagar ${Math.ceil(200 * Math.pow(1.01, progressoFase))} moedas</p>
    <p>Progresso Restante: ${progressoRestante} inimigos</p>
  `;
}

// Função para verificar o progresso da missão após cada batalha
function verificarProgressoMissao() {
  missao.progresso++;
  if (missao.progresso >= 5) {
    const recompensa = Math.floor(Math.random() * (missao.recompensaMax - missao.recompensaMin + 1)) + missao.recompensaMin;
    jogador.dinheiro += recompensa;
    alert(`Missão completada! Você derrotou 5 inimigos e recebeu uma recompensa de ${recompensa} moedas.`);
    missao.progresso = 0; // Reiniciar o progresso da missão
    progressoFase++; // Aumentar o progresso da fase
    exibirRequisitosFase(); // Exibir requisitos da fase após a conclusão da missão
  }
}

// Função para atacar o inimigo
function atacarInimigo() {
  const danoJogador = Math.max(0, jogador.ataque - inimigoAtual.defesa + Math.floor(Math.random() * 5) - 2);
  inimigoAtual.vida -= danoJogador;
  if (inimigoAtual.vida <= 0) {
    alert(`Você derrotou o ${inimigoAtual.nome}!`);
    jogador.dinheiro += Math.floor(Math.random() * 20) + 10; // Recompensa em dinheiro ao derrotar o inimigo
    verificarProgressoMissao(); // Verificar o progresso da missão
    inicializarInimigo(); // Trocar para um novo inimigo
    exibirEstatisticas(); // Atualizar as estatísticas após a ação
  } else {
    const danoInimigo = Math.max(0, inimigoAtual.ataque - jogador.defesa + Math.floor(Math.random() * 5) - 2);
    jogador.vida -= danoInimigo;
    if (jogador.vida <= 0) {
      alert(`Você foi derrotado pelo ${inimigoAtual.nome}!`);
      // Implemente lógica para reiniciar o jogo ou qualquer outra ação
    } else {
      exibirEstatisticas(); // Atualizar as estatísticas após a ação
    }
  }
}

// Função para visitar a loja
function visitarLoja() {
  const escolha = prompt('Bem-vindo à loja! Escolha o que deseja comprar:\n1. Arma\n2. Escudo\n3. Poção de Cura');
  switch (parseInt(escolha)) {
    case 1:
      comprarArma();
      break;
    case 2:
      comprarEscudo();
      break;
    case 3:
      comprarPocao();
      break;
    default:
      alert('Escolha inválida!');
  }
}

// Função para comprar arma
function comprarArma() {
  let listaArmas = 'Escolha uma arma:\n';
  armas.forEach((arma, index) => {
    listaArmas += `${index + 1}. ${arma.nome} - Ataque: ${arma.ataque} - Preço: ${arma.preco} moedas\n`;
  });
  const escolha = parseInt(prompt(listaArmas));
  if (escolha >= 1 && escolha <= armas.length) {
    const armaSelecionada = armas[escolha - 1];
    if (jogador.dinheiro >= armaSelecionada.preco) {
      jogador.ataque += armaSelecionada.ataque;
      jogador.dinheiro -= armaSelecionada.preco;
      alert(`Você comprou uma ${armaSelecionada.nome}!`);
      exibirEstatisticas(); // Atualizar as estatísticas após a ação
    } else {
      alert('Dinheiro insuficiente!');
    }
  } else {
    alert('Escolha inválida!');
  }
}

// Função para comprar escudo
function comprarEscudo() {
  let listaEscudos = 'Escolha um escudo:\n';
  escudos.forEach((escudo, index) => {
    listaEscudos += `${index + 1}. ${escudo.nome} - Defesa: ${escudo.defesa} - Preço: ${escudo.preco} moedas\n`;
  });
  const escolha = parseInt(prompt(listaEscudos));
  if (escolha >= 1 && escolha <= escudos.length) {
    const escudoSelecionado = escudos[escolha - 1];
    if (jogador.dinheiro >= escudoSelecionado.preco) {
      jogador.defesa += escudoSelecionado.defesa;
      jogador.dinheiro -= escudoSelecionado.preco;
      alert(`Você comprou um ${escudoSelecionado.nome}!`);
      exibirEstatisticas(); // Atualizar as estatísticas após a ação
    } else {
      alert('Dinheiro insuficiente!');
    }
  } else {
    alert('Escolha inválida!');
  }
}

// Função para comprar poção
function comprarPocao() {
  let listaPocoes = 'Escolha uma poção de cura:\n';
  pocoes.forEach((pocao, index) => {
    listaPocoes += `${index + 1}. ${pocao.nome} - Cura: ${pocao.cura} - Preço: ${pocao.preco} moedas\n`;
  });
  const escolha = parseInt(prompt(listaPocoes));
  if (escolha >= 1 && escolha <= pocoes.length) {
    const pocaoSelecionada = pocoes[escolha - 1];
    if (jogador.dinheiro >= pocaoSelecionada.preco) {
      jogador.vida += pocaoSelecionada.cura;
      jogador.dinheiro -= pocaoSelecionada.preco;
      alert(`Você comprou uma ${pocaoSelecionada.nome} e recuperou ${pocaoSelecionada.cura} pontos de vida!`);
      exibirEstatisticas(); // Atualizar as estatísticas após a ação
    } else {
      alert('Dinheiro insuficiente!');
    }
  } else {
    alert('Escolha inválida!');
  }
}

// Função para avançar para a próxima fase
function avancarProximaFase() {
  const progressoTotal = missao.progresso + (5 * Math.floor(missao.progresso / 5)); // Total de inimigos derrotados, incluindo missões concluídas
  const progressoRestante = Math.ceil(50 * Math.pow(1.007, progressoTotal)) - progressoTotal;
  if (jogador.dinheiro >= Math.ceil(200 * Math.pow(1.01, progressoTotal)) && progressoTotal >= 50) {
    jogador.dinheiro -= Math.ceil(200 * Math.pow(1.01, progressoTotal)); // Deduzir o dinheiro necessário
    missao.objetivo = `Derrotar ${Math.ceil(50 * Math.pow(1.007, progressoTotal))} inimigos`; // Atualizar o objetivo da missão
    alert('Você avançou para a próxima fase!');
    inicializarJogador(); // Reiniciar o jogador para a próxima fase
    inicializarInimigo(); // Inicializar um novo inimigo para a próxima fase
    exibirEstatisticas(); // Atualizar as estatísticas após a ação
    exibirRequisitosFase(); // Exibir requisitos da fase após a ação
  } else {
    alert('Você não atingiu os requisitos para avançar de fase!');
  }
}

// Função principal do jogo
function jogoPrincipal() {
  inicializarJogador();
  inicializarInimigo();
  exibirEstatisticas();
  exibirRequisitosFase(); // Exibir requisitos da fase inicialmente
}

// Chamada da função principal
jogoPrincipal();
