// ============================================
// CONFIGURAÇÃO - EDITE AQUI SUAS FAIXAS
// ============================================
const faixas = [
    {
        id: 'Mozart Main AB',
        nome: 'Main AB',
        descricao: 'AB 90cm',
        arquivoAudio: 'Aparte SCM - Trecho Mozart v2 - 0015 - Grupo - MAINS.mp3',
        imagem: 'Main AB.png'
    },
    {
        id: 'Surround',
        nome: 'Quad Surround',
        descricao: 'Quadraphony 90° 28cm',
        arquivoAudio: 'Aparte SCM - Trecho Mozart v2 - 0016 - Grupo - Surround.mp3',
        imagem: 'Surround.png'
    },
    {
        id: 'Spot C',
        nome: 'Spot C omni',
        descricao: 'Spot C omni',
        arquivoAudio: 'Aparte SCM - Trecho Mozart v2 - 0007 - Áudio - C.mp3',
        imagem: 'Spot C.png'
    },

    // {
    //     id: 'Spot Bass',
    //     nome: 'remix version',
    //     descricao: 'Versão remix · 2025',
    //     arquivoAudio: 'Aparte SCM - Trecho Mozart v2 - 0008 - Áudio - Bass.mp3',
    //     imagem: 'imagens/capa.jpg'
    // }
];

// ============================================
// CÓDIGO DO PLAYER - NÃO PRECISA ALTERAR
// ============================================

// Elementos da página
const audioPlayer = document.getElementById('audioPlayer');
const capaImg = document.getElementById('capa');
const faixaTitulo = document.getElementById('faixaTitulo');
const faixaDescricao = document.getElementById('faixaDescricao');
const versoesContainer = document.getElementById('versoesContainer');

let faixaAtual = null;

// Criar botões para cada versão
function criarBotoes() {
    versoesContainer.innerHTML = '';
    
    faixas.forEach((faixa, index) => {
        const botao = document.createElement('button');
        botao.className = 'btn-versao';
        botao.textContent = faixa.nome;
        botao.setAttribute('data-id', faixa.id);
        
        botao.addEventListener('click', () => {
            selecionarFaixa(faixa.id);
        });
        
        versoesContainer.appendChild(botao);
    });
}

// Selecionar e tocar uma faixa
function selecionarFaixa(id) {
    const faixa = faixas.find(f => f.id === id);
    if (!faixa) return;
    
    // Se clicou na mesma faixa que já está tocando
    if (faixaAtual && faixaAtual.id === id) {
        if (audioPlayer.paused) {
            audioPlayer.play();
        } else {
            audioPlayer.pause();
        }
        return;
    }
    
    // Atualizar faixa atual
    faixaAtual = faixa;
    
    // Atualizar informações na tela
    faixaTitulo.textContent = faixa.nome;
    faixaDescricao.textContent = faixa.descricao;
    capaImg.src = faixa.imagem;
    capaImg.alt = faixa.nome;
    
    // Atualizar e tocar áudio
    audioPlayer.src = faixa.arquivoAudio;
    audioPlayer.load();
    
    // Tentar tocar automaticamente (navegadores podem bloquear)
    const promessaPlay = audioPlayer.play();
    if (promessaPlay !== undefined) {
        promessaPlay.catch(() => {
            // Autoplay bloqueado - usuário precisa clicar no play
            console.log('Clique no play para iniciar');
        });
    }
    
    // Atualizar botão ativo
    atualizarBotaoAtivo(id);
}

// Destacar botão da faixa selecionada
function atualizarBotaoAtivo(id) {
    const botoes = document.querySelectorAll('.btn-versao');
    botoes.forEach(botao => {
        if (botao.getAttribute('data-id') === id) {
            botao.classList.add('ativo');
        } else {
            botao.classList.remove('ativo');
        }
    });
}

// Quando o áudio terminar, parar (não avança automaticamente)
audioPlayer.addEventListener('ended', () => {
    // Opcional: descomente a linha abaixo para tocar a próxima automaticamente
    // const indexAtual = faixas.findIndex(f => f.id === faixaAtual.id);
    // const proximaIndex = (indexAtual + 1) % faixas.length;
    // selecionarFaixa(faixas[proximaIndex].id);
});

// Tratar erros de carregamento de áudio
audioPlayer.addEventListener('error', () => {
    alert('Erro ao carregar o arquivo de áudio. Verifique se o arquivo existe na pasta "audio".');
});

// Inicializar
criarBotoes();