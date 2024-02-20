//document.getElementById("salvarBtn").addEventListener("click", function() {
    // Obter os valores dos campos de entrada
//    var nome = document.getElementById("nome").value;
    // Obter mais valores de outros campos de entrada, se necessário

    // Salvar as informações onde quer que deseje (local storage, banco de dados, etc.)
    // Aqui, apenas um exemplo de exibição no console
//    console.log("Nome: " + nome);
    // Exibir mais informações no console, se necessário

    // Limpar os campos de entrada após salvar as informações
//    document.getElementById("nome").value = "";
    // Limpar mais campos de entrada, se necessário
//});


// VALIDAR ATRIBUTOS BASE
const attributeValues = [15, 14, 13, 12, 10, 8];

function validateAttributes() {
    const attributes = document.querySelectorAll('.attributes input');
    const chosenValues = [];

    attributes.forEach(attribute => {
        chosenValues.push(parseInt(attribute.value));
    });

    const uniqueValues = [...new Set(chosenValues)];

    if (uniqueValues.length !== chosenValues.length) {
        showMessage("Os atributos base são 15, 14, 13, 12, 10 e 8.");
        return;
    }

    const invalidValue = chosenValues.find(value => !attributeValues.includes(value));
    if (invalidValue) {
        showMessage("Os atributos base são 15, 14, 13, 12, 10 e 8.");
        return;
    }

    showMessage(""); // caso essa mensagem não seja vazia, mesmo se o usuário colocar correto irá ficar aparecendo "os atributos base são 15, 14, etc", tentar melhorar depois
}

function showMessage(message) {
    document.getElementById('message').textContent = message;
}

// ADICIONAR PONTOS DE ATRIBUTOS


// HABILIDADES DE ORIGEM, ESPECIALIZAÇÃO E TALENTOS

const habilidadesOrigem = {
    inato: [
        { nome: "Bônus de Atributo", descricao: `Um Inato recebe 3 pontos de atributos adicionais para distribuir entre os seus atributos.` },
        { nome: "Talento Natural", descricao: `Um inato é talentoso, tendo a energia 
        amaldiçoada como algo natural. Você recebe um Talento a sua
        escolha no 1° nível e outro no 6° nível.`} // o template literals (o acento grave) permite a quebra de linhas em um mesmo texto 
    ], 

    herdado: [
        { nome: "Bônus de Atributo", descricao: `Um herdeiro recebe bônus em atributos baseados no seu clã escolhido.`},
        { nome: "Maestrias de Clã", descricao: `Cada clã dá Maestria/Especialização em perícias específicas.`}
    ]

}


const habilidadesEspecializacao = {
    lutador: [
        { nome: "Mestre de Luta", descricao: `Um lutador é um mestre da luta, dedicando-se ao seu corpo` },
        { nome: "Empolgação", descricao: `Uma boa luta é empolgante e te motiva a se arriscar mais e mais, permitindo movimentos mais fortes e únicos.`}
    ],

    especialista_em_combate: [
        { nome: "Teste", descricao: `teste de descricao`},
        { nome: "Teste 2", descricao: `teste de descricao 2`}
    ]
}


// ESCREVER AUTOMATICAMENTE NA FICHA

function escreverFicha() {
    const origem = document.getElementById("ficha_origem").value;
    const origemHabilidadesBase = habilidadesOrigem[origem];

    const especializacao = document.getElementById("ficha_especializacao").value;
    const especializacaoHabilidadesBase = habilidadesEspecializacao[especializacao];
    
    let personagemFichaHTML = "<h3>Habilidades de Origem:</h3><ul>";
    origemHabilidadesBase.forEach(habilidade => {
        personagemFichaHTML += `<li><strong>${habilidade.nome}</strong>: ${habilidade.descricao}</li>`;
    });
    personagemFichaHTML += "</ul>";

    personagemFichaHTML += "<h3>Habilidades de Especialização:</h3><ul>";
    especializacaoHabilidadesBase.forEach(habilidadeBase => {
        personagemFichaHTML += `<li><strong>${habilidadeBase.nome}</strong>: ${habilidadeBase.descricao}</li>`;
    });
    personagemFichaHTML += "</ul>";
    personagemFichaHTML += "</ul>";

    document.getElementById("fichaPersonagem").innerHTML = personagemFichaHTML;

}

document.getElementById("ficha_origem").addEventListener("change", escreverFicha);
document.getElementById("ficha_especializacao").addEventListener("change", escreverFicha);

// APARECER OPÇÃO DE CLÃS PARA HERDADO
document.getElementById("ficha_origem").addEventListener("change", function() { // o addEventListener("change") funciona toda vez que o selecionado for alterado
    const origemSelecionada = document.getElementById("ficha_origem").value; // pega exatamente qual a origem escolhida
    const divClas = document.getElementById("ficha_clas"); // pega examaente o div onde tá as opções de clãs

    // Se a origem selecionada for "Herdado", exibir a seção de clãs; caso contrário, ocultá-la
    if (origemSelecionada === "herdado") { // se a origem escolhida for herdada, então
        divClas.style.display = "block"; // muda o display do estilo do div clas para block, ou seja, ele aparece na página
    } else { // caso contrário
        divClas.style.display = "none"; // muda o display para none, fazendo com que sua linha não apareça, e por ventura, nem o texto em si por conta do hidden no div
    }
});

// HABILIDADES DE ESPECIALIZACAO


// REAJUSTAR O TAMANHO DE TEXTOS PARA A DESCRIÇÃO DO PERSONAGEM
function resizeTextarea() {
    var textareas = document.getElementsByName("textoResponsivo"); // pega cada descrição do "rosto" da ficha pelo nome
    textareas.forEach(function(textarea) { // para cada descrição de rosto, realiza a função abaixo
      textarea.style.height = ""; // Redefine a altura para calcular a altura real
      textarea.style.height = textarea.scrollHeight + "px"; // Define a altura conforme o conteúdo
    });
}

document.getElementsByName("textoResponsivo").forEach(function(textarea) {
    textarea.addEventListener("input", resizeTextarea);
});


// Build character sheet initially
escreverFicha();